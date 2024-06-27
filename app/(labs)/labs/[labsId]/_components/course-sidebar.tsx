import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ChapterLabs, Labs, UserProgressLabs } from "@prisma/client";
import { redirect } from "next/navigation";
import CourseSidebarItem from "./course-sidebar-item";
import { CourseProgress } from "@/components/course-progress";
import Link from "next/link";
import { Button } from "@/components/ui/button";


interface CourseSidebarProps {
  labs: Labs & {
    chapters: (ChapterLabs & {
      userProgress: UserProgressLabs[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ labs, progressCount }: CourseSidebarProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <Link href="/searchLab">
                <Button type="button" variant="ghost">
                  Назад
                </Button>
              </Link>
      <div className="p-8 flex flex-col border-b">
      
        <h1 className="font-semibold">{labs.title}</h1>
        <div className="mt-10">
            {/* <CourseProgress variant="success" value={progressCount} /> */}
          </div>
      </div>
      <div className="flex flex-col w-full">
        {labs.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            labsId={labs.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;