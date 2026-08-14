"use client";

import { useEffect, useState } from "react";
import { Search, Phone, Mail, Filter, CheckCircle2, MessageSquare } from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  status: string;
  createdAt: string;
  consultations: any[];
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/leads")
      .then((r) => r.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, []);

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="font-serif text-3xl font-medium text-earth">Leads Directory</h1>
        <p className="text-sm text-charcoal-muted font-light">
          Manage intake leads, track contact status, and reach out via instant WhatsApp or Email.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name, email, phone, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-earth/15 bg-white text-sm focus:outline-none focus:border-primary"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["ALL", "NEW", "QUALIFIED", "CONVERTED", "ARCHIVED"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                statusFilter === st
                  ? "bg-earth text-white shadow-xs"
                  : "bg-white text-charcoal-muted border border-earth/10 hover:bg-surface"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-3xl border border-earth/10 shadow-soft overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-sm text-charcoal-muted animate-pulse">
            Loading leads...
          </div>
        ) : filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-earth">
              <thead className="bg-surface/60 text-xs font-semibold uppercase tracking-wider text-charcoal-muted border-b border-earth/10">
                <tr>
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">City</th>
                  <th className="px-6 py-4">Intake Status</th>
                  <th className="px-6 py-4">Date Added</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-earth/10">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-serif font-medium text-earth text-base">{lead.name}</div>
                      <div className="text-[11px] text-charcoal-muted font-mono">ID: {lead.id.substring(0, 8)}...</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-earth">{lead.email}</div>
                      <div className="text-xs text-charcoal-muted">{lead.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium">{lead.city}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase ${
                          lead.status === "QUALIFIED"
                            ? "bg-emerald-100 text-emerald-700"
                            : lead.status === "NEW"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-surface text-earth"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-charcoal-muted">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(
                            lead.name
                          )},%20thank%20you%20for%20reaching%20out%20to%20Indian%20Minimalist%20Home%20Styling!`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors text-xs flex items-center gap-1"
                          title="WhatsApp Client"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`mailto:${lead.email}`}
                          className="p-2 rounded-xl bg-earth text-white hover:bg-earth/90 transition-colors text-xs flex items-center gap-1"
                          title="Email Client"
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-sm text-charcoal-muted">
            No leads match your search criteria.
          </div>
        )}
      </div>
    </div>
  );
}
