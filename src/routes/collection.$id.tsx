import { createFileRoute, Link, Navigate, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  Bell,
  MoreVertical,
  Send,
  Trash2,
  UserMinus,
  XCircle,
  CheckCircle2,
  Clock,
  X,
  Download,
} from "lucide-react";
import { MobileShell, ScreenHeader, Avatar } from "@/components/MobileShell";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApp, fmt, type ParticipantStatus } from "@/lib/store";
import { createReceiptPdf } from "@/lib/receipt";
import { toast } from "sonner";

export const Route = createFileRoute("/collection/$id")({
  head: () => ({ meta: [{ title: "Live Collection — Pagamos" }] }),
  component: CollectionPage,
});

function CollectionPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = useApp((s) => s.collections.find((x) => x.id === id));
  const { remindParticipant, removeParticipant, cancelCollection, payShare } = useApp();

  // Simulate real-time: every 8s mark a pending participant as paid
  useEffect(() => {
    if (!c || c.status !== "ACTIVE") return;
    const t = setInterval(() => {
      const fresh = useApp.getState().collections.find((x) => x.id === id);
      const pending = fresh?.participants.find((p) => p.status === "PENDING");
      if (pending) payShare(id, pending.id);
    }, 2000);
    return () => clearInterval(t);
  }, [id, c?.status, payShare, c]);

  if (!c) return <Navigate to="/" />;

  const pct = c.totalAmount ? Math.min(100, (c.collectedAmount / c.totalAmount) * 100) : 0;
  const remaining = Math.max(0, c.totalAmount - c.collectedAmount);
  const paid = c.participants.filter((p) => p.status === "PAID");
  const pending = c.participants.filter((p) => p.status === "PENDING");
  const declined = c.participants.filter((p) => p.status === "DECLINED");
  const isComplete = c.status === "COMPLETE" || c.collectedAmount >= c.totalAmount;
  const isSettled = c.status === "SETTLED";

  return (
    <MobileShell hideNav hideFab>
      <ScreenHeader
        title={c.billName}
        subtitle={c.merchantName}
        back="/"
        variant="brand"
        right={
          <DropdownMenu>
            <DropdownMenuTrigger className="size-9 rounded-full bg-white/15 text-white flex items-center justify-center">
              <MoreVertical className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => {
                  cancelCollection(id);
                  toast("Collection cancelled");
                }}
              >
                <XCircle className="mr-2 size-4" /> Cancel collection
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      <div className="px-5 -mt-3 relative z-10">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Collected</p>
              <p className="text-3xl font-bold text-brand mt-0.5">
                {fmt(c.collectedAmount, c.currency)}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">of {fmt(c.totalAmount, c.currency)}</p>
          </div>
          <Progress value={pct} className="h-2.5 mt-3 bg-muted [&>div]:bg-brand" />
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>{Math.round(pct)}% complete</span>
            <span>{fmt(remaining, c.currency)} remaining</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <Pill count={paid.length} label="Paid" tone="success" />
            <Pill count={pending.length} label="Pending" tone="warning" />
            <Pill count={declined.length} label="Declined" tone="muted" />
          </div>
        </div>

        {isComplete && !isSettled && (
          <div className="mt-4 bg-success/10 border border-success/20 rounded-2xl p-4 flex items-center gap-3">
            <CheckCircle2 className="size-6 text-success shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-sm">Collection complete!</p>
              <p className="text-xs text-muted-foreground">Ready to pay {c.merchantName}</p>
            </div>
            <Button
              size="sm"
              className="bg-success text-success-foreground hover:bg-success/90"
              onClick={() => navigate({ to: "/settle/$id", params: { id } })}
            >
              Pay merchant
            </Button>
          </div>
        )}

        {isSettled && (
          <div className="mt-4 bg-success/10 border border-success/20 rounded-2xl p-4 text-center">
            <CheckCircle2 className="size-7 text-success mx-auto" />
            <p className="font-semibold mt-1">Merchant settled</p>
            <p className="text-xs text-muted-foreground">Ref: {c.reference}</p>
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                className="inline-flex items-center gap-2"
                onClick={async () => {
                  const blob = await createReceiptPdf({
                    merchantName: c.merchantName,
                    till: c.merchantTill ?? c.merchantName,
                    amount: c.totalAmount,
                    currency: c.currency,
                    reference: c.reference,
                    contributors: c.participants.filter((p) => p.status === "PAID").length,
                    time: new Date().toLocaleString("en-GB", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    }),
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `pagamos-receipt-${c.id}.pdf`;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                  URL.revokeObjectURL(url);
                }}
              >
                <Download className="size-4" /> Download receipt
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="px-5 mt-6 flex-1">
        <h3 className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2">
          Participants ({c.participants.length})
        </h3>
        <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">
          {c.participants.map((p) => (
            <div key={p.id} className="flex items-center gap-3 p-3.5">
              <Avatar initials={p.initials} color={p.color} />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{p.name}</p>
                <div className="flex items-center gap-2 text-xs">
                  <StatusBadge status={p.status} />
                  <span className="text-muted-foreground">{fmt(p.shareAmount, c.currency)}</span>
                </div>
              </div>
              {p.status === "PENDING" && !isSettled && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="size-8 rounded-full hover:bg-muted flex items-center justify-center">
                    <MoreVertical className="size-4 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        remindParticipant(id, p.id);
                        toast(`Reminder sent to ${p.name}`);
                      }}
                    >
                      <Bell className="mr-2 size-4" /> Send reminder
                    </DropdownMenuItem>
                    <Link to="/pay/$id/$pid" params={{ id, pid: p.id }}>
                      <DropdownMenuItem>
                        <Send className="mr-2 size-4" /> Pay as participant
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => removeParticipant(id, p.id)}>
                      <UserMinus className="mr-2 size-4" /> Remove
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {p.status === "PAID" && <CheckCircle2 className="size-5 text-success" />}
              {p.status === "DECLINED" && <X className="size-5 text-muted-foreground" />}
            </div>
          ))}
        </div>

        {c.status === "ACTIVE" && (
          <p className="text-xs text-center text-muted-foreground mt-4">
            <span className="inline-block size-1.5 rounded-full bg-success animate-pulse mr-1.5 align-middle" />
            Live updates · refreshes automatically
          </p>
        )}
      </div>

      <div className="h-6" />
    </MobileShell>
  );
}

function Pill({
  count,
  label,
  tone,
}: {
  count: number;
  label: string;
  tone: "success" | "warning" | "muted";
}) {
  const cls = {
    success: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    muted: "bg-muted text-muted-foreground",
  }[tone];
  return (
    <div className={`rounded-xl py-2 ${cls}`}>
      <p className="font-bold text-lg leading-none">{count}</p>
      <p className="text-[10px] uppercase tracking-wide mt-0.5">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: ParticipantStatus }) {
  const map = {
    PAID: {
      cls: "bg-success/15 text-success",
      icon: <CheckCircle2 className="size-3" />,
      label: "Paid",
    },
    PENDING: {
      cls: "bg-warning/15 text-warning-foreground",
      icon: <Clock className="size-3" />,
      label: "Pending",
    },
    DECLINED: {
      cls: "bg-muted text-muted-foreground",
      icon: <X className="size-3" />,
      label: "Declined",
    },
    INVITED: { cls: "bg-brand/10 text-brand", icon: <Send className="size-3" />, label: "Invited" },
  }[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${map.cls}`}
    >
      {map.icon} {map.label}
    </span>
  );
}
