// import { prisma } from "./lib/prisma";
// import bcrypt from "bcryptjs";

// async function main() {
//   const email = "admin@tj-u-auto.com";
//   const password = "admin123";        // Change this to a strong password later

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const admin = await prisma.user.upsert({
//     where: { email },
//     update: {},
//     create: {
//       name: "System Admin",
//       email: email,
//       password: hashedPassword,
//       role: "ADMIN",
//       phone: "+254736889880",
//     },
//   });

//   console.log("✅ ADMIN ACCOUNT CREATED SUCCESSFULLY!");
//   console.log("====================================");
//   console.log("Email    :", admin.email);
//   console.log("Password :", password);
//   console.log("Role     : ADMIN");
//   console.log("====================================");
// }

// main()
//   .catch((e) => console.error(e))
//   .finally(() => process.exit());

import { prisma } from "./lib/prisma";
// Change this line:
import { hash } from "bcrypt-ts"; 

async function main() {
  const email = "admin@tj-u-auto.com";
  const password = "your-secure-password";

  // Change bcrypt.hash to just hash
  const hashedPassword = await hash(password, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password: hashedPassword,
      role: "ADMIN",
      name: "Admin User",
    },
  });

  console.log("Admin created:", admin);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());