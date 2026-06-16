import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import { u as useApp, M as MobileShell, S as ScreenHeader, A as Avatar } from "./MobileShell-DoUlqP7U.js";
import { B as Button } from "./button-BCyqxdKk.js";
import { I as Input } from "./input-D2i-ziMx.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { c as cn } from "./router-sXKhbtw5.js";
import "zustand";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxs(
    DialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxs(DialogPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
const DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", { className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className), ...props });
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
DialogFooter.displayName = "DialogFooter";
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold leading-none tracking-tight", className),
    ...props
  }
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
const emojis = ["👨‍👩‍👧", "👯", "💼", "🏖️", "🎉", "🍔", "🚗", "💰"];
function GroupsPage() {
  const {
    groups,
    contacts,
    addGroup,
    removeGroup
  } = useApp();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("👯");
  const [members, setMembers] = useState([]);
  const reset = () => {
    setName("");
    setEmoji("👯");
    setMembers([]);
  };
  return /* @__PURE__ */ jsxs(MobileShell, { children: [
    /* @__PURE__ */ jsx(ScreenHeader, { title: "Saved groups", subtitle: "Reuse for faster splits", right: /* @__PURE__ */ jsxs(Dialog, { open, onOpenChange: (o) => {
      setOpen(o);
      if (!o) reset();
    }, children: [
      /* @__PURE__ */ jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx("button", { className: "size-9 rounded-full bg-brand text-brand-foreground flex items-center justify-center", children: /* @__PURE__ */ jsx(Plus, { className: "size-5" }) }) }),
      /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-sm", children: [
        /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "New group" }) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsx(Input, { placeholder: "Group name", value: name, onChange: (e) => setName(e.target.value) }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: emojis.map((e) => /* @__PURE__ */ jsx("button", { onClick: () => setEmoji(e), className: "size-10 rounded-xl text-xl flex items-center justify-center " + (emoji === e ? "bg-brand/10 ring-2 ring-brand" : "bg-muted"), children: e }, e)) }),
          /* @__PURE__ */ jsx("div", { className: "max-h-64 overflow-y-auto -mx-1 px-1", children: contacts.map((c) => {
            const on = members.includes(c.id);
            return /* @__PURE__ */ jsxs("button", { onClick: () => setMembers((m) => on ? m.filter((x) => x !== c.id) : [...m, c.id]), className: "w-full flex items-center gap-3 p-2 rounded-lg " + (on ? "bg-brand/5" : ""), children: [
              /* @__PURE__ */ jsx(Avatar, { initials: c.initials, color: c.color, size: 32 }),
              /* @__PURE__ */ jsx("span", { className: "text-sm flex-1 text-left", children: c.name }),
              /* @__PURE__ */ jsx("div", { className: "size-5 rounded-full border-2 " + (on ? "bg-brand border-brand" : "border-border") })
            ] }, c.id);
          }) })
        ] }),
        /* @__PURE__ */ jsx(DialogFooter, { children: /* @__PURE__ */ jsx(Button, { className: "w-full bg-brand text-brand-foreground hover:bg-brand/90", disabled: !name || members.length === 0, onClick: () => {
          addGroup({
            name,
            emoji,
            members: contacts.filter((c) => members.includes(c.id))
          });
          setOpen(false);
          reset();
        }, children: "Save group" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 space-y-3", children: [
      groups.map((g) => /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("div", { className: "size-12 rounded-xl bg-muted text-2xl flex items-center justify-center", children: g.emoji }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "font-semibold truncate", children: g.name }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
              g.members.length,
              " members"
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => removeGroup(g.id), className: "size-8 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground", children: /* @__PURE__ */ jsx(Trash2, { className: "size-4" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex -space-x-2", children: g.members.slice(0, 5).map((m) => /* @__PURE__ */ jsx("div", { className: "ring-2 ring-card rounded-full", children: /* @__PURE__ */ jsx(Avatar, { initials: m.initials, color: m.color, size: 28 }) }, m.id)) }),
          /* @__PURE__ */ jsx(Link, { to: "/create", onClick: () => useApp.getState().setDraft({
            participantIds: g.members.map((m) => m.id)
          }), className: "ml-auto text-xs font-semibold text-brand", children: "Use group →" })
        ] })
      ] }, g.id)),
      groups.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-muted-foreground py-12", children: "No saved groups yet." })
    ] })
  ] });
}
export {
  GroupsPage as component
};
