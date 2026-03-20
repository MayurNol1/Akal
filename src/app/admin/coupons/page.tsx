import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

async function createCoupon(formData: FormData) {
  "use server";

  const code = String(formData.get("code") ?? "").trim().toUpperCase();
  const discount = Number(formData.get("discount") ?? 0);
  const expiryRaw = String(formData.get("expiresAt") ?? "").trim();

  if (!code || Number.isNaN(discount) || discount <= 0 || discount > 100) {
    return;
  }

  await prisma.coupon.create({
    data: {
      code,
      discount,
      expiresAt: expiryRaw ? new Date(expiryRaw) : null,
      isActive: true,
    },
  }).catch(() => null);

  revalidatePath("/admin/coupons");
}

async function toggleCoupon(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const current = await prisma.coupon.findUnique({ where: { id }, select: { isActive: true } });
  if (!current) return;

  await prisma.coupon.update({
    where: { id },
    data: { isActive: !current.isActive },
  });

  revalidatePath("/admin/coupons");
}

export default async function AdminCouponsPage() {
  const coupons = await prisma.coupon.findMany({
    orderBy: [{ isActive: "desc" }, { code: "asc" }],
  });

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 360px", gap: "16px", alignItems: "start" }}>
      <section style={{ background: "#161612", border: "1px solid rgba(37,226,244,0.14)", borderRadius: "14px", padding: "16px" }}>
        <div style={{ marginBottom: "14px" }}>
          <p style={{ margin: "0 0 8px", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(37,226,244,0.7)" }}>
            Promotions
          </p>
          <h1 style={{ margin: 0, fontFamily: "var(--font-serif), 'Cormorant Garamond', serif", fontSize: "30px", color: "#f0ede6" }}>
            Coupon <em style={{ color: "#25e2f4" }}>Manager</em>
          </h1>
        </div>

        <div style={{ display: "grid", gap: "10px" }}>
          {coupons.length === 0 ? (
            <p style={{ margin: 0, color: "rgba(160,155,135,0.55)", fontSize: "12px" }}>No coupons yet.</p>
          ) : (
            coupons.map((coupon) => {
              const isExpired = coupon.expiresAt ? new Date(coupon.expiresAt) < new Date() : false;
              return (
                <div
                  key={coupon.id}
                  style={{
                    borderRadius: "12px",
                    border: "1px solid rgba(37,226,244,0.12)",
                    background: "rgba(37,226,244,0.04)",
                    padding: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontSize: "14px", color: "#f0ede6", fontWeight: 700 }}>{coupon.code}</p>
                    <p style={{ margin: "4px 0 0", fontSize: "11px", color: "rgba(160,155,135,0.65)" }}>
                      {coupon.discount}% off
                      {coupon.expiresAt
                        ? ` | expires ${new Date(coupon.expiresAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}`
                        : " | no expiry"}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "10px",
                        fontWeight: 700,
                        color: isExpired ? "#f87171" : coupon.isActive ? "#25e2f4" : "rgba(160,155,135,0.7)",
                        border: isExpired
                          ? "1px solid rgba(248,113,113,0.4)"
                          : coupon.isActive
                            ? "1px solid rgba(37,226,244,0.4)"
                            : "1px solid rgba(160,155,135,0.35)",
                        background: isExpired
                          ? "rgba(248,113,113,0.08)"
                          : coupon.isActive
                            ? "rgba(37,226,244,0.08)"
                            : "rgba(160,155,135,0.08)",
                      }}
                    >
                      {isExpired ? "Expired" : coupon.isActive ? "Active" : "Paused"}
                    </span>
                    <form action={toggleCoupon}>
                      <input type="hidden" name="id" value={coupon.id} />
                      <button
                        type="submit"
                        style={{
                          border: "1px solid rgba(37,226,244,0.24)",
                          background: "transparent",
                          color: "#25e2f4",
                          padding: "6px 10px",
                          borderRadius: "8px",
                          fontSize: "11px",
                          cursor: "pointer",
                        }}
                      >
                        Toggle
                      </button>
                    </form>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <aside style={{ background: "#161612", border: "1px solid rgba(37,226,244,0.14)", borderRadius: "14px", padding: "16px" }}>
        <h2 style={{ margin: "0 0 10px", fontSize: "16px", color: "#f0ede6" }}>Create Coupon</h2>
        <form action={createCoupon} style={{ display: "grid", gap: "10px" }}>
          <label style={{ display: "grid", gap: "5px" }}>
            <span style={{ fontSize: "11px", color: "rgba(160,155,135,0.65)" }}>Code</span>
            <input
              name="code"
              required
              placeholder="MAHASHIV10"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                background: "rgba(37,226,244,0.04)",
                border: "1px solid rgba(37,226,244,0.2)",
                color: "#f0ede6",
                fontSize: "12px",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "5px" }}>
            <span style={{ fontSize: "11px", color: "rgba(160,155,135,0.65)" }}>Discount %</span>
            <input
              name="discount"
              type="number"
              min={1}
              max={100}
              required
              placeholder="10"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                background: "rgba(37,226,244,0.04)",
                border: "1px solid rgba(37,226,244,0.2)",
                color: "#f0ede6",
                fontSize: "12px",
              }}
            />
          </label>

          <label style={{ display: "grid", gap: "5px" }}>
            <span style={{ fontSize: "11px", color: "rgba(160,155,135,0.65)" }}>Expiry (optional)</span>
            <input
              name="expiresAt"
              type="date"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                background: "rgba(37,226,244,0.04)",
                border: "1px solid rgba(37,226,244,0.2)",
                color: "#f0ede6",
                fontSize: "12px",
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: "4px",
              border: "none",
              background: "#25e2f4",
              color: "#031416",
              fontWeight: 700,
              fontSize: "12px",
              borderRadius: "9px",
              padding: "10px 12px",
              cursor: "pointer",
            }}
          >
            Create Coupon
          </button>
        </form>
      </aside>
    </div>
  );
}
