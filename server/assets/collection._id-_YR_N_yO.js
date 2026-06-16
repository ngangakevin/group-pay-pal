import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Navigate, Link } from "@tanstack/react-router";
import * as React from "react";
import { useEffect } from "react";
import { ChevronRight, Check, Circle, MoreVertical, XCircle, CheckCircle2, Bell, Send, UserMinus, X, Clock } from "lucide-react";
import { u as useApp, M as MobileShell, S as ScreenHeader, f as fmt, A as Avatar } from "./MobileShell-DoUlqP7U.js";
import { B as Button } from "./button-BCyqxdKk.js";
import { P as Progress } from "./progress-DS4W4PFF.js";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { c as cn, a as Route } from "./router-sXKhbtw5.js";
import { toast } from "sonner";
import "zustand";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-progress";
import "@tanstack/react-query";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
function CollectionPage() {
  const {
    id
  } = Route.useParams();
  const navigate = useNavigate();
  const c = useApp((s) => s.collections.find((x) => x.id === id));
  const {
    remindParticipant,
    removeParticipant,
    cancelCollection,
    payShare
  } = useApp();
  useEffect(() => {
    if (!c || c.status !== "ACTIVE") return;
    const t = setInterval(() => {
      const fresh = useApp.getState().collections.find((x) => x.id === id);
      const pending2 = fresh?.participants.find((p) => p.status === "PENDING");
      if (pending2) payShare(id, pending2.id);
    }, 8e3);
    return () => clearInterval(t);
  }, [id, c?.status, payShare, c]);
  if (!c) return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  const pct = c.totalAmount ? Math.min(100, c.collectedAmount / c.totalAmount * 100) : 0;
  const remaining = Math.max(0, c.totalAmount - c.collectedAmount);
  const paid = c.participants.filter((p) => p.status === "PAID");
  const pending = c.participants.filter((p) => p.status === "PENDING");
  const declined = c.participants.filter((p) => p.status === "DECLINED");
  const isComplete = c.status === "COMPLETE" || c.collectedAmount >= c.totalAmount;
  const isSettled = c.status === "SETTLED";
  return /* @__PURE__ */ jsxs(MobileShell, { hideNav: true, hideFab: true, children: [
    /* @__PURE__ */ jsx(ScreenHeader, { title: c.billName, subtitle: c.merchantName, back: "/", variant: "brand", right: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsx(DropdownMenuTrigger, { className: "size-9 rounded-full bg-white/15 text-white flex items-center justify-center", children: /* @__PURE__ */ jsx(MoreVertical, { className: "size-4" }) }),
      /* @__PURE__ */ jsx(DropdownMenuContent, { align: "end", children: /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => {
        cancelCollection(id);
        toast("Collection cancelled");
      }, children: [
        /* @__PURE__ */ jsx(XCircle, { className: "mr-2 size-4" }),
        " Cancel collection"
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 -mt-3 relative z-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 shadow-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-end justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Collected" }),
            /* @__PURE__ */ jsx("p", { className: "text-3xl font-bold text-brand mt-0.5", children: fmt(c.collectedAmount, c.currency) })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
            "of ",
            fmt(c.totalAmount, c.currency)
          ] })
        ] }),
        /* @__PURE__ */ jsx(Progress, { value: pct, className: "h-2.5 mt-3 bg-muted [&>div]:bg-brand" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mt-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            Math.round(pct),
            "% complete"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            fmt(remaining, c.currency),
            " remaining"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 mt-4 text-center", children: [
          /* @__PURE__ */ jsx(Pill, { count: paid.length, label: "Paid", tone: "success" }),
          /* @__PURE__ */ jsx(Pill, { count: pending.length, label: "Pending", tone: "warning" }),
          /* @__PURE__ */ jsx(Pill, { count: declined.length, label: "Declined", tone: "muted" })
        ] })
      ] }),
      isComplete && !isSettled && /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-success/10 border border-success/20 rounded-2xl p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "size-6 text-success shrink-0" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: "Collection complete!" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Ready to pay ",
            c.merchantName
          ] })
        ] }),
        /* @__PURE__ */ jsx(Button, { size: "sm", className: "bg-success text-success-foreground hover:bg-success/90", onClick: () => navigate({
          to: "/settle/$id",
          params: {
            id
          }
        }), children: "Pay merchant" })
      ] }),
      isSettled && /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-success/10 border border-success/20 rounded-2xl p-4 text-center", children: [
        /* @__PURE__ */ jsx(CheckCircle2, { className: "size-7 text-success mx-auto" }),
        /* @__PURE__ */ jsx("p", { className: "font-semibold mt-1", children: "Merchant settled" }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Ref: ",
          c.reference
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 mt-6 flex-1", children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2", children: [
        "Participants (",
        c.participants.length,
        ")"
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden", children: c.participants.map((p) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3.5", children: [
        /* @__PURE__ */ jsx(Avatar, { initials: p.initials, color: p.color }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "font-medium truncate", children: p.name }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs", children: [
            /* @__PURE__ */ jsx(StatusBadge, { status: p.status }),
            /* @__PURE__ */ jsx("span", { className: "text-muted-foreground", children: fmt(p.shareAmount, c.currency) })
          ] })
        ] }),
        p.status === "PENDING" && !isSettled && /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { className: "size-8 rounded-full hover:bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsx(MoreVertical, { className: "size-4 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
            /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => {
              remindParticipant(id, p.id);
              toast(`Reminder sent to ${p.name}`);
            }, children: [
              /* @__PURE__ */ jsx(Bell, { className: "mr-2 size-4" }),
              " Send reminder"
            ] }),
            /* @__PURE__ */ jsx(Link, { to: "/pay/$id/$pid", params: {
              id,
              pid: p.id
            }, children: /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
              /* @__PURE__ */ jsx(Send, { className: "mr-2 size-4" }),
              " Pay as participant"
            ] }) }),
            /* @__PURE__ */ jsxs(DropdownMenuItem, { onClick: () => removeParticipant(id, p.id), children: [
              /* @__PURE__ */ jsx(UserMinus, { className: "mr-2 size-4" }),
              " Remove"
            ] })
          ] })
        ] }),
        p.status === "PAID" && /* @__PURE__ */ jsx(CheckCircle2, { className: "size-5 text-success" }),
        p.status === "DECLINED" && /* @__PURE__ */ jsx(X, { className: "size-5 text-muted-foreground" })
      ] }, p.id)) }),
      c.status === "ACTIVE" && /* @__PURE__ */ jsxs("p", { className: "text-xs text-center text-muted-foreground mt-4", children: [
        /* @__PURE__ */ jsx("span", { className: "inline-block size-1.5 rounded-full bg-success animate-pulse mr-1.5 align-middle" }),
        "Live updates · refreshes automatically"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-6" })
  ] });
}
function Pill({
  count,
  label,
  tone
}) {
  const cls = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    muted: "bg-muted text-muted-foreground"
  }[tone];
  return /* @__PURE__ */ jsxs("div", { className: `rounded-xl py-2 ${cls}`, children: [
    /* @__PURE__ */ jsx("p", { className: "font-bold text-lg leading-none", children: count }),
    /* @__PURE__ */ jsx("p", { className: "text-[10px] uppercase tracking-wide mt-0.5", children: label })
  ] });
}
function StatusBadge({
  status
}) {
  const map = {
    PAID: {
      cls: "bg-success/15 text-success",
      icon: /* @__PURE__ */ jsx(CheckCircle2, { className: "size-3" }),
      label: "Paid"
    },
    PENDING: {
      cls: "bg-warning/15 text-warning-foreground",
      icon: /* @__PURE__ */ jsx(Clock, { className: "size-3" }),
      label: "Pending"
    },
    DECLINED: {
      cls: "bg-muted text-muted-foreground",
      icon: /* @__PURE__ */ jsx(X, { className: "size-3" }),
      label: "Declined"
    },
    INVITED: {
      cls: "bg-brand/10 text-brand",
      icon: /* @__PURE__ */ jsx(Send, { className: "size-3" }),
      label: "Invited"
    }
  }[status];
  return /* @__PURE__ */ jsxs("span", { className: `inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${map.cls}`, children: [
    map.icon,
    " ",
    map.label
  ] });
}
export {
  CollectionPage as component
};
