import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Delete, Shield } from "lucide-react";
import { MobileShell, ScreenHeader, Avatar } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { useApp, fmt } from "@/lib/store";

export const Route = createFileRoute("/pay/$id/$pid")({
  head: () => ({ meta: [{ title: "Pay Share — Split Pay" }] }),
  component: PayPage,
});

function PayPage() {
  const { id, pid } = Route.useParams();
  const navigate = useNavigate();
  const c = useApp((s) => s.collections.find((x) => x.id === id));
  const { payShare, declineShare } = useApp();
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"review" | "pin" | "processing">("review");

  if (!c) return <Navigate to="/" />;
  const p = c.participants.find((x) => x.id === pid);
  if (!p) return <Navigate to="/collection/$id" params={{ id }} />;

  const press = (k: string) => {
    if (k === "del") setPin((s) => s.slice(0, -1));
    else if (pin.length < 4) setPin((s) => s + k);
  };

  const confirm = () => {
    setStep("processing");
    setTimeout(() => {
      payShare(id, pid);
      navigate({ to: "/success/$id/$pid", params: { id, pid } });
    }, 1200);
  };

  return (
    <MobileShell hideNav hideFab>
      {step === "review" && (
        <>
          <ScreenHeader title="Payment request" back={`/collection/${id}`} variant="brand" />
          <div className="px-5 pt-2 flex-1 flex flex-col">
            <div className="bg-card border border-border rounded-2xl p-5 mt-2">
              <p className="text-xs text-muted-foreground">{c.merchantName}</p>
              <p className="font-semibold text-lg mt-0.5">{c.billName}</p>
              <div className="flex items-center gap-3 mt-4">
                <Avatar initials={p.initials} color={p.color} />
                <div className="flex-1">
                  <p className="font-medium">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.phone}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-gradient-to-br from-brand/10 to-brand/5 border border-brand/20 rounded-2xl p-5 text-center">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Your share</p>
              <p className="text-4xl font-bold text-brand mt-1">{fmt(p.shareAmount, c.currency)}</p>
              <p className="text-xs text-muted-foreground mt-2">
                of {fmt(c.totalAmount, c.currency)} total · {c.participants.length} contributors
              </p>
            </div>

            <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4">
              <Shield className="size-4 text-success" /> Secured by M-Pesa
            </p>

            <div className="mt-auto pt-4 space-y-2">
              <Button
                className="w-full h-12 bg-brand text-brand-foreground hover:bg-brand/90"
                onClick={() => setStep("pin")}
              >
                Pay {fmt(p.shareAmount, c.currency)}
              </Button>
              <Button
                variant="ghost"
                className="w-full h-12 text-muted-foreground"
                onClick={() => { declineShare(id, pid); navigate({ to: "/collection/$id", params: { id } }); }}
              >
                Decline
              </Button>
            </div>
          </div>
        </>
      )}

      {step === "pin" && (
        <>
          <ScreenHeader title="Enter M-Pesa PIN" subtitle={`Paying ${fmt(p.shareAmount, c.currency)}`} back variant="brand" />
          <div className="px-5 pt-6 flex-1 flex flex-col">
            <div className="flex justify-center gap-3 mt-4">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={
                    "size-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold " +
                    (pin.length > i ? "border-brand bg-brand/5 text-brand" : "border-border")
                  }
                >
                  {pin.length > i ? "•" : ""}
                </div>
              ))}
            </div>
            <button className="text-brand text-sm font-medium mt-4 mx-auto">Forgot PIN?</button>

            <div className="mt-auto">
              <div className="grid grid-cols-3 gap-2 select-none">
                {["1","2","3","4","5","6","7","8","9","","0","del"].map((k, i) =>
                  k === "" ? <div key={i} /> : (
                    <button
                      key={i}
                      onClick={() => press(k)}
                      className="h-14 rounded-2xl bg-muted active:bg-brand/10 text-xl font-semibold flex items-center justify-center"
                    >
                      {k === "del" ? <Delete className="size-5" /> : k}
                    </button>
                  ),
                )}
              </div>
              <Button
                className="w-full h-12 mt-4 bg-brand text-brand-foreground hover:bg-brand/90"
                disabled={pin.length !== 4}
                onClick={confirm}
              >
                Confirm payment
              </Button>
            </div>
          </div>
        </>
      )}

      {step === "processing" && (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="size-16 rounded-full border-4 border-brand/20 border-t-brand animate-spin" />
          <p className="mt-6 font-semibold">Processing payment…</p>
          <p className="text-sm text-muted-foreground mt-1">Don't close this screen</p>
        </div>
      )}
    </MobileShell>
  );
}
