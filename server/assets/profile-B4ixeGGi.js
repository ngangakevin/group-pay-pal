import { jsx, jsxs } from "react/jsx-runtime";
import { CreditCard, Smartphone, Shield, Moon, HelpCircle, LogOut, ChevronRight } from "lucide-react";
import { u as useApp, M as MobileShell, S as ScreenHeader, A as Avatar, f as fmt } from "./MobileShell-DoUlqP7U.js";
import * as React from "react";
import { useState, useEffect } from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { c as cn } from "./router-sXKhbtw5.js";
import "@tanstack/react-router";
import "zustand";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-label";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
const Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SwitchPrimitives.Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsx(
      SwitchPrimitives.Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = SwitchPrimitives.Root.displayName;
function ProfilePage() {
  const {
    me,
    collections
  } = useApp();
  const total = collections.reduce((a, c) => a + c.collectedAmount, 0);
  const splits = collections.length;
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  return /* @__PURE__ */ jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsx(ScreenHeader, { title: "My profile" }),
    /* @__PURE__ */ jsxs("div", { className: "px-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "brand-gradient text-brand-foreground rounded-2xl p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(Avatar, { initials: me.initials, color: "rgba(255,255,255,0.25)", size: 56 }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg", children: me.name }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-white/80", children: me.phone })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 mt-4", children: [
        /* @__PURE__ */ jsx(Stat, { label: "Splits created", value: String(splits) }),
        /* @__PURE__ */ jsx(Stat, { label: "Total flow", value: fmt(total) })
      ] }),
      /* @__PURE__ */ jsxs(Section, { title: "Account", children: [
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(CreditCard, { className: "size-4" }), label: "Payment methods" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(Smartphone, { className: "size-4" }), label: "Linked M-Pesa number", hint: "+258 84 ••• 5566" }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(Shield, { className: "size-4" }), label: "Security & PIN" })
      ] }),
      /* @__PURE__ */ jsxs(Section, { title: "Preferences", children: [
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(Moon, { className: "size-4" }), label: "Dark mode", right: /* @__PURE__ */ jsx(Switch, { checked: dark, onCheckedChange: setDark }) }),
        /* @__PURE__ */ jsx(Row, { icon: /* @__PURE__ */ jsx(HelpCircle, { className: "size-4" }), label: "Help & support" })
      ] }),
      /* @__PURE__ */ jsxs("button", { className: "w-full mt-4 p-4 rounded-2xl bg-card border border-border text-destructive font-semibold flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(LogOut, { className: "size-4" }),
        " Sign out"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-center text-[10px] text-muted-foreground mt-4", children: "Split Pay v1.0 · Powered by Vodacom M-Pesa" })
    ] })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
    /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsx("p", { className: "font-bold text-lg mt-0.5", children: value })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
    /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2 px-1", children: title }),
    /* @__PURE__ */ jsx("div", { className: "bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden", children })
  ] });
}
function Row({
  icon,
  label,
  hint,
  right
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "size-9 rounded-lg bg-muted text-foreground flex items-center justify-center", children: icon }),
    /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm font-medium", children: label }),
      hint && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: hint })
    ] }),
    right ?? /* @__PURE__ */ jsx(ChevronRight, { className: "size-4 text-muted-foreground" })
  ] });
}
export {
  ProfilePage as component
};
