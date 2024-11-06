import NextAuth from "next-auth";
import { authOptions } from "@/app/utils/authConfi";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };