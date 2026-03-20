import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export default async function AdminAnalyticsPage() {
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const last30Days = new Date(now);
  last30Days.setDate(last30Days.getDate() - 29);
  last30Days.setHours(0, 0, 0, 0);

  const [ordersCount, usersCount, productsCount, revenueAgg, monthAgg, todaysOrders, recentOrders, topProducts] =
    await Promise.all([
      prisma.order.count(),
      prisma.user.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.aggregate({ _sum: { total: true }, where: { createdAt: { gte: monthStart } } }),
      prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
      prisma.order.findMany({
        where: { createdAt: { gte: last30Days } },
        select: { createdAt: true, total: true },
        orderBy: { createdAt: "asc" },
      }),
      prisma.orderItem.groupBy({
        by: ["productId"],
        _sum: { quantity: true },
        orderBy: { _sum: { quantity: "desc" } },
        take: 5,
      }),
    ]);

  const totalRevenue = Number(revenueAgg._sum.total ?? 0);
  const monthlyRevenue = Number(monthAgg._sum.total ?? 0);

  const productIds = topProducts.map((x) => x.productId);
  const products = productIds.length
    ? await prisma.product.findMany({
        where: { id: { in: productIds } },
        select: { id: true, name: true, price: true, stock: true },
      })
    : [];
  const productMap = new Map(products.map((p) => [p.id, p]));

  const dailyMap = new Map<string, number>();
  for (let i = 0; i < 30; i += 1) {
    const day = new Date(last30Days);
    day.setDate(last30Days.getDate() + i);
    dailyMap.set(day.toISOString().slice(0, 10), 0);
  }
  recentOrders.forEach((order) => {
    const key = new Date(order.createdAt).toISOString().slice(0, 10);
    const current = dailyMap.get(key) ?? 0;
    dailyMap.set(key, current + Number(order.total));
  });

  const chartPoints = Array.from(dailyMap.entries()).map(([key, value]) => ({
    key,
    day: new Date(key).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value,
  }));
  const maxValue = Math.max(...chartPoints.map((p) => p.value), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
        <div>
          <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(37,226,244,0.7)", margin: "0 0 8px" }}>
            Admin Analytics
          </p>
          <h1 style={{ margin: 0, fontFamily: "var(--font-serif), 'Cormorant Garamond', serif", fontSize: "30px", color: "#f0ede6" }}>
            Revenue <em style={{ color: "#25e2f4" }}>Insights</em>
          </h1>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: "14px" }}>
        {[
          { label: "Total Revenue", value: formatCurrency(totalRevenue), hint: "All time" },
          { label: "This Month", value: formatCurrency(monthlyRevenue), hint: "Current month" },
          { label: "Orders", value: String(ordersCount), hint: `${todaysOrders} today` },
          { label: "Users", value: String(usersCount), hint: `${productsCount} active products` },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: "#161612",
              border: "1px solid rgba(37,226,244,0.14)",
              borderRadius: "14px",
              padding: "16px",
            }}
          >
            <p style={{ margin: "0 0 8px", fontSize: "11px", color: "rgba(160,155,135,0.6)" }}>{card.label}</p>
            <p style={{ margin: "0 0 4px", fontSize: "24px", color: "#f0ede6", fontWeight: 700 }}>{card.value}</p>
            <p style={{ margin: 0, fontSize: "10px", color: "rgba(37,226,244,0.65)" }}>{card.hint}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "#161612", border: "1px solid rgba(37,226,244,0.14)", borderRadius: "14px", padding: "16px" }}>
        <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#f0ede6", fontWeight: 700 }}>Revenue (Last 30 Days)</p>
        <div style={{ height: "210px", display: "flex", alignItems: "flex-end", gap: "4px" }}>
          {chartPoints.map((point) => {
            const height = Math.max(4, Math.round((point.value / maxValue) * 180));
            return (
              <div
                key={point.key}
                title={`${point.day}: ${formatCurrency(point.value)}`}
                style={{
                  flex: 1,
                  height: `${height}px`,
                  borderRadius: "6px 6px 0 0",
                  background: "linear-gradient(180deg, rgba(37,226,244,0.9) 0%, rgba(37,226,244,0.25) 100%)",
                }}
              />
            );
          })}
        </div>
      </div>

      <div style={{ background: "#161612", border: "1px solid rgba(37,226,244,0.14)", borderRadius: "14px", padding: "16px" }}>
        <p style={{ margin: "0 0 12px", fontSize: "13px", color: "#f0ede6", fontWeight: 700 }}>Top Selling Products</p>
        <div style={{ display: "grid", gap: "8px" }}>
          {topProducts.length === 0 ? (
            <p style={{ margin: 0, fontSize: "12px", color: "rgba(160,155,135,0.55)" }}>No sales data yet.</p>
          ) : (
            topProducts.map((item) => {
              const product = productMap.get(item.productId);
              return (
                <div
                  key={item.productId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 12px",
                    borderRadius: "10px",
                    border: "1px solid rgba(37,226,244,0.12)",
                    background: "rgba(37,226,244,0.04)",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontSize: "12px", color: "#f0ede6" }}>{product?.name ?? "Unknown Product"}</p>
                    <p style={{ margin: "2px 0 0", fontSize: "10px", color: "rgba(160,155,135,0.55)" }}>
                      Stock: {product?.stock ?? 0} | Price: {formatCurrency(Number(product?.price ?? 0))}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#25e2f4",
                      border: "1px solid rgba(37,226,244,0.25)",
                      borderRadius: "999px",
                      padding: "4px 10px",
                    }}
                  >
                    {item._sum.quantity ?? 0} sold
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
