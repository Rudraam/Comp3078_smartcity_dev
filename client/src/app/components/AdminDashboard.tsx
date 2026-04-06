import { useState, useEffect } from "react";
import { useNavigate } from "../hooks/router-compat";
import PageLayout from "./shared/PageLayout";
import { useAuth } from "../hooks/useAuth";
import {
  Users, ClipboardList, BarChart3, CheckCircle, XCircle, Clock,
  ChevronDown, Search, Shield, Star, Building2, RefreshCw,
  ShieldCheck, UserCog, Utensils, Hotel, Calendar, Eye
} from "lucide-react";

type Tab = "overview" | "users" | "submissions";
type RoleName = "regular" | "commercial" | "admin";

interface Stats {
  totalUsers: number;
  regularCount: number;
  commercialCount: number;
  adminCount: number;
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
}

interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: RoleName;
  preferredCity: string;
}

interface Submission {
  id: string;
  userId: string;
  type: string;
  name: string;
  description: string;
  address: string;
  city: string;
  website: string;
  phone: string;
  additionalInfo: string;
  status: string;
  adminNote: string;
  reviewedBy: string | null;
  createdAt: string;
  reviewedAt: string | null;
}

const ROLE_COLORS: Record<RoleName, string> = {
  regular: "bg-[#23262f] text-[#99a1af] border border-[#2a2d38]",
  commercial: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  admin: "bg-[#1152d4]/15 text-[#5281e0] border border-[#1152d4]/25",
};

const ROLE_LABELS: Record<RoleName, string> = {
  regular: "Regular",
  commercial: "Commercial",
  admin: "Admin",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  approved: "bg-green-500/10 text-green-400 border border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const TYPE_ICONS: Record<string, React.ReactNode> = {
  restaurant: <Utensils className="w-4 h-4" />,
  hotel: <Hotel className="w-4 h-4" />,
  event: <Calendar className="w-4 h-4" />,
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSearch, setUserSearch] = useState("");
  const [subFilter, setSubFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [reviewModal, setReviewModal] = useState<{ sub: Submission; note: string } | null>(null);
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
  const [updatingSub, setUpdatingSub] = useState<string | null>(null);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/dashboard");
      return;
    }
    loadAll();
  }, [isAdmin]);

  async function loadAll() {
    setLoading(true);
    try {
      const [statsRes, usersRes, subsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/users"),
        fetch("/api/admin/submissions"),
      ]);
      if (statsRes.ok) setStats(await statsRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
      if (subsRes.ok) setSubmissions(await subsRes.json());
    } finally {
      setLoading(false);
    }
  }

  async function changeRole(userId: string, role: RoleName) {
    setUpdatingRole(userId);
    try {
      const resp = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (resp.ok) {
        const updated = await resp.json();
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: updated.role } : u));
        if (stats) {
          const allUpdated = users.map(u => u.id === userId ? { ...u, role } : u);
          setStats({
            ...stats,
            regularCount: allUpdated.filter(u => u.role === "regular").length,
            commercialCount: allUpdated.filter(u => u.role === "commercial").length,
            adminCount: allUpdated.filter(u => u.role === "admin").length,
          });
        }
      }
    } finally {
      setUpdatingRole(null);
    }
  }

  async function reviewSubmission(id: string, status: "approved" | "rejected", adminNote: string) {
    setUpdatingSub(id);
    try {
      const resp = await fetch(`/api/admin/submissions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, adminNote }),
      });
      if (resp.ok) {
        const updated = await resp.json();
        setSubmissions(prev => prev.map(s => s.id === id ? updated : s));
        if (stats) {
          setStats(prev => {
            if (!prev) return prev;
            const sub = submissions.find(s => s.id === id);
            const wasStatus = sub?.status ?? "pending";
            return {
              ...prev,
              pendingCount: prev.pendingCount + (wasStatus === "pending" ? -1 : 0) + (status === "pending" ? 1 : 0),
              approvedCount: prev.approvedCount + (wasStatus === "approved" ? -1 : 0) + (status === "approved" ? 1 : 0),
              rejectedCount: prev.rejectedCount + (wasStatus === "rejected" ? -1 : 0) + (status === "rejected" ? 1 : 0),
            };
          });
        }
      }
    } finally {
      setUpdatingSub(null);
      setReviewModal(null);
    }
  }

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredSubs = subFilter === "all" ? submissions : submissions.filter(s => s.status === subFilter);

  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#1152d4] border-t-transparent rounded-full" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <ShieldCheck className="w-7 h-7 text-[#1152d4]" aria-hidden="true" />
              <h1 className="text-3xl font-bold text-[var(--app-text)]">Admin Dashboard</h1>
            </div>
            <p className="text-[var(--app-text-muted)]">Manage users, review submissions, and monitor the app</p>
          </div>
          <button
            onClick={loadAll}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--app-card)] border border-[var(--app-border)] text-[var(--app-text-muted)] hover:text-[var(--app-text)] transition-colors text-sm"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            Refresh
          </button>
        </div>

        <div className="flex gap-1 bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl p-1 mb-8 w-fit">
          {(["overview", "users", "submissions"] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                tab === t
                  ? "bg-[#1152d4] text-white"
                  : "text-[var(--app-text-muted)] hover:text-[var(--app-text)]"
              }`}
            >
              {t === "overview" && <BarChart3 className="w-4 h-4" aria-hidden="true" />}
              {t === "users" && <Users className="w-4 h-4" aria-hidden="true" />}
              {t === "submissions" && <ClipboardList className="w-4 h-4" aria-hidden="true" />}
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "overview" && stats && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard icon={<Users className="w-5 h-5" />} label="Total Users" value={stats.totalUsers} color="blue" />
              <StatCard icon={<Shield className="w-5 h-5" />} label="Regular" value={stats.regularCount} color="gray" />
              <StatCard icon={<Star className="w-5 h-5" />} label="Commercial" value={stats.commercialCount} color="amber" />
              <StatCard icon={<ShieldCheck className="w-5 h-5" />} label="Admins" value={stats.adminCount} color="blue" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard icon={<Clock className="w-5 h-5" />} label="Pending Submissions" value={stats.pendingCount} color="amber" large />
              <StatCard icon={<CheckCircle className="w-5 h-5" />} label="Approved Submissions" value={stats.approvedCount} color="green" large />
              <StatCard icon={<XCircle className="w-5 h-5" />} label="Rejected Submissions" value={stats.rejectedCount} color="red" large />
            </div>

            <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl p-6">
              <h3 className="font-semibold text-[var(--app-text)] mb-4">Recent Submissions</h3>
              {submissions.slice(0, 5).length === 0 ? (
                <p className="text-[var(--app-text-muted)] text-sm">No submissions yet.</p>
              ) : (
                <div className="space-y-3">
                  {submissions.slice(0, 5).map(sub => (
                    <div key={sub.id} className="flex flex-wrap items-center justify-between gap-3 py-2 border-b border-[var(--app-border)] last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[var(--app-icon-bg)] flex items-center justify-center text-[#1152d4]">
                          {TYPE_ICONS[sub.type] ?? <Building2 className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-[var(--app-text)] text-sm">{sub.name}</p>
                          <p className="text-xs text-[var(--app-text-muted)]">{sub.city} · {sub.type}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[sub.status]}`}>
                        {sub.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "users" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl px-4 py-2.5">
              <Search className="w-4 h-4 text-[var(--app-text-muted)] shrink-0" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search by username or email..."
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                className="flex-1 bg-transparent text-[var(--app-text)] placeholder-[var(--app-text-muted)] text-sm focus:outline-none"
              />
            </div>

            <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr_auto] gap-4 px-5 py-3 border-b border-[var(--app-border)] bg-[var(--app-card-inner)]">
                <span className="text-xs font-semibold text-[var(--app-text-muted)] uppercase tracking-wide">Username</span>
                <span className="text-xs font-semibold text-[var(--app-text-muted)] uppercase tracking-wide hidden md:block">Email</span>
                <span className="text-xs font-semibold text-[var(--app-text-muted)] uppercase tracking-wide">Role</span>
                <span className="text-xs font-semibold text-[var(--app-text-muted)] uppercase tracking-wide">Change</span>
              </div>
              {filteredUsers.length === 0 ? (
                <div className="px-5 py-8 text-center text-[var(--app-text-muted)] text-sm">No users found.</div>
              ) : (
                filteredUsers.map(u => (
                  <div key={u.id} className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr_auto] gap-4 items-center px-5 py-3 border-b border-[var(--app-border)] last:border-0 hover:bg-[var(--app-card-hover)] transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#1152d4]/15 flex items-center justify-center text-[#5281e0] text-xs font-bold shrink-0">
                        {u.username[0]?.toUpperCase()}
                      </div>
                      <span className="text-sm font-medium text-[var(--app-text)] truncate">{u.username}</span>
                      {u.id === user?.id && <span className="text-xs text-[#5281e0] shrink-0">(you)</span>}
                    </div>
                    <span className="text-sm text-[var(--app-text-muted)] hidden md:block truncate">{u.email || "—"}</span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium w-fit ${ROLE_COLORS[u.role as RoleName] ?? ROLE_COLORS.regular}`}>
                      {ROLE_LABELS[u.role as RoleName] ?? u.role}
                    </span>
                    <div className="relative">
                      {updatingRole === u.id ? (
                        <div className="animate-spin w-4 h-4 border-2 border-[#1152d4] border-t-transparent rounded-full" />
                      ) : (
                        <select
                          value={u.role}
                          disabled={u.id === user?.id}
                          onChange={e => changeRole(u.id, e.target.value as RoleName)}
                          className="text-xs bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-lg px-2 py-1.5 text-[var(--app-text)] focus:outline-none focus:border-[#1152d4] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="regular">Regular</option>
                          <option value="commercial">Commercial</option>
                          <option value="admin">Admin</option>
                        </select>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {tab === "submissions" && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(["all", "pending", "approved", "rejected"] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setSubFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
                    subFilter === f
                      ? "bg-[#1152d4] text-white"
                      : "bg-[var(--app-card)] border border-[var(--app-border)] text-[var(--app-text-muted)] hover:text-[var(--app-text)]"
                  }`}
                >
                  {f === "all" ? `All (${submissions.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${submissions.filter(s => s.status === f).length})`}
                </button>
              ))}
            </div>

            {filteredSubs.length === 0 ? (
              <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl px-5 py-12 text-center text-[var(--app-text-muted)]">
                No submissions match this filter.
              </div>
            ) : (
              <div className="space-y-3">
                {filteredSubs.map(sub => (
                  <div key={sub.id} className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--app-icon-bg)] flex items-center justify-center text-[#1152d4]">
                          {TYPE_ICONS[sub.type] ?? <Building2 className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-[var(--app-text)]">{sub.name}</h4>
                          <p className="text-xs text-[var(--app-text-muted)] capitalize">{sub.type} · {sub.city}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[sub.status]}`}>
                          {sub.status}
                        </span>
                        {sub.status === "pending" && (
                          <button
                            onClick={() => setReviewModal({ sub, note: "" })}
                            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#1152d4] text-white hover:bg-[#0e44b0] transition-colors"
                          >
                            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                            Review
                          </button>
                        )}
                      </div>
                    </div>

                    {sub.description && (
                      <p className="text-sm text-[var(--app-text-muted)] mb-2">{sub.description}</p>
                    )}

                    <div className="flex flex-wrap gap-4 text-xs text-[var(--app-text-muted)]">
                      {sub.address && <span>{sub.address}</span>}
                      {sub.phone && <span>{sub.phone}</span>}
                      {sub.website && <a href={sub.website} target="_blank" rel="noopener noreferrer" className="text-[#5281e0] hover:underline">{sub.website}</a>}
                    </div>

                    {sub.adminNote && (
                      <div className="mt-3 pt-3 border-t border-[var(--app-border)]">
                        <p className="text-xs text-[var(--app-text-muted)]">
                          <span className="font-medium">Admin note:</span> {sub.adminNote}
                        </p>
                      </div>
                    )}

                    <div className="mt-2 text-xs text-[var(--app-text-muted)]">
                      Submitted {new Date(sub.createdAt).toLocaleDateString()}
                      {sub.reviewedAt && ` · Reviewed ${new Date(sub.reviewedAt).toLocaleDateString()}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {reviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h3 className="font-semibold text-[var(--app-text)] text-lg mb-1">Review Submission</h3>
            <p className="text-sm text-[var(--app-text-muted)] mb-4">{reviewModal.sub.name} · {reviewModal.sub.city}</p>

            <div className="space-y-3 mb-4 text-sm">
              {reviewModal.sub.description && (
                <div className="bg-[var(--app-card-inner)] rounded-lg p-3">
                  <p className="text-xs font-medium text-[var(--app-text-muted)] mb-1">Description</p>
                  <p className="text-[var(--app-text)]">{reviewModal.sub.description}</p>
                </div>
              )}
              {reviewModal.sub.additionalInfo && (
                <div className="bg-[var(--app-card-inner)] rounded-lg p-3">
                  <p className="text-xs font-medium text-[var(--app-text-muted)] mb-1">Additional Info</p>
                  <p className="text-[var(--app-text)]">{reviewModal.sub.additionalInfo}</p>
                </div>
              )}
            </div>

            <label className="block text-sm font-medium text-[var(--app-text)] mb-2">
              Admin Note (optional)
            </label>
            <textarea
              value={reviewModal.note}
              onChange={e => setReviewModal({ ...reviewModal, note: e.target.value })}
              placeholder="Add a note for the submitter..."
              rows={3}
              className="w-full bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-lg px-3 py-2 text-sm text-[var(--app-text)] placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[#1152d4] resize-none mb-4"
            />

            <div className="flex gap-3">
              <button
                onClick={() => reviewSubmission(reviewModal.sub.id, "rejected", reviewModal.note)}
                disabled={updatingSub === reviewModal.sub.id}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" aria-hidden="true" />
                Reject
              </button>
              <button
                onClick={() => reviewSubmission(reviewModal.sub.id, "approved", reviewModal.note)}
                disabled={updatingSub === reviewModal.sub.id}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors text-sm font-medium disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                Approve
              </button>
            </div>

            <button
              onClick={() => setReviewModal(null)}
              className="w-full mt-3 py-2 text-sm text-[var(--app-text-muted)] hover:text-[var(--app-text)] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </PageLayout>
  );
}

function StatCard({ icon, label, value, color, large }: {
  icon: React.ReactNode; label: string; value: number; color: string; large?: boolean;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-[#1152d4]/10 text-[#5281e0]",
    gray: "bg-[var(--app-card-inner)] text-[var(--app-text-muted)]",
    amber: "bg-amber-500/10 text-amber-400",
    green: "bg-green-500/10 text-green-400",
    red: "bg-red-500/10 text-red-400",
  };
  return (
    <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl p-5">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorMap[color]}`} aria-hidden="true">
        {icon}
      </div>
      <p className={`font-bold text-[var(--app-text)] ${large ? "text-3xl" : "text-2xl"}`}>{value}</p>
      <p className="text-sm text-[var(--app-text-muted)] mt-0.5">{label}</p>
    </div>
  );
}
