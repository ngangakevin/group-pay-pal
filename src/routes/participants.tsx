import { createFileRoute, useNavigate, Navigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X, UserPlus } from "lucide-react";
import { MobileShell, ScreenHeader, Avatar } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stepper, FooterActions } from "./create";
import { useApp, fmt } from "@/lib/store";

export const Route = createFileRoute("/participants")({
  head: () => ({ meta: [{ title: "Add Participants — Split Pay" }] }),
  component: ParticipantsPage,
});

function ParticipantsPage() {
  const navigate = useNavigate();
  const { draft, setDraft, contacts, groups } = useApp();
  const [selected, setSelected] = useState<string[]>(draft.participantIds ?? []);
  const [query, setQuery] = useState("");

  if (!draft.totalAmount) return <Navigate to="/create" />;

  const filtered = contacts.filter(
    (c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query),
  );

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const onNext = () => {
    setDraft({ participantIds: selected });
    navigate({ to: "/review" });
  };

  const share = selected.length ? Math.round((draft.totalAmount ?? 0) / selected.length) : 0;

  return (
    <MobileShell hideNav>
      <ScreenHeader
        title="Add participants"
        subtitle={`Step 3 of 4 · ${selected.length} selected`}
        back="/split-type"
        variant="brand"
      />
      <Stepper step={3} />

      <div className="px-5 pt-4">
        <div className="relative">
          <Search className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search contacts or phone"
            className="h-12 pl-10"
          />
        </div>

        {selected.length > 0 && (
          <div className="mt-4">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2">
              Selected · {fmt(share, draft.currency ?? "MZN")} each
            </p>
            <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1">
              {selected.map((id) => {
                const c = contacts.find((x) => x.id === id);
                if (!c) return null;
                return (
                  <button
                    key={id}
                    onClick={() => toggle(id)}
                    className="relative shrink-0 flex flex-col items-center w-16"
                  >
                    <Avatar initials={c.initials} color={c.color} size={48} />
                    <span className="absolute top-0 right-1 size-5 rounded-full bg-foreground text-background flex items-center justify-center">
                      <X className="size-3" />
                    </span>
                    <span className="text-[10px] mt-1 truncate w-full text-center">{c.name.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-5">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2">
            Saved groups
          </p>
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5">
            {groups.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelected(g.members.map((m) => m.id))}
                className="shrink-0 px-3 py-2 rounded-full bg-muted border border-border text-sm font-medium flex items-center gap-1.5"
              >
                <span>{g.emoji}</span> {g.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5 flex-1 overflow-y-auto px-5">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2">
          Contacts
        </p>
        <ul className="space-y-1">
          {filtered.map((c) => {
            const on = selected.includes(c.id);
            return (
              <li key={c.id}>
                <button
                  onClick={() => toggle(c.id)}
                  className={
                    "w-full flex items-center gap-3 p-3 rounded-xl transition " +
                    (on ? "bg-brand/5" : "hover:bg-muted")
                  }
                >
                  <Avatar initials={c.initials} color={c.color} />
                  <div className="flex-1 text-left">
                    <p className="font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.phone}</p>
                  </div>
                  <div
                    className={
                      "size-6 rounded-full border-2 flex items-center justify-center " +
                      (on ? "bg-brand border-brand text-brand-foreground" : "border-border")
                    }
                  >
                    {on && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="size-3.5">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    )}
                  </div>
                </button>
              </li>
            );
          })}
          <li>
            <Link
              to="/participants"
              className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-border text-muted-foreground"
            >
              <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                <UserPlus className="size-5" />
              </div>
              <span className="text-sm">Invite by phone number</span>
            </Link>
          </li>
        </ul>
      </div>

      <FooterActions>
        <Button variant="outline" className="flex-1 h-12" onClick={() => navigate({ to: "/split-type" })}>Back</Button>
        <Button
          className="flex-[2] h-12 bg-brand text-brand-foreground hover:bg-brand/90"
          disabled={selected.length === 0}
          onClick={onNext}
        >
          Review · {selected.length}
        </Button>
      </FooterActions>
    </MobileShell>
  );
}
