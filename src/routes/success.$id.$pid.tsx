import { createFileRoute, Navigate, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { useApp, fmt } from "@/lib/store";

export const Route = createFileRoute("/success/$id/$pid")({
  head: () => ({ meta: [{ title: "Payment Successful — Pagamos" }] }),
  component: SuccessPage,
});

function SuccessPage() {
  const { id, pid } = Route.useParams();
  const c = useApp((s) => s.collections.find((x) => x.id === id));
  if (!c) return <Navigate to="/" />;
  const p = c.participants.find((x) => x.id === pid);
  if (!p) return <Navigate to="/" />;
  const when = p.paidAt ? new Date(p.paidAt) : new Date();

  return (
    <MobileShell hideNav hideFab>
      <div className="flex-1 flex flex-col px-6 pt-12 pb-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" />
            <div className="relative size-24 rounded-full bg-success text-success-foreground flex items-center justify-center">
              <Check className="size-12" strokeWidth={3} />
            </div>
          </div>
          <h1 className="mt-6 text-2xl font-bold">Payment successful</h1>
          <p className="text-sm text-muted-foreground mt-1">You contributed to {c.billName}</p>
          <p className="text-4xl font-bold text-brand mt-6">{fmt(p.shareAmount, c.currency)}</p>
          <p className="text-xs text-muted-foreground mt-1">to {c.merchantName}</p>
        </div>

        <div className="mt-8 bg-card border border-border rounded-2xl divide-y divide-border">
          <Row k="Reference" v={p.reference ?? "—"} mono />
          <Row k="Total collected" v={`${fmt(c.collectedAmount, c.currency)} / ${fmt(c.totalAmount, c.currency)}`} />
          <Row
            k="Status"
            v={c.status === "COMPLETE" ? "Complete" : "In progress"}
            badge={c.status === "COMPLETE" ? "success" : "warning"}
          />
          <Row k="Time" v={when.toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          An SMS confirmation has been sent to {p.phone}
        </p>

        <div className="mt-auto pt-6 space-y-2">
          <Link to="/collection/$id" params={{ id }}>
            <Button className="w-full h-12 bg-brand text-brand-foreground hover:bg-brand/90">
              View group status
            </Button>
          </Link>
          <Link to="/">
            <Button variant="ghost" className="w-full h-12">Done</Button>
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}

function Row({ k, v, mono, badge }: { k: string; v: string; mono?: boolean; badge?: "success" | "warning" }) {
  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-sm text-muted-foreground">{k}</span>
      {badge ? (
        <span className={
          "text-xs font-semibold px-2 py-0.5 rounded-full " +
          (badge === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning-foreground")
        }>{v}</span>
      ) : (
        <span className={"text-sm font-semibold " + (mono ? "font-mono" : "")}>{v}</span>
      )}
    </div>
  );
}
