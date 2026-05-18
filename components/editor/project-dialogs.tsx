"use client";

import { useState, useEffect } from "react";
import { useProjectDialogs, type Project } from "./project-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}


function RenameDialogContent({
  project,
  isOpen,
  onOpenChange,
}: {
  project: Project;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [renameName, setRenameName] = useState(project.name);

  // Reset name when reopened
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRenameName(project.name);
    }
  }, [isOpen, project.name]);

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenChange(false);
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Rename Project</DialogTitle>
        <DialogDescription>
          Currently renaming <strong>{project.name}</strong>.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleRenameSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rename">New Name</Label>
          <Input
            id="rename"
            autoFocus
            value={renameName}
            onChange={(e) => setRenameName(e.target.value)}
            placeholder="Project Name"
            required
          />
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export function ProjectDialogs() {
  const {
    isCreateOpen,
    setIsCreateOpen,
    isRenameOpen,
    setIsRenameOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    selectedProject,
  } = useProjectDialogs();

  // Create Project State
  const [createName, setCreateName] = useState("");
  const createSlug = generateSlug(createName);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submit
    setIsCreateOpen(false);
    setCreateName("");
  };

  const handleDeleteSubmit = () => {
    // Mock delete
    setIsDeleteOpen(false);
  };

  return (
    <>
      {/* Create Project Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription>
              Start a new architecture workspace.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                autoFocus
                value={createName}
                onChange={(e) => setCreateName(e.target.value)}
                placeholder="e.g. Core Infrastructure"
                required
              />
            </div>
            {createName && (
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <span>Slug:</span>
                <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                  {createSlug}
                </code>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Rename Project Dialog */}
      <Dialog open={isRenameOpen} onOpenChange={setIsRenameOpen}>
        {selectedProject && (
          <RenameDialogContent
            project={selectedProject}
            isOpen={isRenameOpen}
            onOpenChange={setIsRenameOpen}
          />
        )}
      </Dialog>

      {/* Delete Project Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{selectedProject?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteSubmit}>
              Delete Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
