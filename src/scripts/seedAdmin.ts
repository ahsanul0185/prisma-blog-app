import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
    try {
        console.log("********* Seeding admin started **********")
        const adminData = {
            name : "Admin",
            email : "admin@mail.com",
            role : UserRole.ADMIN,
            password : "admin1234",
            emailVerified : true
        }
        
        console.log("********* Checking existing admin email **********")
        
        const existingUser = await prisma.user.findUnique({
            where : {
                email : adminData.email
            }
        })

        if (existingUser) {
            throw new Error("User already exists")
        }



        const signupAdmin = await fetch(`http://localhost:3000/api/auth/sign-up/email`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(adminData)
        })

        if (signupAdmin.ok) {
        console.log("********* Admin created **********")

            await prisma.user.update({
                where : {
                    email : adminData.email
                },
                data : {
                    emailVerified : true
                }
            })

        console.log("********* Email verification status updated **********")

        }

        console.log("********* SUCCESS **********")


    } catch (error) {
        console.error(error);
    }
}

seedAdmin()