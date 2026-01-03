import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    trustedOrigins : [process.env.APP_URL!],
    user : {
      additionalFields : {
        role : {
          type : "string",
          defaultValue : "USER",
          required : false,
        },
        phone : {
          type : "string",
          required : false,
        },
        status : {
          type : "string",
          defaultValue : "ACTIVE",
          required : false
        }
      }
    },
    emailAndPassword: { 
      enabled: true,
      autoSignIn : false,
      requireEmailVerification : true
    }, 
    emailVerification: {
      sendVerificationEmail: async ( { user, url, token }, request) => {
         console.log("Verificationi email sent")
      },
    },
});