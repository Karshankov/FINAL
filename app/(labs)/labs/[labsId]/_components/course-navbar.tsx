import { ChapterLabs, Labs, UserProgressLabs } from "@prisma/client";

import { NavbarRoutes } from "@/components/navbar-routes";
import CourseMobileSidebar from "./course-mobile-sidebar";

interface CourseNavbarProps {
  labs: Labs & {
    chapters: (ChapterLabs & {
      userProgress: UserProgressLabs[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({ labs, progressCount }: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar 
      labs={labs}
      progressCount={progressCount}
      />
      <NavbarRoutes />
    </div>
  );
};

export default CourseNavbar;