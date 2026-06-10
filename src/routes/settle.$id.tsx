import { createFileRoute, Navigate, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Download, Store } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp, fmt } from "@/lib/store";

export const Route = createFileRoute("/settle/$id")({
  head: () => ({ meta: [{ title: "Settle Merchant — Pagamos" }] }),
  component: SettlePage,
});

function SettlePage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = useApp((s) => s.collections.find((x) => x.id === id));
  const { settleMerchant } = useApp();
  const [till, setTill] = useState("123456");
  const [done, setDone] = useState(false);

  if (!c) return <Navigate to="/" />;

  const onPay = () => {
    settleMerchant(id, till);
    setTimeout(() => setDone(true), 800);
  };

  if (done) {
    const updated = useApp.getState().collections.find((x) => x.id === id)!;
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
            <h1 className="mt-6 text-2xl font-bold">Merchant paid</h1>
            <p className="text-sm text-muted-foreground mt-1">Settlement successful</p>
            <p className="text-4xl font-bold text-brand mt-6">{fmt(updated.totalAmount, updated.currency)}</p>
            <p className="text-xs text-muted-foreground mt-1">to {updated.merchantName}</p>
          </div>

          <div className="mt-8 bg-card border border-border rounded-2xl divide-y divide-border">
            <Row k="Merchant" v={updated.merchantName} />
            <Row k="Till" v={till} mono />
            <Row k="Reference" v={updated.reference ?? "—"} mono />
            <Row k="Contributors" v={String(updated.participants.filter(p => p.status === "PAID").length)} />
            <Row k="Time" v={new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })} />
          </div>

          <div className="mt-auto pt-6 space-y-2">
            <Button variant="outline" className="w-full h-12" onClick={() => alert("Receipt download (mock)")}>
              <Download className="size-4 mr-2" /> Download receipt
            </Button>
            <Link to="/">
              <Button className="w-full h-12 bg-brand text-brand-foreground hover:bg-brand/90">Done</Button>
            </Link>
          </div>
        </div>
      </MobileShell>
    );
  }

  return (
    <MobileShell hideNav hideFab>
      <ScreenHeader title="Pay merchant" subtitle="Settle from escrow" back={`/collection/${id}`} variant="brand" />
      <div className="px-5 pt-4 flex-1 flex flex-col">
        <div className="bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-success/15 text-success flex items-center justify-center">
            <Store className="size-6" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Paying</p>
            <p className="font-semibold">{c.merchantName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Amount</p>
            <p className="font-bold text-lg text-brand">{fmt(c.totalAmount, c.currency)}</p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Merchant till number</Label>
            <Input
              value={till}
              onChange={(e) => setTill(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              className="mt-1.5 h-14 text-lg font-mono tracking-widest text-center"
              placeholder="123456"
            />
          </div>
          <div>
            <Label className="text-xs font-medium text-muted-foreground">Merchant Till Number</Label>
            <Input value={c.merchantName} readOnly className="mt-1.5 h-12 bg-muted" />
          </div>
        </div>

        <div className="mt-auto pt-6 space-y-2">
          <Button
            className="w-full h-14 text-base bg-brand text-brand-foreground hover:bg-brand/90"
            disabled={till.length < 5}
            onClick={onPay}
          >
            Pay {fmt(c.totalAmount, c.currency)}
          </Button>
        </div>
      </div>
    </MobileShell>
  );
}

function Row({ k, v, mono }: { k: string; v: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between p-4">
      <span className="text-sm text-muted-foreground">{k}</span>
      <span className={"text-sm font-semibold " + (mono ? "font-mono" : "")}>{v}</span>
    </div>
  );
}
