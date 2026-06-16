import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Bell, Send, Store, CheckCircle2, AlertTriangle, Mail } from "lucide-react";
import { u as useApp, M as MobileShell, S as ScreenHeader } from "./MobileShell-DoUlqP7U.js";
import "@tanstack/react-router";
import "zustand";
import "./router-sXKhbtw5.js";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-label";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const iconFor = (t) => {
  const map = {
    PAID: {
      i: CheckCircle2,
      cls: "bg-success/15 text-success"
    },
    INVITE: {
      i: Mail,
      cls: "bg-brand/10 text-brand"
    },
    FAILED: {
      i: AlertTriangle,
      cls: "bg-destructive/15 text-destructive"
    },
    COMPLETE: {
      i: CheckCircle2,
      cls: "bg-success/15 text-success"
    },
    MERCHANT: {
      i: Store,
      cls: "bg-success/15 text-success"
    },
    REMINDER: {
      i: Send,
      cls: "bg-warning/15 text-warning-foreground"
    }
  };
  return map[t];
};
function NotificationsPage() {
  const {
    notifications,
    markNotificationsRead
  } = useApp();
  useEffect(() => {
    const t = setTimeout(markNotificationsRead, 800);
    return () => clearTimeout(t);
  }, [markNotificationsRead]);
  return /* @__PURE__ */ jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsx(ScreenHeader, { title: "Notifications", subtitle: `${notifications.length} updates` }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 space-y-2", children: [
      notifications.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center py-16 text-muted-foreground", children: [
        /* @__PURE__ */ jsx(Bell, { className: "size-10 mx-auto opacity-30" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm", children: "You're all caught up" })
      ] }),
      notifications.map((n) => {
        const {
          i: Icon,
          cls
        } = iconFor(n.type);
        return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-3.5 rounded-2xl border " + (!n.read ? "bg-brand/[0.03] border-brand/15" : "bg-card border-border"), children: [
          /* @__PURE__ */ jsx("div", { className: "size-10 rounded-xl flex items-center justify-center shrink-0 " + cls, children: /* @__PURE__ */ jsx(Icon, { className: "size-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm truncate", children: n.title }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-muted-foreground shrink-0", children: n.time })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: n.body })
          ] }),
          !n.read && /* @__PURE__ */ jsx("span", { className: "size-2 rounded-full bg-brand mt-2" })
        ] }, n.id);
      })
    ] })
  ] });
}
export {
  NotificationsPage as component
};
