import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useRouterState, Link } from "@tanstack/react-router";
import { Plus, Home, Users, Bell, User } from "lucide-react";
import { create } from "zustand";
import { c as cn } from "./router-sXKhbtw5.js";
const palette = [
  "oklch(0.7 0.16 27)",
  "oklch(0.7 0.16 152)",
  "oklch(0.7 0.16 250)",
  "oklch(0.7 0.16 60)",
  "oklch(0.7 0.16 300)",
  "oklch(0.7 0.16 200)"
];
const id = () => Math.random().toString(36).slice(2, 10);
const ref = () => Array.from(
  { length: 10 },
  () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]
).join("");
const seedContacts = [
  { id: "u1", name: "Amelia Tembe", phone: "+258 84 111 2233", initials: "AT", color: palette[0] },
  { id: "u2", name: "Cate Mucavele", phone: "+258 84 222 3344", initials: "CM", color: palette[1] },
  { id: "u3", name: "Jess Macuacua", phone: "+258 84 333 4455", initials: "JM", color: palette[2] },
  { id: "u4", name: "Makena Ali", phone: "+258 84 444 5566", initials: "MA", color: palette[3] },
  { id: "u5", name: "Noella Sitoe", phone: "+258 84 555 6677", initials: "NS", color: palette[4] },
  { id: "u6", name: "Tomas Langa", phone: "+258 84 666 7788", initials: "TL", color: palette[5] },
  { id: "u7", name: "Rui Chissano", phone: "+258 84 777 8899", initials: "RC", color: palette[0] },
  { id: "u8", name: "Lara Mondlane", phone: "+258 84 888 9900", initials: "LM", color: palette[1] }
];
const seedGroups = [
  { id: "g1", name: "Trip Crew", emoji: "🏖️", members: seedContacts.slice(0, 5) },
  { id: "g2", name: "Office Team", emoji: "💼", members: seedContacts.slice(2, 7) },
  { id: "g3", name: "Family", emoji: "🏠", members: seedContacts.slice(1, 5) }
];
const demoCollection = {
  id: "demo1",
  billName: "Dinner at Ocean",
  merchantName: "Ocean Restaurant",
  totalAmount: 12e3,
  collectedAmount: 4800,
  currency: "MZN",
  status: "ACTIVE",
  splitType: "EQUAL",
  createdAt: new Date(Date.now() - 1e3 * 60 * 30).toISOString(),
  participants: seedContacts.slice(0, 5).map((c, i) => ({
    ...c,
    shareAmount: 2400,
    status: i < 2 ? "PAID" : i === 4 ? "DECLINED" : "PENDING",
    paidAt: i < 2 ? (/* @__PURE__ */ new Date()).toISOString() : void 0,
    reference: i < 2 ? ref() : void 0
  }))
};
const useApp = create((set, get) => ({
  me: { name: "Makena Ali", phone: "+258 84 444 5566", initials: "MA" },
  contacts: seedContacts,
  groups: seedGroups,
  collections: [demoCollection],
  notifications: [
    { id: id(), type: "PAID", title: "Amelia paid her share", body: "MZN 2,400 contributed to Dinner at Ocean", time: "2m ago", read: false },
    { id: id(), type: "INVITE", title: "New split invite", body: "Tomas invited you to Weekend Trip", time: "1h ago", read: false },
    { id: id(), type: "REMINDER", title: "Reminder sent", body: "You nudged Jess about Dinner at Ocean", time: "3h ago", read: true }
  ],
  draft: {},
  setDraft: (d) => set((s) => ({ draft: { ...s.draft, ...d } })),
  resetDraft: () => set({ draft: {} }),
  createCollection: () => {
    const d = get().draft;
    const ids = d.participantIds ?? [];
    const contacts = get().contacts.filter((c2) => ids.includes(c2.id));
    const total = d.totalAmount ?? 0;
    const splitType = d.splitType ?? "EQUAL";
    const share = contacts.length > 0 ? Math.round(total / contacts.length) : 0;
    const c = {
      id: id(),
      billName: d.billName ?? "New Split",
      merchantName: d.merchantName ?? "Merchant",
      description: d.description,
      totalAmount: total,
      collectedAmount: 0,
      currency: d.currency ?? "MZN",
      status: "ACTIVE",
      splitType,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      participants: contacts.map((p) => ({
        ...p,
        shareAmount: share,
        status: "PENDING"
      }))
    };
    set((s) => ({
      collections: [c, ...s.collections],
      draft: {},
      notifications: [
        {
          id: id(),
          type: "INVITE",
          title: "Invites sent",
          body: `${contacts.length} people invited to ${c.billName}`,
          time: "now",
          read: false
        },
        ...s.notifications
      ]
    }));
    return c.id;
  },
  payShare: (cid, pid) => set((s) => ({
    collections: s.collections.map((c) => {
      if (c.id !== cid) return c;
      const updated = c.participants.map(
        (p) => p.id === pid ? { ...p, status: "PAID", paidAt: (/* @__PURE__ */ new Date()).toISOString(), reference: ref() } : p
      );
      const collected = updated.filter((p) => p.status === "PAID").reduce((a, p) => a + p.shareAmount, 0);
      const isComplete = collected >= c.totalAmount;
      return {
        ...c,
        participants: updated,
        collectedAmount: collected,
        status: isComplete ? "COMPLETE" : c.status
      };
    }),
    notifications: [
      {
        id: id(),
        type: "PAID",
        title: "Payment received",
        body: "A participant just paid their share",
        time: "now",
        read: false
      },
      ...s.notifications
    ]
  })),
  declineShare: (cid, pid) => set((s) => ({
    collections: s.collections.map(
      (c) => c.id !== cid ? c : {
        ...c,
        participants: c.participants.map(
          (p) => p.id === pid ? { ...p, status: "DECLINED" } : p
        )
      }
    )
  })),
  remindParticipant: (cid, pid) => set((s) => ({
    notifications: [
      {
        id: id(),
        type: "REMINDER",
        title: "Reminder sent",
        body: `Nudge sent to ${s.collections.find((c) => c.id === cid)?.participants.find((p) => p.id === pid)?.name ?? "participant"}`,
        time: "now",
        read: false
      },
      ...s.notifications
    ]
  })),
  removeParticipant: (cid, pid) => set((s) => ({
    collections: s.collections.map((c) => {
      if (c.id !== cid) return c;
      const remaining = c.participants.filter((p) => p.id !== pid);
      const equalShare = remaining.length ? Math.round(c.totalAmount / remaining.length) : 0;
      return {
        ...c,
        participants: c.splitType === "EQUAL" ? remaining.map((p) => p.status === "PAID" ? p : { ...p, shareAmount: equalShare }) : remaining
      };
    })
  })),
  cancelCollection: (cid) => set((s) => ({
    collections: s.collections.map((c) => c.id === cid ? { ...c, status: "CANCELLED" } : c)
  })),
  settleMerchant: (cid, till) => set((s) => ({
    collections: s.collections.map(
      (c) => c.id !== cid ? c : { ...c, status: "SETTLED", merchantTill: till, reference: ref() }
    ),
    notifications: [
      {
        id: id(),
        type: "MERCHANT",
        title: "Merchant paid",
        body: `${s.collections.find((c) => c.id === cid)?.merchantName} settled`,
        time: "now",
        read: false
      },
      ...s.notifications
    ]
  })),
  addGroup: (g) => set((s) => ({ groups: [{ ...g, id: id() }, ...s.groups] })),
  removeGroup: (gid) => set((s) => ({ groups: s.groups.filter((g) => g.id !== gid) })),
  markNotificationsRead: () => set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) }))
}));
const fmt = (n, currency = "MZN") => `${currency} ${n.toLocaleString("en-US")}`;
const tabs = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/groups", label: "Groups", icon: Users, exact: false },
  { to: "/notifications", label: "Alerts", icon: Bell, exact: false },
  { to: "/profile", label: "Me", icon: User, exact: false }
];
function MobileShell({ children, hideNav, hideFab }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const unread = useApp((s) => s.notifications.filter((n) => !n.read).length);
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen w-full bg-app-bg flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full max-w-md min-h-screen bg-background shadow-xl flex flex-col", children: [
    /* @__PURE__ */ jsx("main", { className: cn("flex-1 flex flex-col", !hideNav && "pb-24"), children }),
    !hideNav && /* @__PURE__ */ jsxs(Fragment, { children: [
      !hideFab && /* @__PURE__ */ jsx(
        Link,
        {
          to: "/create",
          "aria-label": "Create split bill",
          className: "absolute bottom-20 right-4 z-20 size-14 rounded-full brand-gradient text-brand-foreground shadow-lg shadow-brand/30 flex items-center justify-center active:scale-95 transition",
          children: /* @__PURE__ */ jsx(Plus, { className: "size-6", strokeWidth: 2.5 })
        }
      ),
      /* @__PURE__ */ jsxs("nav", { className: "fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur border-t border-border z-10", children: [
        /* @__PURE__ */ jsx("ul", { className: "grid grid-cols-4", children: tabs.map((t) => {
          const active = t.exact ? pathname === t.to : pathname.startsWith(t.to);
          const Icon = t.icon;
          return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: t.to,
              className: cn(
                "flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition relative",
                active ? "text-brand" : "text-muted-foreground"
              ),
              children: [
                /* @__PURE__ */ jsxs("span", { className: "relative", children: [
                  /* @__PURE__ */ jsx(Icon, { className: "size-5", strokeWidth: active ? 2.5 : 2 }),
                  t.to === "/notifications" && unread > 0 && /* @__PURE__ */ jsx("span", { className: "absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-brand text-brand-foreground text-[9px] font-bold flex items-center justify-center", children: unread })
                ] }),
                t.label
              ]
            }
          ) }, t.to);
        }) }),
        /* @__PURE__ */ jsx("div", { className: "h-[env(safe-area-inset-bottom)]" })
      ] })
    ] })
  ] }) });
}
function ScreenHeader({
  title,
  subtitle,
  back,
  right,
  variant = "default"
}) {
  return /* @__PURE__ */ jsxs(
    "header",
    {
      className: cn(
        "px-5 pt-6 pb-5 flex items-start gap-3",
        variant === "brand" && "brand-gradient text-brand-foreground rounded-b-3xl"
      ),
      children: [
        back && /* @__PURE__ */ jsx(
          BackButton,
          {
            to: typeof back === "string" ? back : void 0,
            tone: variant === "brand" ? "light" : "dark"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold tracking-tight truncate", children: title }),
          subtitle && /* @__PURE__ */ jsx("p", { className: cn("text-sm mt-0.5", variant === "brand" ? "text-white/80" : "text-muted-foreground"), children: subtitle })
        ] }),
        right
      ]
    }
  );
}
function BackButton({ to, tone }) {
  const cls = cn(
    "size-9 rounded-full flex items-center justify-center -ml-1 shrink-0",
    tone === "light" ? "bg-white/15 text-white" : "bg-muted text-foreground"
  );
  const inner = /* @__PURE__ */ jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M15 18l-6-6 6-6" }) });
  if (to) {
    return /* @__PURE__ */ jsx(Link, { to, className: cls, "aria-label": "Back", children: inner });
  }
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: () => window.history.back(),
      className: cls,
      "aria-label": "Back",
      children: inner
    }
  );
}
function Avatar({ initials, color, size = 40 }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "rounded-full flex items-center justify-center text-white font-semibold shrink-0",
      style: { background: color, width: size, height: size, fontSize: size * 0.38 },
      children: initials
    }
  );
}
export {
  Avatar as A,
  MobileShell as M,
  ScreenHeader as S,
  fmt as f,
  useApp as u
};
