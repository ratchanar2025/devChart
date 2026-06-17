import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
    try {
        await connectDB();

        const { name, email, password } =
            await request.json();

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            return Response.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return Response.json(
            {
                message: "User registered",
                user,
            },
            { status: 201 }
        );
    } catch (error) {
        console.log(error);

        return Response.json(
            { message: "Registration failed" },
            { status: 500 }
        );
    }
}