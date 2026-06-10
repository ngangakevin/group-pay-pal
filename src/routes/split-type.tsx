import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Equal, Sliders } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { Stepper, FooterActions } from "./create";
import { useApp, fmt } from "@/lib/store";

export const Route = createFileRoute("/split-type")({
  head: () => ({ meta: [{ title: "Split Type — Split Pay" }] }),
  component: SplitTypePage,
});

function SplitTypePage() {
  const navigate = useNavigate();
  const { draft, setDraft } = useApp();
  const [type, setType] = useState<"EQUAL" | "CUSTOM">((draft.splitType as "EQUAL" | "CUSTOM") ?? "EQUAL");

  if (!draft.totalAmount) return <Navigate to="/create" />;
  const total = draft.totalAmount ?? 0;
  const currency = draft.currency ?? "MZN";

  const preview = useMemo(() => {
    if (type === "EQUAL") return [4, 5, 6].map((n) => ({ n, amount: Math.round(total / n) }));
    return [];
  }, [type, total]);

  const onContinue = () => {
    setDraft({ splitType: type });
    navigate({ to: "/participants" });
  };

  return (
    <MobileShell hideNav>
      <ScreenHeader title="How to split?" subtitle="Step 2 of 4 · Split method" back="/create" variant="brand" />
      <Stepper step={2} />
      <div className="px-5 pt-4 space-y-3 flex-1">
        <Option
          icon={<Equal className="size-5" />}
          title="Equal split"
          desc="Divide the bill evenly among everyone"
          selected={type === "EQUAL"}
          onClick={() => setType("EQUAL")}
        />
        <Option
          icon={<Sliders className="size-5" />}
          title="Custom split"
          desc="Assign different amounts per person"
          selected={type === "CUSTOM"}
          onClick={() => setType("CUSTOM")}
        />

        <div className="mt-6 bg-muted/40 rounded-2xl p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">
            {type === "EQUAL" ? "Preview" : "How custom split works"}
          </p>
          {type === "EQUAL" ? (
            <div className="mt-3 grid grid-cols-3 gap-2">
              {preview.map((p) => (
                <div key={p.n} className="bg-card border border-border rounded-xl p-3 text-center">
                  <p className="text-[10px] uppercase text-muted-foreground">{p.n} people</p>
                  <p className="font-bold mt-0.5">{fmt(p.amount, currency)}</p>
                  <p className="text-[10px] text-muted-foreground">each</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              You'll set the amount each participant owes after adding them. Useful when shares are uneven.
            </p>
          )}
        </div>

        <div className="mt-4 bg-card border border-border rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Total bill</p>
            <p className="font-bold text-lg">{fmt(total, currency)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Merchant</p>
            <p className="font-semibold text-sm">{draft.merchantName}</p>
          </div>
        </div>
      </div>

      <FooterActions>
        <Button variant="outline" className="flex-1 h-12" onClick={() => navigate({ to: "/create" })}>Back</Button>
        <Button className="flex-[2] h-12 bg-brand text-brand-foreground hover:bg-brand/90" onClick={onContinue}>
          Continue
        </Button>
      </FooterActions>
    </MobileShell>
  );
}

function Option({
  icon, title, desc, selected, onClick,
}: { icon: React.ReactNode; title: string; desc: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full text-left p-4 rounded-2xl border-2 transition flex items-center gap-3 " +
        (selected ? "border-brand bg-brand/5" : "border-border bg-card")
      }
    >
      <div className={"size-11 rounded-xl flex items-center justify-center " + (selected ? "bg-brand text-brand-foreground" : "bg-muted text-foreground")}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <div className={"size-6 rounded-full border-2 flex items-center justify-center " + (selected ? "bg-brand border-brand text-brand-foreground" : "border-border")}>
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </div>
    </button>
  );
}
