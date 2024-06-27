import { Menu } from "lucide-react";
import { ChapterLabs, Labs, UserProgressLabs } from "@prisma/client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CourseSidebar from "./course-sidebar";

interface CourseMobileSidebarProps {
  labs: Labs & {
    chapters: (ChapterLabs & {
      userProgress: UserProgressLabs[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({
  labs,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar labs={labs} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSidebar;