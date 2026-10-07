import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, database } from "./db.js";

export const auth = betterAuth({
  database: mongodbAdapter(database, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
      },
    },
  },

  // Trusted Origins- Vercel URL
  trustedOrigins: [
    process.env.CLIENT_URL || ,
    "http://localhost:5173",
  ],

  //  Vercel Cross-Site Cookie Fix 
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
    },
  },
});
