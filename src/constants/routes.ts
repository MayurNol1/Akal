export const Routes = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PRODUCTS: "/products",
  CART: "/cart",
  CHECKOUT: "/checkout",
  DASHBOARD: "/dashboard",
  ORDERS: "/orders",
  ADMIN: {
    DASHBOARD: "/admin",
    PRODUCTS: "/admin/products",
    CREATE_PRODUCT: "/admin/products/create",
    EDIT_PRODUCT: (id: string) => `/admin/products/edit/${id}`,
    ORDERS: "/admin/orders",
  },
} as const;
