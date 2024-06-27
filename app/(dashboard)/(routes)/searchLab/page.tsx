import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getLabs } from "@/actions/get-labs";
import CoursesList from "@/components/labs-list";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SearchInputLab from "@/components/search-lab";

interface SearchPageProps {
    searchParams:{
        title: string;
        categoryId: string,
    }
}

const SearchPage = async({
    searchParams
}: SearchPageProps) => {
    const { userId } = auth();
    if (!userId) {
        return redirect("/")
    }


const labs = await getLabs({
    userId,
    ...searchParams,
})

    return (
    <>
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInputLab />
    </div> 
    <div className="p-6 space-y-4">
    <Link href='/sendEmail' >
        <Button className="bg-sky-700">
        Отправить работу преподавателю
        </Button>
       
    </Link>
        <CoursesList items={labs}/>
    </div>
    
    </>
    );
}
 
export default SearchPage;