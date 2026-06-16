import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouter, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useEffect } from "react";
import { Toaster as Toaster$1 } from "sonner";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const appCss = "/assets/styles-DHuUnENM.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$c = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Split Pay — Pay together, effortlessly" },
      { name: "description", content: "Split bills, collect contributions, and settle merchants from your phone with M-Pesa Group Pay." },
      { name: "theme-color", content: "#E60000" },
      { property: "og:title", content: "Split Pay" },
      { property: "og:description", content: "Pay together. Effortlessly. Securely." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$c.useRouteContext();
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(Outlet, {}),
    /* @__PURE__ */ jsx(Toaster, { position: "top-center", richColors: true })
  ] });
}
const $$splitComponentImporter$b = () => import("./split-type-veQAk-mS.js");
const Route$b = createFileRoute("/split-type")({
  head: () => ({
    meta: [{
      title: "Split Type — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./review-DzASlv6N.js");
const Route$a = createFileRoute("/review")({
  head: () => ({
    meta: [{
      title: "Review Split — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./profile-B4ixeGGi.js");
const Route$9 = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "Profile — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./participants-DgQufh7I.js");
const Route$8 = createFileRoute("/participants")({
  head: () => ({
    meta: [{
      title: "Add Participants — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./notifications-BMHzVZ4f.js");
const Route$7 = createFileRoute("/notifications")({
  head: () => ({
    meta: [{
      title: "Notifications — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./groups-iHtjGqth.js");
const Route$6 = createFileRoute("/groups")({
  head: () => ({
    meta: [{
      title: "Saved Groups — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
const $$splitComponentImporter$5 = () => import("./create-C78pk3sQ.js");
const Route$5 = createFileRoute("/create")({
  head: () => ({
    meta: [{
      title: "Create Split — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
function Stepper({
  step
}) {
  return /* @__PURE__ */ jsx("div", { className: "px-5 -mt-3 flex gap-1.5", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("div", { className: "h-1 flex-1 rounded-full " + (i <= step ? "bg-brand" : "bg-muted") }, i)) });
}
function FooterActions({
  children
}) {
  return /* @__PURE__ */ jsx("div", { className: "sticky bottom-0 bg-background/95 backdrop-blur border-t border-border px-5 py-4 flex gap-3", children });
}
const $$splitComponentImporter$4 = () => import("./index-z7nm9um3.js");
const Route$4 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Split Pay — Group payments made simple"
    }, {
      name: "description",
      content: "Split bills, collect contributions, and settle merchants from your phone."
    }, {
      property: "og:title",
      content: "Split Pay"
    }, {
      property: "og:description",
      content: "Pay together. Effortlessly. Securely."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./settle._id-SSIo4lQk.js");
const Route$3 = createFileRoute("/settle/$id")({
  head: () => ({
    meta: [{
      title: "Settle Merchant — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./collection._id-_YR_N_yO.js");
const Route$2 = createFileRoute("/collection/$id")({
  head: () => ({
    meta: [{
      title: "Live Collection — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./success._id._pid-H1mJ2SI2.js");
const Route$1 = createFileRoute("/success/$id/$pid")({
  head: () => ({
    meta: [{
      title: "Payment Successful — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./pay._id._pid-DURkm49h.js");
const Route = createFileRoute("/pay/$id/$pid")({
  head: () => ({
    meta: [{
      title: "Pay Share — Split Pay"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SplitTypeRoute = Route$b.update({
  id: "/split-type",
  path: "/split-type",
  getParentRoute: () => Route$c
});
const ReviewRoute = Route$a.update({
  id: "/review",
  path: "/review",
  getParentRoute: () => Route$c
});
const ProfileRoute = Route$9.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$c
});
const ParticipantsRoute = Route$8.update({
  id: "/participants",
  path: "/participants",
  getParentRoute: () => Route$c
});
const NotificationsRoute = Route$7.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => Route$c
});
const GroupsRoute = Route$6.update({
  id: "/groups",
  path: "/groups",
  getParentRoute: () => Route$c
});
const CreateRoute = Route$5.update({
  id: "/create",
  path: "/create",
  getParentRoute: () => Route$c
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$c
});
const SettleIdRoute = Route$3.update({
  id: "/settle/$id",
  path: "/settle/$id",
  getParentRoute: () => Route$c
});
const CollectionIdRoute = Route$2.update({
  id: "/collection/$id",
  path: "/collection/$id",
  getParentRoute: () => Route$c
});
const SuccessIdPidRoute = Route$1.update({
  id: "/success/$id/$pid",
  path: "/success/$id/$pid",
  getParentRoute: () => Route$c
});
const PayIdPidRoute = Route.update({
  id: "/pay/$id/$pid",
  path: "/pay/$id/$pid",
  getParentRoute: () => Route$c
});
const rootRouteChildren = {
  IndexRoute,
  CreateRoute,
  GroupsRoute,
  NotificationsRoute,
  ParticipantsRoute,
  ProfileRoute,
  ReviewRoute,
  SplitTypeRoute,
  CollectionIdRoute,
  SettleIdRoute,
  PayIdPidRoute,
  SuccessIdPidRoute
};
const routeTree = Route$c._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  FooterActions as F,
  Label as L,
  Route$3 as R,
  Stepper as S,
  Route$2 as a,
  Route$1 as b,
  cn as c,
  Route as d,
  router as r
};
