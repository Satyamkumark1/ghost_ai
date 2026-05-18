"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Project {
  id: string;
  name: string;
  isOwner: boolean;
}

interface ProjectDialogsContextType {
  isCreateOpen: boolean;
  setIsCreateOpen: (open: boolean) => void;
  isRenameOpen: boolean;
  setIsRenameOpen: (open: boolean) => void;
  isDeleteOpen: boolean;
  setIsDeleteOpen: (open: boolean) => void;
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  
  openCreateDialog: () => void;
  openRenameDialog: (project: Project) => void;
  openDeleteDialog: (project: Project) => void;
}

const ProjectDialogsContext = createContext<ProjectDialogsContextType | undefined>(undefined);

export function ProjectDialogsProvider({ children }: { children: ReactNode }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openCreateDialog = () => setIsCreateOpen(true);
  
  const openRenameDialog = (project: Project) => {
    setSelectedProject(project);
    setIsRenameOpen(true);
  };

  const openDeleteDialog = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  return (
    <ProjectDialogsContext.Provider
      value={{
        isCreateOpen,
        setIsCreateOpen,
        isRenameOpen,
        setIsRenameOpen,
        isDeleteOpen,
        setIsDeleteOpen,
        selectedProject,
        setSelectedProject,
        openCreateDialog,
        openRenameDialog,
        openDeleteDialog,
      }}
    >
      {children}
    </ProjectDialogsContext.Provider>
  );
}

export function useProjectDialogs() {
  const context = useContext(ProjectDialogsContext);
  if (context === undefined) {
    throw new Error("useProjectDialogs must be used within a ProjectDialogsProvider");
  }
  return context;
}
