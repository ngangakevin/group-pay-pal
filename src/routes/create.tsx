import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApp } from "@/lib/store";

export const Route = createFileRoute("/create")({
  head: () => ({ meta: [{ title: "Create Split — Pagamos" }] }),
  component: CreatePage,
});

function CreatePage() {
  const navigate = useNavigate();
  const { draft, setDraft } = useApp();
  const [billName, setBillName] = useState(draft.billName ?? "");
  const [merchant, setMerchant] = useState(draft.merchantName ?? "");
  const [description, setDescription] = useState(draft.description ?? "");
  const [amount, setAmount] = useState(draft.totalAmount ? String(draft.totalAmount) : "");
  const [currency, setCurrency] = useState(draft.currency ?? "MZN");

  const valid = billName.trim() && merchant.trim() && Number(amount) > 0;

  const onContinue = () => {
    if (!valid) return;
    setDraft({
      billName,
      merchantName: merchant,
      description,
      totalAmount: Number(amount),
      currency,
    });
    navigate({ to: "/split-type" });
  };

  return (
    <MobileShell hideNav>
      <ScreenHeader title="New split bill" subtitle="Step 1 of 4 · Bill details" back="/" variant="brand" />
      <Stepper step={1} />
      <div className="px-5 pt-2 space-y-5 flex-1">
        <Field label="Bill name">
          <Input
            value={billName}
            onChange={(e) => setBillName(e.target.value)}
            placeholder="e.g. Dinner at Ocean"
            className="h-12 text-base"
          />
        </Field>
        <Field label="Merchant name">
          <Input
            value={merchant}
            onChange={(e) => setMerchant(e.target.value)}
            placeholder="e.g. Ocean Restaurant"
            className="h-12 text-base"
          />
        </Field>
        <Field label="Description" optional>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note for participants"
            rows={3}
          />
        </Field>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-1">
            <Label className="text-xs font-medium text-muted-foreground">Currency</Label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1.5 w-full h-12 rounded-lg border border-input bg-background px-3 text-base"
            >
              <option>MZN</option>
              <option>KES</option>
              <option>TZS</option>
              <option>USD</option>
            </select>
          </div>
          <div className="col-span-2">
            <Label className="text-xs font-medium text-muted-foreground">Total amount</Label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="0"
              inputMode="decimal"
              className="mt-1.5 h-12 text-base font-semibold"
            />
          </div>
        </div>
      </div>

      <FooterActions>
        <Button variant="outline" className="flex-1 h-12" onClick={() => navigate({ to: "/" })}>
          Cancel
        </Button>
        <Button className="flex-[2] h-12 bg-brand text-brand-foreground hover:bg-brand/90" disabled={!valid} onClick={onContinue}>
          Continue
        </Button>
      </FooterActions>
    </MobileShell>
  );
}

export function Stepper({ step }: { step: 1 | 2 | 3 | 4 }) {
  return (
    <div className="px-5 -mt-3 flex gap-1.5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={
            "h-1 flex-1 rounded-full " + (i <= step ? "bg-brand" : "bg-muted")
          }
        />
      ))}
    </div>
  );
}

export function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs font-medium text-muted-foreground">
        {label} {optional && <span className="text-muted-foreground/60">(optional)</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

export function FooterActions({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t border-border px-5 py-4 flex gap-3">
      {children}
    </div>
  );
}
