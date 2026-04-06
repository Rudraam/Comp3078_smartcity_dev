import { useState, useEffect } from "react";
import { useNavigate } from "../hooks/router-compat";
import PageLayout from "./shared/PageLayout";
import { useAuth } from "../hooks/useAuth";
import {
  Utensils, Hotel, Calendar, CheckCircle, Clock, XCircle,
  Plus, Building2, Send, ChevronDown
} from "lucide-react";

type ListingType = "restaurant" | "hotel" | "event";

interface Submission {
  id: string;
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
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  approved: "bg-green-500/10 text-green-400 border border-green-500/20",
  rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock className="w-3.5 h-3.5" />,
  approved: <CheckCircle className="w-3.5 h-3.5" />,
  rejected: <XCircle className="w-3.5 h-3.5" />,
};

const TYPE_CONFIG: Record<ListingType, { icon: React.ReactNode; label: string; color: string }> = {
  restaurant: { icon: <Utensils className="w-5 h-5" />, label: "Restaurant", color: "bg-orange-500/10 text-orange-400" },
  hotel: { icon: <Hotel className="w-5 h-5" />, label: "Hotel", color: "bg-blue-500/10 text-blue-400" },
  event: { icon: <Calendar className="w-5 h-5" />, label: "Event", color: "bg-purple-500/10 text-purple-400" },
};

const INITIAL_FORM = {
  type: "restaurant" as ListingType,
  name: "",
  description: "",
  address: "",
  city: "",
  website: "",
  phone: "",
  additionalInfo: "",
};

export default function SubmitListing() {
  const navigate = useNavigate();
  const { user, isCommercial } = useAuth();
  const [form, setForm] = useState(INITIAL_FORM);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!isCommercial) {
      navigate("/dashboard");
      return;
    }
    loadSubmissions();
  }, [isCommercial]);

  async function loadSubmissions() {
    setLoading(true);
    try {
      const resp = await fetch("/api/commercial/submissions");
      if (resp.ok) setSubmissions(await resp.json());
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name.trim()) { setError("Name is required"); return; }
    if (!form.city.trim()) { setError("City is required"); return; }

    setSubmitting(true);
    try {
      const resp = await fetch("/api/commercial/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!resp.ok) {
        const err = await resp.json();
        setError(err.error || "Submission failed");
        return;
      }
      const sub = await resp.json();
      setSubmissions(prev => [sub, ...prev]);
      setForm(INITIAL_FORM);
      setSuccess(true);
      setShowForm(false);
      setTimeout(() => setSuccess(false), 4000);
    } finally {
      setSubmitting(false);
    }
  }

  const field = (id: string, label: string, value: string, onChange: (v: string) => void, opts?: { placeholder?: string; required?: boolean; type?: string }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-[var(--app-text)] mb-1.5">
        {label} {opts?.required && <span className="text-red-400">*</span>}
      </label>
      <input
        id={id}
        type={opts?.type ?? "text"}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={opts?.placeholder}
        className="w-full bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--app-text)] placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[#1152d4] transition-colors"
      />
    </div>
  );

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <Building2 className="w-7 h-7 text-[#1152d4]" aria-hidden="true" />
              <h1 className="text-3xl font-bold text-[var(--app-text)]">Submit a Listing</h1>
            </div>
            <p className="text-[var(--app-text-muted)]">Request to add a restaurant, hotel, or event to the app</p>
          </div>
          <button
            onClick={() => { setShowForm(!showForm); setError(""); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1152d4] text-white text-sm font-medium hover:bg-[#0e44b0] transition-colors"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            New Listing
          </button>
        </div>

        {success && (
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 mb-6 text-green-400">
            <CheckCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
            <span className="text-sm font-medium">Submission received! An admin will review it shortly.</span>
          </div>
        )}

        {showForm && (
          <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-2xl p-6 mb-8">
            <h2 className="font-semibold text-[var(--app-text)] text-lg mb-5">Listing Details</h2>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--app-text)] mb-2">Listing Type <span className="text-red-400">*</span></label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.keys(TYPE_CONFIG) as ListingType[]).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, type: t }))}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        form.type === t
                          ? "bg-[#1152d4] text-white border-[#1152d4]"
                          : "bg-[var(--app-card-inner)] text-[var(--app-text-muted)] border-[var(--app-border)] hover:text-[var(--app-text)]"
                      }`}
                    >
                      {TYPE_CONFIG[t].icon}
                      {TYPE_CONFIG[t].label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field("name", "Name", form.name, v => setForm(f => ({ ...f, name: v })), { placeholder: "e.g. Joe's Diner", required: true })}
                {field("city", "City", form.city, v => setForm(f => ({ ...f, city: v })), { placeholder: "e.g. Toronto", required: true })}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[var(--app-text)] mb-1.5">Description</label>
                <textarea
                  id="description"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Describe the listing..."
                  rows={3}
                  className="w-full bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--app-text)] placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[#1152d4] resize-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field("address", "Address", form.address, v => setForm(f => ({ ...f, address: v })), { placeholder: "123 Main St" })}
                {field("phone", "Phone", form.phone, v => setForm(f => ({ ...f, phone: v })), { placeholder: "+1 416 555 0100", type: "tel" })}
              </div>

              {field("website", "Website", form.website, v => setForm(f => ({ ...f, website: v })), { placeholder: "https://example.com", type: "url" })}

              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-medium text-[var(--app-text)] mb-1.5">Additional Info</label>
                <textarea
                  id="additionalInfo"
                  value={form.additionalInfo}
                  onChange={e => setForm(f => ({ ...f, additionalInfo: e.target.value }))}
                  placeholder="Anything else the admin should know..."
                  rows={2}
                  className="w-full bg-[var(--app-card-inner)] border border-[var(--app-border)] rounded-lg px-3 py-2.5 text-sm text-[var(--app-text)] placeholder-[var(--app-text-muted)] focus:outline-none focus:border-[#1152d4] resize-none transition-colors"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); setError(""); setForm(INITIAL_FORM); }}
                  className="flex-1 py-2.5 rounded-xl border border-[var(--app-border)] text-sm text-[var(--app-text-muted)] hover:text-[var(--app-text)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1152d4] text-white text-sm font-medium hover:bg-[#0e44b0] transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  {submitting ? "Submitting..." : "Submit for Review"}
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          <h2 className="font-semibold text-[var(--app-text)] mb-4">Your Submissions</h2>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-7 h-7 border-2 border-[#1152d4] border-t-transparent rounded-full" />
            </div>
          ) : submissions.length === 0 ? (
            <div className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl px-5 py-12 text-center">
              <Building2 className="w-10 h-10 text-[var(--app-text-muted)] mx-auto mb-3" aria-hidden="true" />
              <p className="text-[var(--app-text-muted)] text-sm">No submissions yet. Use the button above to submit your first listing.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map(sub => (
                <div key={sub.id} className="bg-[var(--app-card)] border border-[var(--app-border)] rounded-xl p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${TYPE_CONFIG[sub.type as ListingType]?.color ?? "bg-[var(--app-icon-bg)] text-[#1152d4]"}`} aria-hidden="true">
                        {TYPE_CONFIG[sub.type as ListingType]?.icon ?? <Building2 className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--app-text)]">{sub.name}</p>
                        <p className="text-xs text-[var(--app-text-muted)] capitalize">{sub.type} · {sub.city}</p>
                      </div>
                    </div>
                    <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[sub.status]}`}>
                      {STATUS_ICONS[sub.status]}
                      {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
                    </span>
                  </div>

                  {sub.description && (
                    <p className="text-sm text-[var(--app-text-muted)] mt-2 line-clamp-2">{sub.description}</p>
                  )}

                  {sub.adminNote && (
                    <div className="mt-3 pt-3 border-t border-[var(--app-border)]">
                      <p className="text-xs text-[var(--app-text-muted)]">
                        <span className="font-medium text-[var(--app-text)]">Admin note:</span> {sub.adminNote}
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-[var(--app-text-muted)] mt-2">
                    Submitted {new Date(sub.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
