import { AuthRepository } from "./repository";
import { RegisterInput } from "./validation";
import { hashPassword } from "@/lib/auth-utils";

export class AuthService {
  static async register(input: RegisterInput) {
    const existingUser = await AuthRepository.findUserByEmail(input.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await hashPassword(input.password);

    const user = await AuthRepository.createUser({
      ...input,
      password: hashedPassword,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }

  static async findUserByEmail(email: string) {
    return AuthRepository.findUserByEmail(email);
  }
}
