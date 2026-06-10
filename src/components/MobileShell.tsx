import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Home, Users, Bell, User, Plus, Receipt, Store, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  /** Hide the bottom tab bar (e.g. inside payment flows) */
  hideNav?: boolean;
  /** Hide the floating create button */
  hideFab?: boolean;
}

const tabs = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/groups", label: "Groups", icon: Users, exact: false },
  { to: "/notifications", label: "Alerts", icon: Bell, exact: false },
  { to: "/profile", label: "Me", icon: User, exact: false },
] as const;

export function MobileShell({ children, hideNav, hideFab }: Props) {
  const pathname = useRouterState((s) => s.location.pathname);
  const unread = useApp((s) => s.notifications.filter((n) => !n.read).length);
  const setDraft = useApp((s) => s.setDraft);
  const resetDraft = useApp((s) => s.resetDraft);
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);

  const pick = (journey: "PAYBILL" | "BUY_GOODS") => {
    resetDraft();
    setDraft({ journey });
    setPickerOpen(false);
    navigate({ to: "/create" });
  };

  return (
    <div className="min-h-screen w-full bg-app-bg flex justify-center">
      <div className="relative w-full max-w-md min-h-screen bg-background shadow-xl flex flex-col">
        <main className={cn("flex-1 flex flex-col", !hideNav && "pb-24")}>{children}</main>

        {!hideNav && (
          <>
            {!hideFab && (
              <button
                type="button"
                onClick={() => setPickerOpen(true)}
                aria-label="Create split bill"
                className="absolute bottom-20 right-4 z-20 size-14 rounded-full brand-gradient text-brand-foreground shadow-lg shadow-brand/30 flex items-center justify-center active:scale-95 transition"
              >
                <Plus className="size-6" strokeWidth={2.5} />
              </button>
            )}
            <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-card/95 backdrop-blur border-t border-border z-10">
              <ul className="grid grid-cols-4">
                {tabs.map((t) => {
                  const active = t.exact
                    ? pathname === t.to
                    : pathname.startsWith(t.to);
                  const Icon = t.icon;
                  return (
                    <li key={t.to}>
                      <Link
                        to={t.to}
                        className={cn(
                          "flex flex-col items-center gap-1 py-3 text-[11px] font-medium transition relative",
                          active ? "text-brand" : "text-muted-foreground",
                        )}
                      >
                        <span className="relative">
                          <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                          {t.to === "/notifications" && unread > 0 && (
                            <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-brand text-brand-foreground text-[9px] font-bold flex items-center justify-center">
                              {unread}
                            </span>
                          )}
                        </span>
                        {t.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="h-[env(safe-area-inset-bottom)]" />
            </nav>
          </>
        )}
      </div>
    </div>
  );
}

export function ScreenHeader({
  title,
  subtitle,
  back,
  right,
  variant = "default",
}: {
  title: string;
  subtitle?: string;
  back?: string | true;
  right?: ReactNode;
  variant?: "default" | "brand";
}) {
  return (
    <header
      className={cn(
        "px-5 pt-6 pb-5 flex items-start gap-3",
        variant === "brand" && "brand-gradient text-brand-foreground rounded-b-3xl",
      )}
    >
      {back && (
        <BackButton
          to={typeof back === "string" ? back : undefined}
          tone={variant === "brand" ? "light" : "dark"}
        />
      )}
      <div className="flex-1 min-w-0">
        <h1 className="text-xl font-bold tracking-tight truncate">{title}</h1>
        {subtitle && (
          <p className={cn("text-sm mt-0.5", variant === "brand" ? "text-white/80" : "text-muted-foreground")}>
            {subtitle}
          </p>
        )}
      </div>
      {right}
    </header>
  );
}

function BackButton({ to, tone }: { to?: string; tone: "light" | "dark" }) {
  const cls = cn(
    "size-9 rounded-full flex items-center justify-center -ml-1 shrink-0",
    tone === "light" ? "bg-white/15 text-white" : "bg-muted text-foreground",
  );
  const inner = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
  if (to) {
    return (
      <Link to={to} className={cls} aria-label="Back">
        {inner}
      </Link>
    );
  }
  return (
    <button
      onClick={() => window.history.back()}
      className={cls}
      aria-label="Back"
    >
      {inner}
    </button>
  );
}

export function Avatar({ initials, color, size = 40 }: { initials: string; color: string; size?: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
      style={{ background: color, width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}
