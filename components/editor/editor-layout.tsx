"use client";

import { useState } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";
import { ProjectDialogsProvider } from "./project-context";
import { ProjectDialogs } from "./project-dialogs";

export function EditorLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProjectDialogsProvider>
      <div className="flex h-screen w-full bg-background overflow-hidden relative">
        <EditorNavbar 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)} 
        />
        <ProjectSidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        <main className="flex-1 pt-14 h-full w-full overflow-auto">
          {children}
        </main>
      </div>
      <ProjectDialogs />
    </ProjectDialogsProvider>
  );
}
