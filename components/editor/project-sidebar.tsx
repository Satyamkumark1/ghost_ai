import { X, Plus, MoreHorizontal, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useProjectDialogs, Project } from "./project-context";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
}

export function ProjectSidebar({ isOpen, onClose, projects }: ProjectSidebarProps) {
  const { openCreateDialog, openRenameDialog, openDeleteDialog } = useProjectDialogs();

  const myProjects = projects.filter((p) => p.isOwner);
  const sharedProjects = projects.filter((p) => !p.isOwner);

  const renderProjectItem = (project: Project) => (
    <div
      key={project.id}
      className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer group"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <Folder className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-sm truncate">{project.name}</span>
      </div>
      {project.isOwner && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => openRenameDialog(project)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => openDeleteDialog(project)}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop Scrim */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-80 bg-background border-r border-border shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border h-14">
          <h2 className="font-semibold text-lg">Projects</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
            <X className="h-5 w-5" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        </div>

        <div className="flex-1 overflow-hidden p-4">
          <Tabs defaultValue="my-projects" className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="my-projects">My Projects</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-projects" className="flex-1 overflow-hidden mt-0 data-[state=active]:flex data-[state=active]:flex-col">
              <ScrollArea className="h-full pr-4">
                {myProjects.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground mt-8">
                    <p>No projects found.</p>
                    <p className="mt-1">Create a new project to get started.</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {myProjects.map(renderProjectItem)}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="shared" className="flex-1 overflow-hidden mt-0 data-[state=active]:flex data-[state=active]:flex-col">
              <ScrollArea className="h-full pr-4">
                {sharedProjects.length === 0 ? (
                  <div className="text-center text-sm text-muted-foreground mt-8">
                    <p>No shared projects.</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {sharedProjects.map(renderProjectItem)}
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-4 border-t border-border mt-auto">
          <Button onClick={openCreateDialog} className="w-full flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>
    </>
  );
}
