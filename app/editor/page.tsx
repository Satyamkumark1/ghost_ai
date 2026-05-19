import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { EditorLayout } from "@/components/editor/editor-layout";
import { EditorHomeContent } from "@/components/editor/editor-home-content";
import { Project } from "@/components/editor/project-context";

export default async function EditorPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const email = user.emailAddresses[0]?.emailAddress;

  // Fetch owned projects
  const ownedProjectsData = await prisma.project.findMany({
    where: { ownerId: user.id },
    orderBy: { createdAt: "desc" },
  });

  // Fetch shared projects
  const sharedProjectsData = email
    ? await prisma.project.findMany({
        where: {
          collaborators: {
            some: {
              email: email,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      })
    : [];

  const projects: Project[] = [
    ...ownedProjectsData.map((p) => ({
      id: p.id,
      name: p.name,
      isOwner: true,
    })),
    ...sharedProjectsData.map((p) => ({
      id: p.id,
      name: p.name,
      isOwner: false,
    })),
  ];

  return (
    <EditorLayout projects={projects}>
      <EditorHomeContent />
    </EditorLayout>
  );
}