import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Adjust path if your prisma file is elsewhere
import { hash } from "bcrypt-ts";

export async function GET() {
  const email = "admin@tj-u-auto.com";
  const password = "admin123";

  try {
    // 1. Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "Admin account already exists in database!",
        user: { email: existingUser.email, role: existingUser.role },
      });
    }

    // 2. Hash the password using your unified bcrypt-ts tool
    const hashedPassword = await hash(password, 10);

    // 3. Upsert/Create the Admin Profile matching your schema perfectly
    const admin = await prisma.user.create({
      data: {
        name: "System Admin",
        email: email,
        password: hashedPassword,
        role: "ADMIN", // Matches your schema enum 'Role'
        phone: "+254736889880",
      },
    });

    return NextResponse.json({
      success: true,
      message: "✅ ADMIN ACCOUNT CREATED SUCCESSFULLY!",
      data: {
        email: admin.email,
        role: admin.role,
        name: admin.name,
      },
    });

  } catch (error: any) {
    console.error("Seeding Error Details:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An error occurred during database injection." },
      { status: 500 }
    );
  }
}