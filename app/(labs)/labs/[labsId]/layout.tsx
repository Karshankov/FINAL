import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";


import { db } from "@/lib/db";
import { getProgressLabs } from "@/actions/get-progress-labs";
import CourseSidebar from "./_components/course-sidebar";
import CourseNavbar from "./_components/course-navbar";


const CourseLayout = async ({
    children,
    params
}: {
    children: React.ReactNode;
    params: { labsId: string}
}) =>{
const { userId } = auth();

    if (!userId){
        return redirect("/")
    }

    const labs = await db.labs.findUnique({
        where: {
          id: params.labsId,
        },
        include: {
          chapters: {
            where: {
              isPublished: true,
            },
            include: {
              userProgress: {
                where: {
                  userId,
                },
              },
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      });

      if (!labs) {
        return redirect("/");
      }

    const progressCount = await getProgressLabs(userId, labs.id);

    return(
        <div className="h-full">
            <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
            <CourseNavbar labs={labs} progressCount={progressCount} />
            </div>
            <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
              
            <CourseSidebar 
             labs={labs}
             progressCount={progressCount} 
            />
            </div>
            <main className="md:pl-80 pt-[80px] h-full">
                {children}
            </main>
        </div>
    )
}


export default CourseLayout;