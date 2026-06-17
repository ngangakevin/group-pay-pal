import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { ShieldCheck, Wallet } from "lucide-react";
import { MobileShell, ScreenHeader, Avatar } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { Stepper, FooterActions } from "./create";
import { useApp, fmt } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Review Split — Pagamos" }] }),
  component: ReviewPage,
});

function ReviewPage() {
  const navigate = useNavigate();
  const { draft, contacts, createCollection } = useApp();

  if (!draft.totalAmount || !draft.participantIds?.length) return <Navigate to="/create" />;

  const total = draft.totalAmount ?? 0;
  const currency = draft.currency ?? "MZN";
  const selected = contacts.filter((c) => draft.participantIds!.includes(c.id));
  const share = Math.round(total / selected.length);

  const onStart = () => {
    const id = createCollection();
    navigate({ to: "/" });
    toast.success("Collection started", { description: "Invitations sent to participants" });
  };

  return (
    <MobileShell hideNav>
      <ScreenHeader title="Review & confirm" subtitle="Step 4 of 4 · Final check" back="/participants" variant="brand" />
      <Stepper step={4} />

      <div className="px-5 pt-4 space-y-4 flex-1">
        <div className="bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Merchant</p>
              <p className="font-semibold">{draft.merchantName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total bill</p>
              <p className="font-bold text-xl text-brand">{fmt(total, currency)}</p>
            </div>
          </div>
          {draft.description && (
            <p className="text-sm text-muted-foreground mt-3 border-t border-border pt-3">{draft.description}</p>
          )}
        </div>

        <div className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-2xl p-4 flex items-start gap-3">
          <div className="size-10 rounded-xl bg-success/15 text-success flex items-center justify-center shrink-0">
            <Wallet className="size-5" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm">Escrow wallet ready</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Funds collected from {selected.length} participants will be held securely until you settle the merchant.
            </p>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2 px-1">
            {selected.length} participants · {fmt(share, currency)} each
          </p>
          <div className="bg-card border border-border rounded-2xl divide-y divide-border">
            {selected.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3.5">
                <Avatar initials={p.initials} color={p.color} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{p.phone}</p>
                </div>
                <p className="font-semibold text-sm">{fmt(share, currency)}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
          <ShieldCheck className="size-4 text-success" />
          Funds held securely in escrow
        </p>
      </div>

      <FooterActions>
        <Button variant="outline" className="flex-1 h-12" onClick={() => navigate({ to: "/participants" })}>Edit</Button>
        <Button className="flex-[2] h-12 bg-brand text-brand-foreground hover:bg-brand/90" onClick={onStart}>
          Start collection
        </Button>
      </FooterActions>
    </MobileShell>
  );
}
