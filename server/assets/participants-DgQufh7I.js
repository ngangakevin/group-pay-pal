import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Navigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, X, UserPlus } from "lucide-react";
import { u as useApp, M as MobileShell, S as ScreenHeader, f as fmt, A as Avatar } from "./MobileShell-DoUlqP7U.js";
import { B as Button } from "./button-BCyqxdKk.js";
import { I as Input } from "./input-D2i-ziMx.js";
import { S as Stepper, F as FooterActions } from "./router-sXKhbtw5.js";
import "zustand";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
function ParticipantsPage() {
  const navigate = useNavigate();
  const {
    draft,
    setDraft,
    contacts,
    groups
  } = useApp();
  const [selected, setSelected] = useState(draft.participantIds ?? []);
  const [query, setQuery] = useState("");
  if (!draft.totalAmount) return /* @__PURE__ */ jsx(Navigate, { to: "/create" });
  const filtered = contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()) || c.phone.includes(query));
  const toggle = (id) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id]);
  const onNext = () => {
    setDraft({
      participantIds: selected
    });
    navigate({
      to: "/review"
    });
  };
  const share = selected.length ? Math.round((draft.totalAmount ?? 0) / selected.length) : 0;
  return /* @__PURE__ */ jsxs(MobileShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(ScreenHeader, { title: "Add participants", subtitle: `Step 3 of 4 · ${selected.length} selected`, back: "/split-type", variant: "brand" }),
    /* @__PURE__ */ jsx(Stepper, { step: 3 }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(Search, { className: "size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search contacts or phone", className: "h-12 pl-10" })
      ] }),
      selected.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2", children: [
          "Selected · ",
          fmt(share, draft.currency ?? "MZN"),
          " each"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5 pb-1", children: selected.map((id) => {
          const c = contacts.find((x) => x.id === id);
          if (!c) return null;
          return /* @__PURE__ */ jsxs("button", { onClick: () => toggle(id), className: "relative shrink-0 flex flex-col items-center w-16", children: [
            /* @__PURE__ */ jsx(Avatar, { initials: c.initials, color: c.color, size: 48 }),
            /* @__PURE__ */ jsx("span", { className: "absolute top-0 right-1 size-5 rounded-full bg-foreground text-background flex items-center justify-center", children: /* @__PURE__ */ jsx(X, { className: "size-3" }) }),
            /* @__PURE__ */ jsx("span", { className: "text-[10px] mt-1 truncate w-full text-center", children: c.name.split(" ")[0] })
          ] }, id);
        }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2", children: "Saved groups" }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2 overflow-x-auto no-scrollbar -mx-5 px-5", children: groups.map((g) => /* @__PURE__ */ jsxs("button", { onClick: () => setSelected(g.members.map((m) => m.id)), className: "shrink-0 px-3 py-2 rounded-full bg-muted border border-border text-sm font-medium flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsx("span", { children: g.emoji }),
          " ",
          g.name
        ] }, g.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-5 flex-1 overflow-y-auto px-5", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2", children: "Contacts" }),
      /* @__PURE__ */ jsxs("ul", { className: "space-y-1", children: [
        filtered.map((c) => {
          const on = selected.includes(c.id);
          return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { onClick: () => toggle(c.id), className: "w-full flex items-center gap-3 p-3 rounded-xl transition " + (on ? "bg-brand/5" : "hover:bg-muted"), children: [
            /* @__PURE__ */ jsx(Avatar, { initials: c.initials, color: c.color }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1 text-left", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: c.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: c.phone })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "size-6 rounded-full border-2 flex items-center justify-center " + (on ? "bg-brand border-brand text-brand-foreground" : "border-border"), children: on && /* @__PURE__ */ jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", className: "size-3.5", children: /* @__PURE__ */ jsx("path", { d: "M5 12l5 5L20 7" }) }) })
          ] }) }, c.id);
        }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, { to: "/participants", className: "w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-border text-muted-foreground", children: [
          /* @__PURE__ */ jsx("div", { className: "size-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx(UserPlus, { className: "size-5" }) }),
          /* @__PURE__ */ jsx("span", { className: "text-sm", children: "Invite by phone number" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(FooterActions, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1 h-12", onClick: () => navigate({
        to: "/split-type"
      }), children: "Back" }),
      /* @__PURE__ */ jsxs(Button, { className: "flex-[2] h-12 bg-brand text-brand-foreground hover:bg-brand/90", disabled: selected.length === 0, onClick: onNext, children: [
        "Review · ",
        selected.length
      ] })
    ] })
  ] });
}
export {
  ParticipantsPage as component
};
