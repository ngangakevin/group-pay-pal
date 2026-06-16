import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Navigate } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { Equal, Sliders, Check } from "lucide-react";
import { u as useApp, M as MobileShell, S as ScreenHeader, f as fmt } from "./MobileShell-DoUlqP7U.js";
import { B as Button } from "./button-BCyqxdKk.js";
import { S as Stepper, F as FooterActions } from "./router-sXKhbtw5.js";
import "zustand";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
function SplitTypePage() {
  const navigate = useNavigate();
  const {
    draft,
    setDraft
  } = useApp();
  const [type, setType] = useState(draft.splitType ?? "EQUAL");
  if (!draft.totalAmount) return /* @__PURE__ */ jsx(Navigate, { to: "/create" });
  const total = draft.totalAmount ?? 0;
  const currency = draft.currency ?? "MZN";
  const preview = useMemo(() => {
    if (type === "EQUAL") return [4, 5, 6].map((n) => ({
      n,
      amount: Math.round(total / n)
    }));
    return [];
  }, [type, total]);
  const onContinue = () => {
    setDraft({
      splitType: type
    });
    navigate({
      to: "/participants"
    });
  };
  return /* @__PURE__ */ jsxs(MobileShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(ScreenHeader, { title: "How to split?", subtitle: "Step 2 of 4 · Split method", back: "/create", variant: "brand" }),
    /* @__PURE__ */ jsx(Stepper, { step: 2 }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-4 space-y-3 flex-1", children: [
      /* @__PURE__ */ jsx(Option, { icon: /* @__PURE__ */ jsx(Equal, { className: "size-5" }), title: "Equal split", desc: "Divide the bill evenly among everyone", selected: type === "EQUAL", onClick: () => setType("EQUAL") }),
      /* @__PURE__ */ jsx(Option, { icon: /* @__PURE__ */ jsx(Sliders, { className: "size-5" }), title: "Custom split", desc: "Assign different amounts per person", selected: type === "CUSTOM", onClick: () => setType("CUSTOM") }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 bg-muted/40 rounded-2xl p-4", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wide text-muted-foreground font-semibold", children: type === "EQUAL" ? "Preview" : "How custom split works" }),
        type === "EQUAL" ? /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-3 gap-2", children: preview.map((p) => /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-xl p-3 text-center", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[10px] uppercase text-muted-foreground", children: [
            p.n,
            " people"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mt-0.5", children: fmt(p.amount, currency) }),
          /* @__PURE__ */ jsx("p", { className: "text-[10px] text-muted-foreground", children: "each" })
        ] }, p.n)) }) : /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "You'll set the amount each participant owes after adding them. Useful when shares are uneven." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-card border border-border rounded-2xl p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Total bill" }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-lg", children: fmt(total, currency) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Merchant" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: draft.merchantName })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(FooterActions, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1 h-12", onClick: () => navigate({
        to: "/create"
      }), children: "Back" }),
      /* @__PURE__ */ jsx(Button, { className: "flex-[2] h-12 bg-brand text-brand-foreground hover:bg-brand/90", onClick: onContinue, children: "Continue" })
    ] })
  ] });
}
function Option({
  icon,
  title,
  desc,
  selected,
  onClick
}) {
  return /* @__PURE__ */ jsxs("button", { onClick, className: "w-full text-left p-4 rounded-2xl border-2 transition flex items-center gap-3 " + (selected ? "border-brand bg-brand/5" : "border-border bg-card"), children: [
    /* @__PURE__ */ jsx("div", { className: "size-11 rounded-xl flex items-center justify-center " + (selected ? "bg-brand text-brand-foreground" : "bg-muted text-foreground"), children: icon }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: "font-semibold", children: title }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: desc })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "size-6 rounded-full border-2 flex items-center justify-center " + (selected ? "bg-brand border-brand text-brand-foreground" : "border-border"), children: selected && /* @__PURE__ */ jsx(Check, { className: "size-3.5", strokeWidth: 3 }) })
  ] });
}
export {
  SplitTypePage as component
};
