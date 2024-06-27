import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
    params
}:  {
    params: {labsId:  string}
}) => {
    const labs = await db.labs.findUnique({
        where: {
          id: params.labsId,
        },
        include: {
          chapters: {
            where: { isPublished: true },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });
      if (!labs) {
        return redirect("/");
      }
      return redirect(`/labs/${labs.id}/chapters/${labs.chapters[0].id}`);
      return <div>Читать</div>;
}
 
export default CourseIdPage;