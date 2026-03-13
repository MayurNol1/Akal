export const Roles = {
  USER: "USER",
  ADMIN: "ADMIN",
} as const;

export type Role = keyof typeof Roles;
