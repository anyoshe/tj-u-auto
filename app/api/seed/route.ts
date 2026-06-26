// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma"; // Adjust path if your prisma file is elsewhere
// import { hash } from "bcrypt-ts";

// export async function GET() {
//   const email = "admin@tj-u-auto.com";
//   const password = "admin123";

//   try {
//     // 1. Check if the user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json({
//         message: "Admin account already exists in database!",
//         user: { email: existingUser.email, role: existingUser.role },
//       });
//     }

//     // 2. Hash the password using your unified bcrypt-ts tool
//     const hashedPassword = await hash(password, 10);

//     // 3. Upsert/Create the Admin Profile matching your schema perfectly
//     const admin = await prisma.user.create({
//       data: {
//         name: "System Admin",
//         email: email,
//         password: hashedPassword,
//         role: "ADMIN", // Matches your schema enum 'Role'
//         phone: "+254736889880",
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       message: "✅ ADMIN ACCOUNT CREATED SUCCESSFULLY!",
//       data: {
//         email: admin.email,
//         role: admin.role,
//         name: admin.name,
//       },
//     });

//   } catch (error: any) {
//     console.error("Seeding Error Details:", error);
//     return NextResponse.json(
//       { success: false, error: error.message || "An error occurred during database injection." },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 
import { hash } from "bcrypt-ts";

export async function GET() {
  const email = "admin@tj-u-auto.com";
  const password = "admin123"; // Dev password

  try {
    const hashedPassword = await hash(password, 10);

    // Group the admin data fields together
    const adminData = {
      name: "System Admin",
      password: hashedPassword,
      role: "ADMIN" as const,
      phone: "+254 721 222 585", // If you change this number in the future, hitting the URL updates it!
    };

    // Use upsert to handle both creation and updates safely
    const admin = await prisma.user.upsert({
      where: { email },
      update: {
        name: adminData.name,
        password: adminData.password,
        role: adminData.role,
        phone: adminData.phone,
      },
      create: {
        email,
        ...adminData,
      },
    });

    return NextResponse.json({
      success: true,
      message: "✅ ADMIN ACCOUNT SYNCED SUCCESSFULLY VIA BROWSER!",
      data: {
        email: admin.email,
        role: admin.role,
        name: admin.name,
        phone: admin.phone,
      },
    });

  } catch (error: any) {
    console.error("Browser Seeding Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An error occurred during database sync." },
      { status: 500 }
    );
  }
}