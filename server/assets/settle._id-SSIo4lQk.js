import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Navigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Download, Store } from "lucide-react";
import { u as useApp, M as MobileShell, f as fmt, S as ScreenHeader } from "./MobileShell-DoUlqP7U.js";
import { B as Button } from "./button-BCyqxdKk.js";
import { I as Input } from "./input-D2i-ziMx.js";
import { R as Route, L as Label } from "./router-sXKhbtw5.js";
import "zustand";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
function SettlePage() {
  const {
    id
  } = Route.useParams();
  useNavigate();
  const c = useApp((s) => s.collections.find((x) => x.id === id));
  const {
    settleMerchant
  } = useApp();
  const [till, setTill] = useState("123456");
  const [done, setDone] = useState(false);
  if (!c) return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  const onPay = () => {
    settleMerchant(id, till);
    setTimeout(() => setDone(true), 800);
  };
  if (done) {
    const updated = useApp.getState().collections.find((x) => x.id === id);
    return /* @__PURE__ */ jsx(MobileShell, { hideNav: true, hideFab: true, children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col px-6 pt-12 pb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-success/20 animate-ping" }),
          /* @__PURE__ */ jsx("div", { className: "relative size-24 rounded-full bg-success text-success-foreground flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { className: "size-12", strokeWidth: 3 }) })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "mt-6 text-2xl font-bold", children: "Merchant paid" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Settlement successful" }),
        /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold text-brand mt-6", children: fmt(updated.totalAmount, updated.currency) }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "to ",
          updated.merchantName
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-card border border-border rounded-2xl divide-y divide-border", children: [
        /* @__PURE__ */ jsx(Row, { k: "Merchant", v: updated.merchantName }),
        /* @__PURE__ */ jsx(Row, { k: "Till", v: till, mono: true }),
        /* @__PURE__ */ jsx(Row, { k: "Reference", v: updated.reference ?? "—", mono: true }),
        /* @__PURE__ */ jsx(Row, { k: "Contributors", v: String(updated.participants.filter((p) => p.status === "PAID").length) }),
        /* @__PURE__ */ jsx(Row, { k: "Time", v: (/* @__PURE__ */ new Date()).toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short"
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-6 space-y-2", children: [
        /* @__PURE__ */ jsxs(Button, { variant: "outline", className: "w-full h-12", onClick: () => alert("Receipt download (mock)"), children: [
          /* @__PURE__ */ jsx(Download, { className: "size-4 mr-2" }),
          " Download receipt"
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Button, { className: "w-full h-12 bg-brand text-brand-foreground hover:bg-brand/90", children: "Done" }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxs(MobileShell, { hideNav: true, hideFab: true, children: [
    /* @__PURE__ */ jsx(ScreenHeader, { title: "Pay merchant", subtitle: "Settle from escrow", back: `/collection/${id}`, variant: "brand" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-4 flex-1 flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-2xl p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "size-12 rounded-xl bg-success/15 text-success flex items-center justify-center", children: /* @__PURE__ */ jsx(Store, { className: "size-6" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Paying" }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: c.merchantName })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Amount" }),
          /* @__PURE__ */ jsx("p", { className: "font-bold text-lg text-brand", children: fmt(c.totalAmount, c.currency) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs font-medium text-muted-foreground", children: "Merchant till number" }),
          /* @__PURE__ */ jsx(Input, { value: till, onChange: (e) => setTill(e.target.value.replace(/\D/g, "")), inputMode: "numeric", className: "mt-1.5 h-14 text-lg font-mono tracking-widest text-center", placeholder: "123456" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { className: "text-xs font-medium text-muted-foreground", children: "Merchant name" }),
          /* @__PURE__ */ jsx(Input, { value: c.merchantName, readOnly: true, className: "mt-1.5 h-12 bg-muted" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-auto pt-6 space-y-2", children: /* @__PURE__ */ jsxs(Button, { className: "w-full h-14 text-base bg-brand text-brand-foreground hover:bg-brand/90", disabled: till.length < 5, onClick: onPay, children: [
        "Pay ",
        fmt(c.totalAmount, c.currency)
      ] }) })
    ] })
  ] });
}
function Row({
  k,
  v,
  mono
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: k }),
    /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold " + (mono ? "font-mono" : ""), children: v })
  ] });
}
export {
  SettlePage as component
};
