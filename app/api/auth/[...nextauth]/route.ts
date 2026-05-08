// import authHandler from "@/lib/auth";

// export { authHandler as GET, authHandler as POST };
import authHandler from "@/lib/auth";

// Force this route to be dynamic so it doesn't run during build time
export const dynamic = 'force-dynamic';

export { authHandler as GET, authHandler as POST };