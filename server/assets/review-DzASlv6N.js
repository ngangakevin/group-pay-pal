import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Navigate } from "@tanstack/react-router";
import { Wallet, ShieldCheck } from "lucide-react";
import { u as useApp, M as MobileShell, S as ScreenHeader, f as fmt, A as Avatar } from "./MobileShell-DoUlqP7U.js";
import { B as Button } from "./button-BCyqxdKk.js";
import { S as Stepper, F as FooterActions } from "./router-sXKhbtw5.js";
import { toast } from "sonner";
import "zustand";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/react-query";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
function ReviewPage() {
  const navigate = useNavigate();
  const {
    draft,
    contacts,
    createCollection
  } = useApp();
  if (!draft.totalAmount || !draft.participantIds?.length) return /* @__PURE__ */ jsx(Navigate, { to: "/create" });
  const total = draft.totalAmount ?? 0;
  const currency = draft.currency ?? "MZN";
  const selected = contacts.filter((c) => draft.participantIds.includes(c.id));
  const share = Math.round(total / selected.length);
  const onStart = () => {
    const id = createCollection();
    toast.success("Collection started", {
      description: "Invitations sent to participants"
    });
    navigate({
      to: "/collection/$id",
      params: {
        id
      }
    });
  };
  return /* @__PURE__ */ jsxs(MobileShell, { hideNav: true, children: [
    /* @__PURE__ */ jsx(ScreenHeader, { title: "Review & confirm", subtitle: "Step 4 of 4 · Final check", back: "/participants", variant: "brand" }),
    /* @__PURE__ */ jsx(Stepper, { step: 4 }),
    /* @__PURE__ */ jsxs("div", { className: "px-5 pt-4 space-y-4 flex-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Merchant" }),
            /* @__PURE__ */ jsx("p", { className: "font-semibold", children: draft.merchantName })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: "Total bill" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-xl text-brand", children: fmt(total, currency) })
          ] })
        ] }),
        draft.description && /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-3 border-t border-border pt-3", children: draft.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gradient-to-br from-success/10 to-success/5 border border-success/20 rounded-2xl p-4 flex items-start gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "size-10 rounded-xl bg-success/15 text-success flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(Wallet, { className: "size-5" }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: "Escrow wallet ready" }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "Funds collected from ",
            selected.length,
            " participants will be held securely until you settle the merchant."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("p", { className: "text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2 px-1", children: [
          selected.length,
          " participants · ",
          fmt(share, currency),
          " each"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "bg-card border border-border rounded-2xl divide-y divide-border", children: selected.map((p) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 p-3.5", children: [
          /* @__PURE__ */ jsx(Avatar, { initials: p.initials, color: p.color }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "font-medium truncate", children: p.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground truncate", children: p.phone })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-sm", children: fmt(share, currency) })
        ] }, p.id)) })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 justify-center text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsx(ShieldCheck, { className: "size-4 text-success" }),
        "Powered by Vodacom M-Pesa · Funds held securely"
      ] })
    ] }),
    /* @__PURE__ */ jsxs(FooterActions, { children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-1 h-12", onClick: () => navigate({
        to: "/participants"
      }), children: "Edit" }),
      /* @__PURE__ */ jsx(Button, { className: "flex-[2] h-12 bg-brand text-brand-foreground hover:bg-brand/90", onClick: onStart, children: "Start collection" })
    ] })
  ] });
}
export {
  ReviewPage as component
};
