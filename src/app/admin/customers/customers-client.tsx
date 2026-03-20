"use client";

import { useMemo, useState } from "react";

export type CustomerRecord = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  ordersCount: number;
  lifetimeValue: number;
  lastOrderAt: string | null;
  latestStatus: string;
  segment: "VIP" | "Active" | "New" | "At Risk";
};

const segmentStyle: Record<CustomerRecord["segment"], { color: string; border: string; bg: string }> = {
  VIP: { color: "#25e2f4", border: "1px solid rgba(37,226,244,0.35)", bg: "rgba(37,226,244,0.09)" },
  Active: { color: "#48bb78", border: "1px solid rgba(72,187,120,0.35)", bg: "rgba(72,187,120,0.08)" },
  New: { color: "#d4a94a", border: "1px solid rgba(212,169,74,0.35)", bg: "rgba(212,169,74,0.08)" },
  "At Risk": { color: "#ff9933", border: "1px solid rgba(255,153,51,0.35)", bg: "rgba(255,153,51,0.08)" },
};

function formatDate(date: string | null) {
  if (!date) return "Never ordered";
  return new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function CustomersClient({ initialCustomers }: { initialCustomers: CustomerRecord[] }) {
  const [query, setQuery] = useState("");
  const [segment, setSegment] = useState<"All" | CustomerRecord["segment"]>("All");
  const [selected, setSelected] = useState<CustomerRecord | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return initialCustomers.filter((customer) => {
      const queryMatch =
        !q ||
        customer.name.toLowerCase().includes(q) ||
        customer.email.toLowerCase().includes(q) ||
        customer.id.toLowerCase().includes(q);
      const segmentMatch = segment === "All" || customer.segment === segment;
      return queryMatch && segmentMatch;
    });
  }, [initialCustomers, query, segment]);

  const counts = useMemo(() => {
    return initialCustomers.reduce(
      (acc, customer) => {
        acc[customer.segment] += 1;
        return acc;
      },
      { VIP: 0, Active: 0, New: 0, "At Risk": 0 } as Record<CustomerRecord["segment"], number>,
    );
  }, [initialCustomers]);

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <div>
        <p style={{ margin: "0 0 8px", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(37,226,244,0.7)" }}>
          Customer Intelligence
        </p>
        <h1 style={{ margin: 0, fontFamily: "var(--font-serif), 'Cormorant Garamond', serif", fontSize: "30px", color: "#f0ede6" }}>
          Customer <em style={{ color: "#25e2f4" }}>Segments</em>
        </h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "10px" }}>
        {(Object.keys(counts) as Array<CustomerRecord["segment"]>).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setSegment(key)}
            style={{
              textAlign: "left",
              borderRadius: "12px",
              border: segment === key ? "1px solid rgba(37,226,244,0.35)" : "1px solid rgba(37,226,244,0.13)",
              background: segment === key ? "rgba(37,226,244,0.08)" : "#161612",
              color: "#f0ede6",
              padding: "14px",
              cursor: "pointer",
            }}
          >
            <p style={{ margin: "0 0 6px", fontSize: "11px", color: "rgba(160,155,135,0.6)" }}>{key}</p>
            <p style={{ margin: 0, fontSize: "24px", fontWeight: 700 }}>{counts[key]}</p>
          </button>
        ))}
      </div>

      <div style={{ background: "#161612", border: "1px solid rgba(37,226,244,0.14)", borderRadius: "14px", padding: "14px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, email, or customer id..."
            style={{
              flex: 1,
              minWidth: "220px",
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(37,226,244,0.2)",
              background: "rgba(37,226,244,0.04)",
              color: "#f0ede6",
              fontSize: "12px",
            }}
          />
          <select
            value={segment}
            onChange={(e) => setSegment(e.target.value as "All" | CustomerRecord["segment"])}
            style={{
              padding: "10px 12px",
              borderRadius: "8px",
              border: "1px solid rgba(37,226,244,0.2)",
              background: "rgba(37,226,244,0.04)",
              color: "#f0ede6",
              fontSize: "12px",
            }}
          >
            <option value="All">All Segments</option>
            <option value="VIP">VIP</option>
            <option value="Active">Active</option>
            <option value="New">New</option>
            <option value="At Risk">At Risk</option>
          </select>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(37,226,244,0.12)" }}>
                {["Customer", "Segment", "Orders", "Lifetime Value", "Last Order", "Actions"].map((head) => (
                  <th
                    key={head}
                    style={{
                      textAlign: "left",
                      padding: "10px",
                      fontSize: "10px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "rgba(160,155,135,0.65)",
                    }}
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: "1px solid rgba(37,226,244,0.08)" }}>
                  <td style={{ padding: "12px 10px" }}>
                    <p style={{ margin: 0, color: "#f0ede6", fontSize: "12px", fontWeight: 700 }}>{customer.name}</p>
                    <p style={{ margin: "3px 0 0", color: "rgba(160,155,135,0.6)", fontSize: "11px" }}>{customer.email}</p>
                  </td>
                  <td style={{ padding: "12px 10px" }}>
                    <span
                      style={{
                        ...segmentStyle[customer.segment],
                        borderRadius: "999px",
                        fontSize: "10px",
                        fontWeight: 700,
                        padding: "4px 10px",
                      }}
                    >
                      {customer.segment}
                    </span>
                  </td>
                  <td style={{ padding: "12px 10px", color: "#f0ede6", fontSize: "12px" }}>{customer.ordersCount}</td>
                  <td style={{ padding: "12px 10px", color: "#f0ede6", fontSize: "12px", fontWeight: 700 }}>{formatCurrency(customer.lifetimeValue)}</td>
                  <td style={{ padding: "12px 10px", color: "rgba(160,155,135,0.65)", fontSize: "11px" }}>{formatDate(customer.lastOrderAt)}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <button
                      type="button"
                      onClick={() => setSelected(customer)}
                      style={{
                        border: "1px solid rgba(37,226,244,0.25)",
                        color: "#25e2f4",
                        background: "transparent",
                        borderRadius: "8px",
                        padding: "6px 10px",
                        fontSize: "11px",
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelected(null)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setSelected(null);
          }}
          style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.55)" }}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "380px",
              background: "#0f1718",
              borderLeft: "1px solid rgba(37,226,244,0.2)",
              padding: "16px",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <h2 style={{ margin: 0, color: "#f0ede6", fontSize: "18px" }}>Customer Detail</h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                style={{ border: "none", background: "transparent", color: "rgba(160,155,135,0.6)", cursor: "pointer" }}
              >
                Close
              </button>
            </div>
            <p style={{ margin: "0 0 4px", color: "#f0ede6", fontSize: "16px", fontWeight: 700 }}>{selected.name}</p>
            <p style={{ margin: "0 0 10px", color: "rgba(160,155,135,0.65)", fontSize: "12px" }}>{selected.email}</p>
            <div style={{ display: "grid", gap: "8px" }}>
              <DetailRow label="Segment" value={selected.segment} />
              <DetailRow label="Orders" value={String(selected.ordersCount)} />
              <DetailRow label="Lifetime Value" value={formatCurrency(selected.lifetimeValue)} />
              <DetailRow label="Last Order" value={formatDate(selected.lastOrderAt)} />
              <DetailRow label="Joined" value={formatDate(selected.createdAt)} />
              <DetailRow label="Latest Status" value={selected.latestStatus} />
              <DetailRow label="Customer ID" value={selected.id} />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: "1px solid rgba(37,226,244,0.12)", borderRadius: "10px", padding: "10px 12px", background: "rgba(37,226,244,0.04)" }}>
      <p style={{ margin: "0 0 4px", fontSize: "10px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(160,155,135,0.65)" }}>{label}</p>
      <p style={{ margin: 0, fontSize: "12px", color: "#f0ede6" }}>{value}</p>
    </div>
  );
}
