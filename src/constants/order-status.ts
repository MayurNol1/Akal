export const OrderStatus = {
  PENDING: "PENDING",
  PAID: "PAID",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
} as const;

export type OrderStatusType = keyof typeof OrderStatus;

export const OrderStatusLabels: Record<OrderStatusType, string> = {
  PENDING: "Transcending",
  PAID: "Manifesting",
  SHIPPED: "Vibrating",
  DELIVERED: "Manifested",
  CANCELLED: "Returned to Source",
};
