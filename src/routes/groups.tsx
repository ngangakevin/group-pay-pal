import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { MobileShell, ScreenHeader, Avatar } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/groups")({
  head: () => ({ meta: [{ title: "Saved Groups — Pagamos" }] }),
  component: GroupsPage,
});

const emojis = ["👨‍👩‍👧", "👯", "💼", "🏖️", "🎉", "🍔", "🚗", "💰"];

function GroupsPage() {
  const { groups, contacts, addGroup, removeGroup } = useApp();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("👯");
  const [members, setMembers] = useState<string[]>([]);

  const reset = () => { setName(""); setEmoji("👯"); setMembers([]); };

  return (
    <MobileShell>
      <ScreenHeader
        title="Saved groups"
        subtitle="Reuse for faster splits"
        right={
          <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
            <DialogTrigger asChild>
              <button className="size-9 rounded-full bg-brand text-brand-foreground flex items-center justify-center">
                <Plus className="size-5" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader><DialogTitle>New group</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <Input placeholder="Group name" value={name} onChange={(e) => setName(e.target.value)} />
                <div className="flex flex-wrap gap-2">
                  {emojis.map((e) => (
                    <button
                      key={e}
                      onClick={() => setEmoji(e)}
                      className={"size-10 rounded-xl text-xl flex items-center justify-center " + (emoji === e ? "bg-brand/10 ring-2 ring-brand" : "bg-muted")}
                    >{e}</button>
                  ))}
                </div>
                <div className="max-h-64 overflow-y-auto -mx-1 px-1">
                  {contacts.map((c) => {
                    const on = members.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        onClick={() => setMembers((m) => on ? m.filter(x => x !== c.id) : [...m, c.id])}
                        className={"w-full flex items-center gap-3 p-2 rounded-lg " + (on ? "bg-brand/5" : "")}
                      >
                        <Avatar initials={c.initials} color={c.color} size={32} />
                        <span className="text-sm flex-1 text-left">{c.name}</span>
                        <div className={"size-5 rounded-full border-2 " + (on ? "bg-brand border-brand" : "border-border")} />
                      </button>
                    );
                  })}
                </div>
              </div>
              <DialogFooter>
                <Button
                  className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
                  disabled={!name || members.length === 0}
                  onClick={() => {
                    addGroup({ name, emoji, members: contacts.filter(c => members.includes(c.id)) });
                    setOpen(false); reset();
                  }}
                >Save group</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="px-5 space-y-3">
        {groups.map((g) => (
          <div key={g.id} className="bg-card border border-border rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-muted text-2xl flex items-center justify-center">{g.emoji}</div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{g.name}</p>
                <p className="text-xs text-muted-foreground">{g.members.length} members</p>
              </div>
              <button onClick={() => removeGroup(g.id)} className="size-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground">
                <Trash2 className="size-4" />
              </button>
            </div>
            <div className="flex items-center mt-3">
              <div className="flex -space-x-2">
                {g.members.slice(0, 5).map((m) => (
                  <div key={m.id} className="ring-2 ring-card rounded-full">
                    <Avatar initials={m.initials} color={m.color} size={28} />
                  </div>
                ))}
              </div>
              <Link
                to="/create"
                onClick={() => useApp.getState().setDraft({ participantIds: g.members.map(m => m.id) })}
                className="ml-auto text-xs font-semibold text-brand"
              >
                Use group →
              </Link>
            </div>
          </div>
        ))}
        {groups.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">No saved groups yet.</p>
        )}
      </div>
    </MobileShell>
  );
}
