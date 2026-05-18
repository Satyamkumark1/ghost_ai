"use client";

import { Plus } from "lucide-react";
import { EditorLayout } from "@/components/editor/editor-layout";
import { Button } from "@/components/ui/button";
import { useProjectDialogs } from "@/components/editor/project-context";

function EditorHomeContent() {
  const { openCreateDialog } = useProjectDialogs();

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto text-center px-4">
      <h1 className="text-2xl font-semibold mb-2">
        Create a project or open an existing one
      </h1>
      <p className="text-muted-foreground mb-6">
        Start a new architecture workspace, or choose a project from the sidebar.
      </p>
      <Button onClick={openCreateDialog} className="gap-2">
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </div>
  );
}

export default function EditorPage() {
  return (
    <EditorLayout>
      <EditorHomeContent />
    </EditorLayout>
  );
}
