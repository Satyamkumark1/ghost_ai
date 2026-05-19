"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Bot, X, Send, FileText, Download, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const STARTER_CHIPS = [
  "Design an e-commerce backend",
  "Create a chat app architecture",
  "Build a CI/CD pipeline",
];

const DEMO_SPEC = {
  title: "E-Commerce Backend",
  snippet:
    "RESTful API with product catalog, cart management, payment gateway integration, and order tracking. Uses PostgreSQL for persistence and Redis for caching.",
};

interface AiSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AiSidebar({ isOpen, onClose }: AiSidebarProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    const capped = Math.min(ta.scrollHeight, 160);
    ta.style.height = `${Math.max(72, capped)}px`;
  }, [input]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const id = `${Date.now()}-${Math.random()}`;
    setMessages((prev) => [
      ...prev,
      { id, role: "user", content: trimmed },
    ]);
    setInput("");
    // Stub assistant reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: `Got it! I'll help you with: "${trimmed}". Architecture generation and AI responses are coming soon.`,
        },
      ]);
    }, 600);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Floating sidebar panel */}
      <div
        className={[
          "fixed top-16 right-3 bottom-3 z-30",
          "w-[340px] flex flex-col",
          "bg-sidebar/95 border border-sidebar-border rounded-2xl shadow-2xl shadow-black/60",
          "backdrop-blur-sm",
          "transition-all duration-300 ease-in-out",
          isOpen
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-[110%] opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-sidebar-border shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-lg bg-sidebar-accent/15 border border-sidebar-accent/25 flex items-center justify-center">
              <Bot className="h-4 w-4 text-sidebar-accent" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-primary-text leading-tight">AI Workspace</h3>
              <p className="text-[11px] text-muted-text leading-tight">Collaborate with Ghost AI</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-text hover:text-primary-text hover:bg-white/5 rounded-lg"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close AI sidebar</span>
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="architect" className="flex flex-col flex-1 min-h-0">
          <TabsList className="shrink-0 mx-4 mt-3 mb-0 bg-muted border border-sidebar-border rounded-xl p-1 h-9">
            <TabsTrigger
              value="architect"
              className="flex-1 text-xs rounded-lg text-muted-text data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none transition-colors"
            >
              AI Architect
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="flex-1 text-xs rounded-lg text-muted-text data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-none transition-colors"
            >
              Specs
            </TabsTrigger>
          </TabsList>

          {/* AI Architect Tab */}
          <TabsContent value="architect" className="flex flex-col flex-1 min-h-0 mt-3">
            {/* Chat scroll area */}
            <div className="flex-1 min-h-0 px-4">
              <ScrollArea className="h-full" ref={messagesEndRef as React.RefObject<HTMLDivElement>}>
                {messages.length === 0 ? (
                  /* Empty state */
                  <div className="flex flex-col items-center text-center pt-6 pb-4 gap-3">
                    <div className="h-12 w-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary-text">Ghost AI Architect</p>
                      <p className="text-xs text-muted-text mt-1 leading-relaxed max-w-[220px]">
                        Describe a system and I&apos;ll help design the architecture diagram.
                      </p>
                    </div>
                    {/* Starter chips */}
                    <div className="flex flex-col gap-2 w-full mt-1">
                      {STARTER_CHIPS.map((chip) => (
                        <button
                          key={chip}
                          onClick={() => sendMessage(chip)}
                          className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-subtle border border-sidebar-border text-left text-xs text-accent-text hover:bg-accent/10 hover:border-accent/20 transition-colors group"
                        >
                          <span>{chip}</span>
                          <ChevronRight className="h-3 w-3 text-muted-text group-hover:text-accent transition-colors shrink-0" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Messages */
                  <div className="flex flex-col gap-3 pb-2">
                    {messages.map((msg) =>
                      msg.role === "user" ? (
                        <div key={msg.id} className="flex justify-end">
                          <div className="max-w-[85%] px-3 py-2 rounded-2xl rounded-tr-sm bg-brand-dim border-2 border-brand/50 text-copy-primary text-xs leading-relaxed">
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        <div key={msg.id} className="flex justify-start">
                          <div className="max-w-[90%] px-3 py-2 rounded-2xl rounded-tl-sm bg-elevated border border-sidebar-border text-accent-text text-xs leading-relaxed">
                            {msg.content}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Input area */}
            <div className="shrink-0 p-4 pt-3 border-t border-sidebar-border mt-2">
              <div className="flex gap-2 items-end">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe your system..."
                  className="flex-1 resize-none min-h-[72px] max-h-[160px] bg-muted border-sidebar-border text-primary-text placeholder:text-muted-text text-xs rounded-xl focus-visible:ring-accent/30 focus-visible:ring-1 focus-visible:border-accent/30 leading-relaxed"
                />
                <Button
                  size="icon"
                  className="h-9 w-9 shrink-0 bg-accent hover:bg-accent/90 text-white rounded-xl"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim()}
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
              <p className="text-[10px] text-muted-text mt-1.5 text-center">
                Enter to send · Shift+Enter for newline
              </p>
            </div>
          </TabsContent>

          {/* Specs Tab */}
          <TabsContent value="specs" className="flex flex-col flex-1 min-h-0 mt-3">
            <div className="flex flex-col gap-4 px-4 pb-4">
              {/* Generate button */}
              <Button
                className="w-full bg-accent hover:bg-accent/90 text-white font-medium text-sm h-9 rounded-xl"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Spec
              </Button>

              {/* Demo spec card */}
              <div className="rounded-xl border border-sidebar-border bg-elevated p-4 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-muted border border-sidebar-border flex items-center justify-center shrink-0">
                    <FileText className="h-4 w-4 text-muted-text" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-primary-text leading-tight">{DEMO_SPEC.title}</p>
                    <p className="text-xs text-muted-text mt-1 leading-relaxed line-clamp-3">
                      {DEMO_SPEC.snippet}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-sidebar-border">
                  <span className="text-[10px] text-muted-text uppercase tracking-wider font-medium">
                    v1.0 · 2 pages
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled
                    className="h-7 px-2.5 text-[11px] text-muted-text rounded-lg gap-1.5"
                  >
                    <Download className="h-3 w-3" />
                    Download
                  </Button>
                </div>
              </div>

              {/* Info note */}
              <p className="text-[11px] text-muted-text leading-relaxed text-center">
                Spec generation will be wired to the AI Architect output.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}