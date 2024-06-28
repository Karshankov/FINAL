'use client';

import { BarChart, Compass, Layout, List, NotebookText,ClipboardPenLine, UserRoundCog, Laptop } from 'lucide-react';
import { SidebarItem } from './sidebar-item';
import { usePathname } from 'next/navigation';

const guestRoutes = [
  //Маршруты! ученика
  {
    icon: Layout,
    label: 'Главная',
    href: '/',
  },
  {
    icon: Compass,
    label: 'Лекции',
    href: '/search',
  },
  {
    icon: Laptop,
    label: 'Практические',
    href: '/searchLab',
  },
  {
    icon: NotebookText,
    label: 'Заметки',
    href: 'https://lms-alovt-notion.netlify.app/',
  },
  {
    icon: ClipboardPenLine,
    label: 'Тесты',
    href: '/searchQuiz',
  },
];
const teacherRoutes = [
  //Маршруты! учителя
  {
    icon: List,
    label: 'Лекции',
    href: '/teacher/courses',
  },
  {
    icon: Laptop,
    label: 'Практические',
    href: '/teacher/labs',
  },
  {
    icon: ClipboardPenLine,
    label: 'Тесты',
    href: '/teacher/quiz',
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.includes('/teacher');

  const routes = isTeacherPage ? teacherRoutes : guestRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
