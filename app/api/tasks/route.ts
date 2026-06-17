import connectDB from "@/lib/mongodb";
import Task from "@/models/Tasks";
import { verifyToken } from "@/lib/auth";

export async function GET(){
    try{
        await connectDB();

        const tasks = await Task.find().populate("createdBy", "name email");

        return Response.json(tasks);

    }catch(error){

        console.log(error);

        return Response.json(
            {message:"Failed to fetch tasks"},
            {status: 500}
        );
    }
}

export async function POST(request: Request){
    try{
        await connectDB();
        const authHeader = request.headers.get("authorization");

        if (!authHeader) {
            return Response.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        const user = verifyToken(token);

        if (!user) {
            return Response.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }
        const body = await request.json();

        const task = await Task.create({
            ...body,
            createdBy: (user as any).userId,
        });

        return Response.json(task,{status: 201});
    }catch(error){
        console.log(error);
        return Response.json(
            {message:"Failed to create task"},
            {status: 500}
        );
    }
}