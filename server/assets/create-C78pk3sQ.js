import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { u as useApp, M as MobileShell, S as ScreenHeader } from "./MobileShell-DoUlqP7U.js";
import { B as Button } from "./button-BCyqxdKk.js";
import { I as Input } from "./input-D2i-ziMx.js";
import { c as cn, L as Label } from "./router-sXKhbtw5.js";
import "lucide-react";
import "zustand";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
const Textarea = React.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "textarea",
      {
        className: cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Textarea.displayName = "Textarea";
function CreatePage() {
  const navigate = useNavigate();
  const {
    draft,
    setDraft
  } = useApp();
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
      currency
    });
    navigate({
      to: "/split-type"
    });
  };
  return /* @__PURE__ */ jsxs(MobileShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(ScreenHeader, { title: "New split bill", subtitle: "Step 1 of 4 · Bill details", back: "/", variant: "brand" }),
    /* @__PURE__ */ jsx(Stepper, { step: 1 }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-2 space-y-5 flex-1", children: [
      /* @__PURE__ */ jsx(Field, { label: "Bill name", children: /* @__PURE__ */ jsx(Input, { value: billName, onChange: (e) => setBillName(e.target.value), placeholder: "e.g. Dinner at Ocean", className: "h-12 text-base" }) }),
      /* @__PURE__ */ jsx(Field, { label: "Merchant name", children: /* @__PURE__ */ jsx(Input, { value: merchant, onChange: (e) => setMerchant(e.target.value), placeholder: "e.g. Ocean Restaurant", className: "h-12 text-base" }) }),
      /* @__PURE__ */ jsx(Field, { label: "Description", optional: true, children: /* @__PURE__ */ jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Add a note for participants", rows: 3 }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs font-medium text-muted-foreground", children: "Currency" }),
          /* @__PURE__ */ jsxs("select", { value: currency, onChange: (e) => setCurrency(e.target.value), className: "mt-1.5 w-full h-12 rounded-lg border border-input bg-background px-3 text-base", children: [
            /* @__PURE__ */ jsx("option", { children: "MZN" }),
            /* @__PURE__ */ jsx("option", { children: "KES" }),
            /* @__PURE__ */ jsx("option", { children: "TZS" }),
            /* @__PURE__ */ jsx("option", { children: "USD" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-2", children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs font-medium text-muted-foreground", children: "Total amount" }),
          /* @__PURE__ */ jsx(Input, { value: amount, onChange: (e) => setAmount(e.target.value.replace(/[^\d.]/g, "")), placeholder: "0", inputMode: "decimal", className: "mt-1.5 h-12 text-base font-semibold" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(FooterActions, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1 h-12", onClick: () => navigate({
        to: "/"
      }), children: "Cancel" }),
      /* @__PURE__ */ jsx(Button, { className: "flex-[2] h-12 bg-brand text-brand-foreground hover:bg-brand/90", disabled: !valid, onClick: onContinue, children: "Continue" })
    ] })
  ] });
}
function Stepper({
  step
}) {
  return /* @__PURE__ */ jsx("div", { className: "px-5 -mt-3 flex gap-1.5", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "h-1 flex-1 rounded-full " + (i <= step ? "bg-brand" : "bg-muted") }, i)) });
}
function Field({
  label,
  optional,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(Label, { className: "text-xs font-medium text-muted-foreground", children: [
      label,
      " ",
      optional && /* @__PURE__ */ jsx("span", { className: "text-muted-foreground/60", children: "(optional)" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-1.5", children })
  ] });
}
function FooterActions({
  children
}) {
  return /* @__PURE__ */ jsx("div", { className: "sticky bottom-0 bg-background/95 backdrop-blur border-t border-border px-5 py-4 flex gap-3", children });
}
export {
  Field,
  FooterActions,
  Stepper,
  CreatePage as component
};
