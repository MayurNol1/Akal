import prisma from "@/lib/prisma";
import { RegisterInput } from "./validation";

export class AuthRepository {
  static async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async createUser(data: RegisterInput & { password: string; role?: string }) {
    return prisma.user.create({
      data: {
        ...data,
        role: (data.role as any) || "USER",
      },
    });
  }
}
