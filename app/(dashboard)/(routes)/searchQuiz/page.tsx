import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchInputLab from "@/components/search-lab";
import { getQuiz } from "@/actions/get-quiz";
import QuizList from "@/components/quiz-list";

interface SearchPageProps {
    searchParams:{
        title: string;
    }
}

const SearchPage = async({
    searchParams
}: SearchPageProps) => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/")
    }


const quiz = await getQuiz({
    userId,
    ...searchParams,
})

    return (
    <>
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInputLab />
    </div> 
    <div className="p-6 space-y-4">
    {/* <Link href='/sendEmail' >
        <Button className="bg-sky-700">
        Отправить работу преподавателю
        </Button>
       
    </Link> */}
        <QuizList items={quiz}/>
    </div>
    
    </>
    );
}
 
export default SearchPage;