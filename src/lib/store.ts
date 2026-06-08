import { create } from "zustand";

export type ParticipantStatus = "INVITED" | "PENDING" | "PAID" | "DECLINED";
export type CollectionStatus = "DRAFT" | "ACTIVE" | "COMPLETE" | "SETTLED" | "CANCELLED";
export type SplitType = "EQUAL" | "CUSTOM";

export interface Participant {
  id: string;
  name: string;
  phone: string;
  initials: string;
  color: string;
  shareAmount: number;
  status: ParticipantStatus;
  paidAt?: string;
  reference?: string;
}

export interface Collection {
  id: string;
  billName: string;
  merchantName: string;
  merchantTill?: string;
  description?: string;
  totalAmount: number;
  collectedAmount: number;
  currency: string;
  status: CollectionStatus;
  splitType: SplitType;
  createdAt: string;
  participants: Participant[];
  reference?: string;
}

export interface SavedGroup {
  id: string;
  name: string;
  emoji: string;
  members: Omit<Participant, "shareAmount" | "status">[];
}

export interface AppNotification {
  id: string;
  type: "INVITE" | "PAID" | "FAILED" | "COMPLETE" | "MERCHANT" | "REMINDER";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const palette = [
  "oklch(0.7 0.16 27)",
  "oklch(0.7 0.16 152)",
  "oklch(0.7 0.16 250)",
  "oklch(0.7 0.16 60)",
  "oklch(0.7 0.16 300)",
  "oklch(0.7 0.16 200)",
];

const mkInitials = (n: string) =>
  n.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();

const id = () => Math.random().toString(36).slice(2, 10);
const ref = () =>
  Array.from({ length: 10 }, () =>
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)],
  ).join("");

const seedContacts: Omit<Participant, "shareAmount" | "status">[] = [
  { id: "u1", name: "Amelia Tembe", phone: "+258 84 111 2233", initials: "AT", color: palette[0] },
  { id: "u2", name: "Cate Mucavele", phone: "+258 84 222 3344", initials: "CM", color: palette[1] },
  { id: "u3", name: "Jess Macuacua", phone: "+258 84 333 4455", initials: "JM", color: palette[2] },
  { id: "u4", name: "Makena Ali", phone: "+258 84 444 5566", initials: "MA", color: palette[3] },
  { id: "u5", name: "Noella Sitoe", phone: "+258 84 555 6677", initials: "NS", color: palette[4] },
  { id: "u6", name: "Tomas Langa", phone: "+258 84 666 7788", initials: "TL", color: palette[5] },
  { id: "u7", name: "Rui Chissano", phone: "+258 84 777 8899", initials: "RC", color: palette[0] },
  { id: "u8", name: "Lara Mondlane", phone: "+258 84 888 9900", initials: "LM", color: palette[1] },
];

const seedGroups: SavedGroup[] = [
  { id: "g1", name: "Trip Crew", emoji: "🏖️", members: seedContacts.slice(0, 5) },
  { id: "g2", name: "Office Team", emoji: "💼", members: seedContacts.slice(2, 7) },
  { id: "g3", name: "Family", emoji: "🏠", members: seedContacts.slice(1, 5) },
];

const demoCollection: Collection = {
  id: "demo1",
  billName: "Dinner at Ocean",
  merchantName: "Ocean Restaurant",
  totalAmount: 12000,
  collectedAmount: 4800,
  currency: "MZN",
  status: "ACTIVE",
  splitType: "EQUAL",
  createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  participants: seedContacts.slice(0, 5).map((c, i) => ({
    ...c,
    shareAmount: 2400,
    status: i < 2 ? "PAID" : i === 4 ? "DECLINED" : "PENDING",
    paidAt: i < 2 ? new Date().toISOString() : undefined,
    reference: i < 2 ? ref() : undefined,
  })),
};

interface State {
  me: { name: string; phone: string; initials: string };
  contacts: typeof seedContacts;
  groups: SavedGroup[];
  collections: Collection[];
  notifications: AppNotification[];
  draft: Partial<Collection> & { participantIds?: string[] };

  setDraft: (d: Partial<State["draft"]>) => void;
  resetDraft: () => void;
  createCollection: () => string;

  payShare: (collectionId: string, participantId: string) => void;
  declineShare: (collectionId: string, participantId: string) => void;
  remindParticipant: (collectionId: string, participantId: string) => void;
  removeParticipant: (collectionId: string, participantId: string) => void;
  cancelCollection: (collectionId: string) => void;
  settleMerchant: (collectionId: string, till: string) => void;

  addGroup: (g: Omit<SavedGroup, "id">) => void;
  removeGroup: (id: string) => void;

  markNotificationsRead: () => void;
}

export const useApp = create<State>((set, get) => ({
  me: { name: "Makena Ali", phone: "+258 84 444 5566", initials: "MA" },
  contacts: seedContacts,
  groups: seedGroups,
  collections: [demoCollection],
  notifications: [
    { id: id(), type: "PAID", title: "Amelia paid her share", body: "MZN 2,400 contributed to Dinner at Ocean", time: "2m ago", read: false },
    { id: id(), type: "INVITE", title: "New split invite", body: "Tomas invited you to Weekend Trip", time: "1h ago", read: false },
    { id: id(), type: "REMINDER", title: "Reminder sent", body: "You nudged Jess about Dinner at Ocean", time: "3h ago", read: true },
  ],
  draft: {},

  setDraft: (d) => set((s) => ({ draft: { ...s.draft, ...d } })),
  resetDraft: () => set({ draft: {} }),

  createCollection: () => {
    const d = get().draft;
    const ids = d.participantIds ?? [];
    const contacts = get().contacts.filter((c) => ids.includes(c.id));
    const total = d.totalAmount ?? 0;
    const splitType = (d.splitType as SplitType) ?? "EQUAL";
    const share = contacts.length > 0 ? Math.round(total / contacts.length) : 0;
    const c: Collection = {
      id: id(),
      billName: d.billName ?? "New Split",
      merchantName: d.merchantName ?? "Merchant",
      description: d.description,
      totalAmount: total,
      collectedAmount: 0,
      currency: d.currency ?? "MZN",
      status: "ACTIVE",
      splitType,
      createdAt: new Date().toISOString(),
      participants: contacts.map((p) => ({
        ...p,
        shareAmount: share,
        status: "PENDING",
      })),
    };
    set((s) => ({
      collections: [c, ...s.collections],
      draft: {},
      notifications: [
        {
          id: id(),
          type: "INVITE",
          title: "Invites sent",
          body: `${contacts.length} people invited to ${c.billName}`,
          time: "now",
          read: false,
        },
        ...s.notifications,
      ],
    }));
    return c.id;
  },

  payShare: (cid, pid) =>
    set((s) => ({
      collections: s.collections.map((c) => {
        if (c.id !== cid) return c;
        const updated = c.participants.map((p) =>
          p.id === pid
            ? { ...p, status: "PAID" as const, paidAt: new Date().toISOString(), reference: ref() }
            : p,
        );
        const collected = updated.filter((p) => p.status === "PAID").reduce((a, p) => a + p.shareAmount, 0);
        const isComplete = collected >= c.totalAmount;
        return {
          ...c,
          participants: updated,
          collectedAmount: collected,
          status: isComplete ? ("COMPLETE" as const) : c.status,
        };
      }),
      notifications: [
        {
          id: id(),
          type: "PAID",
          title: "Payment received",
          body: "A participant just paid their share",
          time: "now",
          read: false,
        },
        ...s.notifications,
      ],
    })),

  declineShare: (cid, pid) =>
    set((s) => ({
      collections: s.collections.map((c) =>
        c.id !== cid
          ? c
          : {
              ...c,
              participants: c.participants.map((p) =>
                p.id === pid ? { ...p, status: "DECLINED" } : p,
              ),
            },
      ),
    })),

  remindParticipant: (cid, pid) =>
    set((s) => ({
      notifications: [
        {
          id: id(),
          type: "REMINDER",
          title: "Reminder sent",
          body: `Nudge sent to ${s.collections.find((c) => c.id === cid)?.participants.find((p) => p.id === pid)?.name ?? "participant"}`,
          time: "now",
          read: false,
        },
        ...s.notifications,
      ],
    })),

  removeParticipant: (cid, pid) =>
    set((s) => ({
      collections: s.collections.map((c) => {
        if (c.id !== cid) return c;
        const remaining = c.participants.filter((p) => p.id !== pid);
        const equalShare = remaining.length ? Math.round(c.totalAmount / remaining.length) : 0;
        return {
          ...c,
          participants:
            c.splitType === "EQUAL"
              ? remaining.map((p) => (p.status === "PAID" ? p : { ...p, shareAmount: equalShare }))
              : remaining,
        };
      }),
    })),

  cancelCollection: (cid) =>
    set((s) => ({
      collections: s.collections.map((c) => (c.id === cid ? { ...c, status: "CANCELLED" } : c)),
    })),

  settleMerchant: (cid, till) =>
    set((s) => ({
      collections: s.collections.map((c) =>
        c.id !== cid ? c : { ...c, status: "SETTLED", merchantTill: till, reference: ref() },
      ),
      notifications: [
        {
          id: id(),
          type: "MERCHANT",
          title: "Merchant paid",
          body: `${s.collections.find((c) => c.id === cid)?.merchantName} settled`,
          time: "now",
          read: false,
        },
        ...s.notifications,
      ],
    })),

  addGroup: (g) => set((s) => ({ groups: [{ ...g, id: id() }, ...s.groups] })),
  removeGroup: (gid) => set((s) => ({ groups: s.groups.filter((g) => g.id !== gid) })),

  markNotificationsRead: () =>
    set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
}));

export const fmt = (n: number, currency = "MZN") =>
  `${currency} ${n.toLocaleString("en-US")}`;
