import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shield, Delete } from "lucide-react";
import { u as useApp, M as MobileShell, S as ScreenHeader, A as Avatar, f as fmt } from "./MobileShell-DoUlqP7U.js";
import { B as Button } from "./button-BCyqxdKk.js";
import { d as Route } from "./router-sXKhbtw5.js";
import "zustand";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@tanstack/react-query";
import "sonner";
import "@radix-ui/react-label";
import "clsx";
import "tailwind-merge";
function PayPage() {
  const {
    id,
    pid
  } = Route.useParams();
  const navigate = useNavigate();
  const c = useApp((s) => s.collections.find((x) => x.id === id));
  const {
    payShare,
    declineShare
  } = useApp();
  const [pin, setPin] = useState("");
  const [step, setStep] = useState("review");
  if (!c) return /* @__PURE__ */ jsx(Navigate, { to: "/" });
  const p = c.participants.find((x) => x.id === pid);
  if (!p) return /* @__PURE__ */ jsx(Navigate, { to: "/collection/$id", params: {
    id
  } });
  const press = (k) => {
    if (k === "del") setPin((s) => s.slice(0, -1));
    else if (pin.length < 4) setPin((s) => s + k);
  };
  const confirm = () => {
    setStep("processing");
    setTimeout(() => {
      payShare(id, pid);
      navigate({
        to: "/success/$id/$pid",
        params: {
          id,
          pid
        }
      });
    }, 1200);
  };
  return /* @__PURE__ */ jsxs(MobileShell, { hideNav: true, hideFab: true, children: [
    step === "review" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ScreenHeader, { title: "Payment request", back: `/collection/${id}`, variant: "brand" }),
      /* @__PURE__ */ jsxs("div", { className: "px-5 pt-2 flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 mt-2", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: c.merchantName }),
          /* @__PURE__ */ jsx("p", { className: "font-semibold text-lg mt-0.5", children: c.billName }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mt-4", children: [
            /* @__PURE__ */ jsx(Avatar, { initials: p.initials, color: p.color }),
            /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsx("p", { className: "font-medium", children: p.name }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: p.phone })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 bg-gradient-to-br from-brand/10 to-brand/5 border border-brand/20 rounded-2xl p-5 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-wider text-muted-foreground", children: "Your share" }),
          /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold text-brand mt-1", children: fmt(p.shareAmount, c.currency) }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
            "of ",
            fmt(c.totalAmount, c.currency),
            " total · ",
            c.participants.length,
            " contributors"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-center gap-2 text-xs text-muted-foreground mt-4", children: [
          /* @__PURE__ */ jsx(Shield, { className: "size-4 text-success" }),
          " Secured by M-Pesa"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto pt-4 space-y-2", children: [
          /* @__PURE__ */ jsxs(Button, { className: "w-full h-12 bg-brand text-brand-foreground hover:bg-brand/90", onClick: () => setStep("pin"), children: [
            "Pay ",
            fmt(p.shareAmount, c.currency)
          ] }),
          /* @__PURE__ */ jsx(Button, { variant: "ghost", className: "w-full h-12 text-muted-foreground", onClick: () => {
            declineShare(id, pid);
            navigate({
              to: "/collection/$id",
              params: {
                id
              }
            });
          }, children: "Decline" })
        ] })
      ] })
    ] }),
    step === "pin" && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(ScreenHeader, { title: "Enter M-Pesa PIN", subtitle: `Paying ${fmt(p.shareAmount, c.currency)}`, back: true, variant: "brand" }),
      /* @__PURE__ */ jsxs("div", { className: "px-5 pt-6 flex-1 flex flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "flex justify-center gap-3 mt-4", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "size-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold " + (pin.length > i ? "border-brand bg-brand/5 text-brand" : "border-border"), children: pin.length > i ? "•" : "" }, i)) }),
        /* @__PURE__ */ jsx("button", { className: "text-brand text-sm font-medium mt-4 mx-auto", children: "Forgot PIN?" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-auto", children: [
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 select-none", children: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "del"].map((k, i) => k === "" ? /* @__PURE__ */ jsx("div", {}, i) : /* @__PURE__ */ jsx("button", { onClick: () => press(k), className: "h-14 rounded-2xl bg-muted active:bg-brand/10 text-xl font-semibold flex items-center justify-center", children: k === "del" ? /* @__PURE__ */ jsx(Delete, { className: "size-5" }) : k }, i)) }),
          /* @__PURE__ */ jsx(Button, { className: "w-full h-12 mt-4 bg-brand text-brand-foreground hover:bg-brand/90", disabled: pin.length !== 4, onClick: confirm, children: "Confirm payment" })
        ] })
      ] })
    ] }),
    step === "processing" && /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-center px-8 text-center", children: [
      /* @__PURE__ */ jsx("div", { className: "size-16 rounded-full border-4 border-brand/20 border-t-brand animate-spin" }),
      /* @__PURE__ */ jsx("p", { className: "mt-6 font-semibold", children: "Processing payment…" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Don't close this screen" })
    ] })
  ] });
}
export {
  PayPage as component
};
