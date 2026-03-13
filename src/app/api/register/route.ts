import { NextResponse } from "next/server";
import { AuthService } from "@/modules/auth/service";
import { RegisterSchema } from "@/modules/auth/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validation = RegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Invalid input fields", errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    try {
      const user = await AuthService.register({ name, email, password });
      
      return NextResponse.json(
        { 
          message: "User registered successfully", 
          user 
        },
        { status: 201 }
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "User with this email already exists") {
        return NextResponse.json(
          { message: err.message },
          { status: 409 }
        );
      }
      throw err;
    }

  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}
