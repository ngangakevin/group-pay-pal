import { jsx, jsxs } from "react/jsx-runtime";
import { Navigate, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { u as useApp, M as MobileShell, f as fmt } from "./MobileShell-DoUlqP7U.js";
import { B as Button } from "./button-BCyqxdKk.js";
import { b as Route } from "./router-sXKhbtw5.js";
import "zustand";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
function SuccessPage() {
  const {
    id,
    pid
  } = Route.useParams();
  const c = useApp((s) => s.collections.find((x) => x.id === id));
  if (!c) return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  const p = c.participants.find((x) => x.id === pid);
  if (!p) return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  const when = p.paidAt ? new Date(p.paidAt) : /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsx(MobileShell, { hideNav: true, hideFab: true, children: /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col px-6 pt-12 pb-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-full bg-success/20 animate-ping" }),
        /* @__PURE__ */ jsx("div", { className: "relative size-24 rounded-full bg-success text-success-foreground flex items-center justify-center", children: /* @__PURE__ */ jsx(Check, { className: "size-12", strokeWidth: 3 }) })
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 text-2xl font-bold", children: "Payment successful" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
        "You contributed to ",
        c.billName
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold text-brand mt-6", children: fmt(p.shareAmount, c.currency) }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
        "to ",
        c.merchantName
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 bg-card border border-border rounded-2xl divide-y divide-border", children: [
      /* @__PURE__ */ jsx(Row, { k: "Reference", v: p.reference ?? "—", mono: true }),
      /* @__PURE__ */ jsx(Row, { k: "Total collected", v: `${fmt(c.collectedAmount, c.currency)} / ${fmt(c.totalAmount, c.currency)}` }),
      /* @__PURE__ */ jsx(Row, { k: "Status", v: c.status === "COMPLETE" ? "Complete" : "In progress", badge: c.status === "COMPLETE" ? "success" : "warning" }),
      /* @__PURE__ */ jsx(Row, { k: "Time", v: when.toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short"
      }) })
    ] }),
    /* @__PURE__ */ jsxs("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: [
      "An SMS confirmation has been sent to ",
      p.phone
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-6 space-y-2", children: [
      /* @__PURE__ */ jsx(Link, { to: "/collection/$id", params: {
        id
      }, children: /* @__PURE__ */ jsx(Button, { className: "w-full h-12 bg-brand text-brand-foreground hover:bg-brand/90", children: "View group status" }) }),
      /* @__PURE__ */ jsx(Link, { to: "/", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "w-full h-12", children: "Done" }) })
    ] })
  ] }) });
}
function Row({
  k,
  v,
  mono,
  badge
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-4", children: [
    /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: k }),
    badge ? /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold px-2 py-0.5 rounded-full " + (badge === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning-foreground"), children: v }) : /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold " + (mono ? "font-mono" : ""), children: v })
  ] });
}
export {
  SuccessPage as component
};
