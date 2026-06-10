import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Bell, CheckCircle2, Mail, Store, AlertTriangle, Send } from "lucide-react";
import { MobileShell, ScreenHeader } from "@/components/MobileShell";
import { useApp, type AppNotification } from "@/lib/store";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifications — Pagamos" }] }),
  component: NotificationsPage,
});

const iconFor = (t: AppNotification["type"]) => {
  const map = {
    PAID: { i: CheckCircle2, cls: "bg-success/15 text-success" },
    INVITE: { i: Mail, cls: "bg-brand/10 text-brand" },
    FAILED: { i: AlertTriangle, cls: "bg-destructive/15 text-destructive" },
    COMPLETE: { i: CheckCircle2, cls: "bg-success/15 text-success" },
    MERCHANT: { i: Store, cls: "bg-success/15 text-success" },
    REMINDER: { i: Send, cls: "bg-warning/15 text-warning-foreground" },
  } as const;
  return map[t];
};

function NotificationsPage() {
  const { notifications, markNotificationsRead } = useApp();
  useEffect(() => {
    const t = setTimeout(markNotificationsRead, 800);
    return () => clearTimeout(t);
  }, [markNotificationsRead]);

  return (
    <MobileShell>
      <ScreenHeader title="Notifications" subtitle={`${notifications.length} updates`} />
      <div className="px-5 space-y-2">
        {notifications.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Bell className="size-10 mx-auto opacity-30" />
            <p className="mt-3 text-sm">You're all caught up</p>
          </div>
        )}
        {notifications.map((n) => {
          const { i: Icon, cls } = iconFor(n.type);
          return (
            <div
              key={n.id}
              className={"flex items-start gap-3 p-3.5 rounded-2xl border " + (!n.read ? "bg-brand/[0.03] border-brand/15" : "bg-card border-border")}
            >
              <div className={"size-10 rounded-xl flex items-center justify-center shrink-0 " + cls}>
                <Icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold text-sm truncate">{n.title}</p>
                  <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
              </div>
              {!n.read && <span className="size-2 rounded-full bg-brand mt-2" />}
            </div>
          );
        })}
      </div>
    </MobileShell>
  );
}
