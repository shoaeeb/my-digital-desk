import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import Category from "@/lib/models/Category";
import { createorEditCategory } from "@/lib/noteEngine";
import mongoose from "mongoose";
// Category {
//     _id,
//     name,
//     userId,        // REQUIRED - user ownership
//     color,         // REQUIRED - visual organization
//     createdAt,     // REQUIRED - basic tracking
//     updatedAt,     // REQUIRED - basic tracking
//   }

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Not Found" },
        { status: 404 }
      );
    }
    const { name, color } = await req.json();
    if (!name || !color) {
      return NextResponse.json(
        { success: false, message: "Name and color are required" },
        { status: 400 }
      );
    }
    const { success, message } = await createorEditCategory(
      user._id,
      name,
      color,
      false
    ); //creating category so isEditing:false
    return NextResponse.json({ success, message }, { status: 201 });
  } catch (error) {
    console.log("Create Category Error");
    console.log(error);
    if ((error as any).code === 11000) {
      return NextResponse.json(
        { success: false, message: "Category name already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    ); //internal server error
  }
}
