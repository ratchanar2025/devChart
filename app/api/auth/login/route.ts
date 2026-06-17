import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        await connectDB();

        const { email, password } = await request.json();

        const user = await User.findOne({ email });

        if (!user) {
            return Response.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return Response.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Generate safe fallback if role field is missing in old database documents
        const userRole = user.role || (email.toLowerCase().includes('admin') ? 'admin' : 'member');

        const token = jwt.sign(
            {
                userId: user._id,
                role: userRole,
            },
            (process.env.JWT_SECRET || "fallback_secret_key_2026") as string,
            {
                expiresIn: "7d",
            }
        );

        return Response.json({
            message: "Login successful",
            token,
            role: userRole, // Sent explicitly for frontend state processing
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: userRole,
            },
        });
    } catch (error) {
        console.error("Backend Auth Error Window:", error);

        // Safe JSON response so the client never hits a HTML parsing error again
        return Response.json(
            { message: "Internal Server Authentication Failure" },
            { status: 500 }
        );
    }
}