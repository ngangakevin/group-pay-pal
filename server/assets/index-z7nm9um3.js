import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Sparkles, CheckCircle2, Users, TrendingUp, ArrowRight } from "lucide-react";
import { u as useApp, M as MobileShell, A as Avatar, f as fmt } from "./MobileShell-DoUlqP7U.js";
import { P as Progress } from "./progress-DS4W4PFF.js";
import "zustand";
import "./router-sXKhbtw5.js";
import "@tanstack/react-query";
import "react";
import "sonner";
import "@radix-ui/react-label";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-progress";
function Dashboard() {
  const {
    me,
    collections
  } = useApp();
  const active = collections.filter((c) => c.status === "ACTIVE" || c.status === "COMPLETE");
  const done = collections.filter((c) => c.status === "SETTLED");
  const totalCollected = collections.reduce((a, c) => a + c.collectedAmount, 0);
  return /* @__PURE__ */ jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsxs("section", { className: "brand-gradient text-brand-foreground px-5 pt-7 pb-10 rounded-b-3xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-2xl", "aria-hidden": true }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx(Avatar, { initials: me.initials, color: "rgba(255,255,255,0.2)" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-white/70", children: "Karibu" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: me.name })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-wider text-white/70", children: "Split Pay" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/90 font-medium", children: "Vodacom · M-Pesa" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-6 relative", children: [
        /* @__PURE__ */ jsx("p", { className: "text-xs text-white/80", children: "Total collected this month" }),
        /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold tracking-tight mt-1", children: fmt(totalCollected) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 grid grid-cols-3 gap-2 text-center", children: [
          /* @__PURE__ */ jsx(Stat, { icon: /* @__PURE__ */ jsx(Sparkles, { className: "size-4" }), label: "Active", value: String(active.length) }),
          /* @__PURE__ */ jsx(Stat, { icon: /* @__PURE__ */ jsx(CheckCircle2, { className: "size-4" }), label: "Settled", value: String(done.length) }),
          /* @__PURE__ */ jsx(Stat, { icon: /* @__PURE__ */ jsx(Users, { className: "size-4" }), label: "Groups", value: String(useApp.getState().groups.length) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "px-5 -mt-5 relative z-10", children: /* @__PURE__ */ jsx(Link, { to: "/create", className: "block bg-card border border-border rounded-2xl p-4 shadow-sm active:scale-[0.99] transition", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsx("div", { className: "size-11 rounded-xl brand-gradient text-brand-foreground flex items-center justify-center", children: /* @__PURE__ */ jsx(TrendingUp, { className: "size-5" }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Create Split Bill" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Start a new collection in seconds" })
      ] }),
      /* @__PURE__ */ jsx(ArrowRight, { className: "size-5 text-muted-foreground" })
    ] }) }) }),
    /* @__PURE__ */ jsxs("section", { className: "px-5 mt-7", children: [
      /* @__PURE__ */ jsx(SectionTitle, { title: "Active collections", link: null }),
      active.length === 0 ? /* @__PURE__ */ jsx(Empty, { text: "No active splits. Tap + to start." }) : /* @__PURE__ */ jsx("div", { className: "space-y-3", children: active.map((c) => /* @__PURE__ */ jsx(CollectionCard, { c }, c.id)) })
    ] }),
    done.length > 0 && /* @__PURE__ */ jsxs("section", { className: "px-5 mt-7", children: [
      /* @__PURE__ */ jsx(SectionTitle, { title: "Recently settled" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-3", children: done.slice(0, 3).map((c) => /* @__PURE__ */ jsx(CollectionCard, { c, settled: true }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "px-5 mt-7", children: [
      /* @__PURE__ */ jsx(SectionTitle, { title: "Saved groups", link: "/groups" }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2", children: useApp.getState().groups.map((g) => /* @__PURE__ */ jsxs(Link, { to: "/create", onClick: () => useApp.getState().setDraft({
        participantIds: g.members.map((m) => m.id)
      }), className: "shrink-0 w-32 bg-card border border-border rounded-2xl p-3 active:scale-95 transition", children: [
        /* @__PURE__ */ jsx("div", { className: "text-2xl", children: g.emoji }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 font-semibold text-sm truncate", children: g.name }),
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-muted-foreground", children: [
          g.members.length,
          " members"
        ] })
      ] }, g.id)) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-6" })
  ] });
}
function Stat({
  icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur rounded-xl py-2.5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 text-white/80 text-[10px] uppercase tracking-wide", children: [
      icon,
      label
    ] }),
    /* @__PURE__ */ jsx("p", { className: "font-bold text-lg leading-none mt-1", children: value })
  ] });
}
function SectionTitle({
  title,
  link
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
    /* @__PURE__ */ jsx("h2", { className: "font-semibold text-sm uppercase tracking-wider text-muted-foreground", children: title }),
    link && /* @__PURE__ */ jsx(Link, { to: link, className: "text-xs font-medium text-brand", children: "See all" })
  ] });
}
function Empty({
  text
}) {
  return /* @__PURE__ */ jsx("div", { className: "bg-card border border-dashed border-border rounded-2xl p-6 text-center text-sm text-muted-foreground", children: text });
}
function CollectionCard({
  c,
  settled
}) {
  const pct = c.totalAmount ? Math.min(100, c.collectedAmount / c.totalAmount * 100) : 0;
  const paidCount = c.participants.filter((p) => p.status === "PAID").length;
  return /* @__PURE__ */ jsxs(Link, { to: "/collection/$id", params: {
    id: c.id
  }, className: "block bg-card border border-border rounded-2xl p-4 active:scale-[0.99] transition", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "font-semibold truncate", children: c.billName }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground truncate", children: c.merchantName })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide " + (settled ? "bg-success/15 text-success" : c.status === "COMPLETE" ? "bg-success/15 text-success" : "bg-brand/10 text-brand"), children: settled ? "Settled" : c.status === "COMPLETE" ? "Ready to pay" : "Live" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
      /* @__PURE__ */ jsx(Progress, { value: pct, className: "h-2 bg-muted [&>div]:bg-brand" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2 text-xs", children: [
        /* @__PURE__ */ jsxs("span", { className: "font-semibold", children: [
          fmt(c.collectedAmount, c.currency),
          " ",
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground font-normal", children: [
            "/ ",
            fmt(c.totalAmount, c.currency)
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
          paidCount,
          "/",
          c.participants.length,
          " paid"
        ] })
      ] })
    ] })
  ] });
}
export {
  Dashboard as component
};
