import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Receipt, Store } from "lucide-react";
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
  const journey = draft.journey ?? "PAYBILL";
  const isPaybill = journey === "PAYBILL";

  const [billName, setBillName] = useState(draft.billName ?? "");
  const [paybillName, setPaybillName] = useState(draft.merchantName ?? "");
  const [accountNumber, setAccountNumber] = useState(draft.accountNumber ?? "");
  const [tillNumber, setTillNumber] = useState(draft.tillNumber ?? "");
  const [remark, setRemark] = useState(draft.remark ?? draft.description ?? "");
  const [amount, setAmount] = useState(draft.totalAmount ? String(draft.totalAmount) : "");
  const [currency, setCurrency] = useState(draft.currency ?? "MZN");

  const valid =
    billName.trim() &&
    Number(amount) > 0 &&
    (isPaybill ? paybillName.trim() && accountNumber.trim() : tillNumber.trim());

  const onContinue = () => {
    if (!valid) return;
    setDraft({
      journey,
      billName,
      merchantName: isPaybill ? paybillName : `Till ${tillNumber}`,
      paybillNumber: isPaybill ? paybillName : undefined,
      accountNumber: isPaybill ? accountNumber : undefined,
      tillNumber: isPaybill ? undefined : tillNumber,
      remark,
      description: remark,
      totalAmount: Number(amount),
      currency,
    });
    navigate({ to: "/split-type" });
  };

  return (
    <MobileShell hideNav>
      <ScreenHeader
        title={isPaybill ? "Pay a bill" : "Buy goods"}
        subtitle="Step 1 of 4 · Payment details"
        back="/"
        variant="brand"
      />
      <Stepper step={1} />

      <div className="px-5 pt-3 flex-1 space-y-5">
        <div className="bg-card border border-border rounded-2xl p-3 flex items-center gap-3">
          <div className="size-10 rounded-xl brand-gradient text-brand-foreground flex items-center justify-center">
            {isPaybill ? <Receipt className="size-5" /> : <Store className="size-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">
              {isPaybill ? "Paybill journey" : "Buy goods journey"}
            </p>
            <p className="text-sm font-medium truncate">
              {isPaybill ? "Pay a business using paybill & account" : "Pay a merchant using till number"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setDraft({ journey: isPaybill ? "BUY_GOODS" : "PAYBILL" });
            }}
            className="text-xs font-semibold text-brand"
          >
            Switch
          </button>
        </div>

        <Field label="Pagamos bill name">
          <Input
            value={billName}
            onChange={(e) => setBillName(e.target.value)}
            placeholder="e.g. Dinner at Ocean"
            className="h-12 text-base"
          />
        </Field>

        {isPaybill ? (
          <>
            <Field label="Paybill name">
              <Input
                value={paybillName}
                onChange={(e) => setPaybillName(e.target.value)}
                placeholder="e.g. EDM, Movitel, DSTV"
                className="h-12 text-base"
              />
            </Field>
            <Field label="Account number">
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\s/g, ""))}
                placeholder="e.g. 123456789"
                inputMode="numeric"
                className="h-12 text-base"
              />
            </Field>
          </>
        ) : (
          <Field label="Till number">
            <Input
              value={tillNumber}
              onChange={(e) => setTillNumber(e.target.value.replace(/\D/g, ""))}
              placeholder="e.g. 552211"
              inputMode="numeric"
              className="h-12 text-base"
            />
          </Field>
        )}

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
            <Label className="text-xs font-medium text-muted-foreground">Amount</Label>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
              placeholder="0"
              inputMode="decimal"
              className="mt-1.5 h-12 text-base font-semibold"
            />
          </div>
        </div>

        <Field label="Remark" optional>
          <Textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Add a note for participants"
            rows={3}
          />
        </Field>
      </div>

      <FooterActions>
        <Button variant="outline" className="flex-1 h-12" onClick={() => navigate({ to: "/" })}>
          Cancel
        </Button>
        <Button
          className="flex-[2] h-12 bg-brand text-brand-foreground hover:bg-brand/90"
          disabled={!valid}
          onClick={onContinue}
        >
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
          className={"h-1 flex-1 rounded-full " + (i <= step ? "bg-brand" : "bg-muted")}
        />
      ))}
    </div>
  );
}

export function Field({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
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
