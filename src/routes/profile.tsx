import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, CreditCard, HelpCircle, LogOut, Moon, Shield, Smartphone } from "lucide-react";
import { MobileShell, ScreenHeader, Avatar } from "@/components/MobileShell";
import { Switch } from "@/components/ui/switch";
import { useApp, fmt } from "@/lib/store";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Pagamos" }] }),
  component: ProfilePage,
});

function ProfilePage() {
  const { me, collections } = useApp();
  const total = collections.reduce((a, c) => a + c.collectedAmount, 0);
  const splits = collections.length;

  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <MobileShell>
      <ScreenHeader title="My profile" />
      <div className="px-5">
        <div className="brand-gradient text-brand-foreground rounded-2xl p-5 flex items-center gap-4">
          <Avatar initials={me.initials} color="rgba(255,255,255,0.25)" size={56} />
          <div className="flex-1">
            <p className="font-semibold text-lg">{me.name}</p>
            <p className="text-xs text-white/80">{me.phone}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Stat label="Splits created" value={String(splits)} />
          <Stat label="Total flow" value={fmt(total)} />
        </div>

        <Section title="Account">
          <Row icon={<CreditCard className="size-4" />} label="Payment methods" />
          <Row icon={<Smartphone className="size-4" />} label="Linked M-Pesa number" hint="+258 84 ••• 5566" />
          <Row icon={<Shield className="size-4" />} label="Security & PIN" />
        </Section>

        <Section title="Preferences">
          <Row
            icon={<Moon className="size-4" />}
            label="Dark mode"
            right={<Switch checked={dark} onCheckedChange={setDark} />}
          />
          <Row icon={<HelpCircle className="size-4" />} label="Help & support" />
        </Section>

        <button className="w-full mt-4 p-4 rounded-2xl bg-card border border-border text-destructive font-semibold flex items-center justify-center gap-2">
          <LogOut className="size-4" /> Sign out
        </button>

        <div className="mt-4 flex flex-col items-center gap-2">
          <div className="bg-white rounded-md px-3 py-1.5 inline-flex items-center justify-center border border-border">
            <img src={vodacomMpesaLogo.url} alt="Vodacom M-Pesa" className="h-6 w-auto" />
          </div>
          <p className="text-center text-[10px] text-muted-foreground">Pagamos v1.0</p>
        </div>
      </div>
    </MobileShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-bold text-lg mt-0.5">{value}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-5">
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mb-2 px-1">{title}</p>
      <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">{children}</div>
    </div>
  );
}

function Row({ icon, label, hint, right }: { icon: React.ReactNode; label: string; hint?: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 p-4">
      <div className="size-9 rounded-lg bg-muted text-foreground flex items-center justify-center">{icon}</div>
      <div className="flex-1">
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {right ?? <ChevronRight className="size-4 text-muted-foreground" />}
    </div>
  );
}
