import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Users } from "lucide-react";
import { MobileShell, Avatar } from "@/components/MobileShell";
import { Progress } from "@/components/ui/progress";
import { useApp, fmt } from "@/lib/store";
import vodacomMpesaLogo from "@/assets/vodacom-mpesa.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pagamos — Group payments made simple" },
      { name: "description", content: "Split bills, collect contributions, and settle merchants from your phone." },
      { property: "og:title", content: "Pagamos" },
      { property: "og:description", content: "Pay together. Effortlessly. Securely." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { me, collections } = useApp();
  const active = collections.filter((c) => c.status === "ACTIVE" || c.status === "COMPLETE");
  const done = collections.filter((c) => c.status === "SETTLED");
  const totalCollected = collections.reduce((a, c) => a + c.collectedAmount, 0);

  return (
    <MobileShell>
      <section className="brand-gradient text-brand-foreground px-5 pt-7 pb-10 rounded-b-3xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-2xl" aria-hidden />
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            <Avatar initials={me.initials} color="rgba(255,255,255,0.2)" />
            <div>
              <p className="text-xs text-white/70">Karibu</p>
              <p className="font-semibold">{me.name}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-white/70">Pagamos</p>
            <div className="mt-1 bg-white rounded-md px-2 py-1 inline-flex items-center justify-center">
              <img src={vodacomMpesaLogo.url} alt="Vodacom M-Pesa" className="h-5 w-auto" />
            </div>
          </div>
        </div>

        <div className="mt-6 relative">
          <p className="text-xs text-white/80">Total collected this month</p>
          <p className="text-4xl font-bold tracking-tight mt-1">{fmt(totalCollected)}</p>
          <div className="mt-5 grid grid-cols-3 gap-2 text-center">
            <Stat icon={<Sparkles className="size-4" />} label="Active" value={String(active.length)} />
            <Stat icon={<CheckCircle2 className="size-4" />} label="Settled" value={String(done.length)} />
            <Stat icon={<Users className="size-4" />} label="Groups" value={String(useApp.getState().groups.length)} />
          </div>
        </div>
      </section>

      <section className="px-5 -mt-5 relative z-10">
        <Link
          to="/create"
          className="block bg-card border border-border rounded-2xl p-4 shadow-sm active:scale-[0.99] transition"
        >
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-xl brand-gradient text-brand-foreground flex items-center justify-center">
              <TrendingUp className="size-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold">Create Split Bill</p>
              <p className="text-xs text-muted-foreground">Start a new collection in seconds</p>
            </div>
            <ArrowRight className="size-5 text-muted-foreground" />
          </div>
        </Link>
      </section>

      <section className="px-5 mt-7">
        <SectionTitle title="Active collections" link={null} />
        {active.length === 0 ? (
          <Empty text="No active splits. Tap + to start." />
        ) : (
          <div className="space-y-3">
            {active.map((c) => (
              <CollectionCard key={c.id} c={c} />
            ))}
          </div>
        )}
      </section>

      {done.length > 0 && (
        <section className="px-5 mt-7">
          <SectionTitle title="Recently settled" />
          <div className="space-y-3">
            {done.slice(0, 3).map((c) => (
              <CollectionCard key={c.id} c={c} settled />
            ))}
          </div>
        </section>
      )}

      <section className="px-5 mt-7">
        <SectionTitle title="Saved groups" link="/groups" />
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-5 px-5 pb-2">
          {useApp.getState().groups.map((g) => (
            <Link
              to="/create"
              key={g.id}
              onClick={() => useApp.getState().setDraft({ participantIds: g.members.map((m) => m.id) })}
              className="shrink-0 w-32 bg-card border border-border rounded-2xl p-3 active:scale-95 transition"
            >
              <div className="text-2xl">{g.emoji}</div>
              <p className="mt-2 font-semibold text-sm truncate">{g.name}</p>
              <p className="text-[11px] text-muted-foreground">{g.members.length} members</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="h-6" />
    </MobileShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="bg-white/10 backdrop-blur rounded-xl py-2.5">
      <div className="flex items-center justify-center gap-1 text-white/80 text-[10px] uppercase tracking-wide">
        {icon}
        {label}
      </div>
      <p className="font-bold text-lg leading-none mt-1">{value}</p>
    </div>
  );
}

function SectionTitle({ title, link }: { title: string; link?: string | null }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{title}</h2>
      {link && (
        <Link to={link} className="text-xs font-medium text-brand">See all</Link>
      )}
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="bg-card border border-dashed border-border rounded-2xl p-6 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

function CollectionCard({ c, settled }: { c: ReturnType<typeof useApp.getState>["collections"][number]; settled?: boolean }) {
  const pct = c.totalAmount ? Math.min(100, (c.collectedAmount / c.totalAmount) * 100) : 0;
  const paidCount = c.participants.filter((p) => p.status === "PAID").length;
  return (
    <Link
      to="/collection/$id"
      params={{ id: c.id }}
      className="block bg-card border border-border rounded-2xl p-4 active:scale-[0.99] transition"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-semibold truncate">{c.billName}</p>
          <p className="text-xs text-muted-foreground truncate">{c.merchantName}</p>
        </div>
        <span
          className={
            "text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide " +
            (settled
              ? "bg-success/15 text-success"
              : c.status === "COMPLETE"
                ? "bg-success/15 text-success"
                : "bg-brand/10 text-brand")
          }
        >
          {settled ? "Settled" : c.status === "COMPLETE" ? "Ready to pay" : "Live"}
        </span>
      </div>
      <div className="mt-3">
        <Progress value={pct} className="h-2 bg-muted [&>div]:bg-brand" />
        <div className="flex items-center justify-between mt-2 text-xs">
          <span className="font-semibold">
            {fmt(c.collectedAmount, c.currency)}{" "}
            <span className="text-muted-foreground font-normal">/ {fmt(c.totalAmount, c.currency)}</span>
          </span>
          <span className="text-muted-foreground">{paidCount}/{c.participants.length} paid</span>
        </div>
      </div>
    </Link>
  );
}
