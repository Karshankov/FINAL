import { auth } from '@clerk/nextjs';
import { Navbar } from './_components/navbar';
import { Sidebar } from './_components/sidebar';
import { redirect } from 'next/navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

  const { sessionClaims } = auth();
    if (sessionClaims?.metadata.role !== "Преподаватель" && sessionClaims?.metadata.role !== "Учащийся") {
    redirect("/401");
}
  

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
