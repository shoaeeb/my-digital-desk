import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import { createorEditNotes } from "@/lib/noteEngine";
import mongoose from "mongoose";
//check user is authenticated or not
//check if the category exists for that user
//check whether we need to create /edit a note
//create a note
//save to database

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User Not Found",
        },
        { status: 404 }
      );
    }
    const { categoryId, content, title } = await req.json();
    if (!categoryId || !content || !title) {
      return NextResponse.json(
        {
          success: false,
          message: "CategoryId, content and title are required",
        },
        { status: 400 }
      );
    }
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return NextResponse.json(
        { success: false, message: "Invalid category ID" },
        { status: 400 }
      );
    }
    const userId = user._id?.toString()!;
    //   userId: string,
    //   title: string,
    //   categoryId: string,
    //   isEditing: boolean,
    //   content: string,
    //   noteId: string | undefined
    const { success, message } = await createorEditNotes(
      userId,
      title,
      categoryId,
      false,
      content,
      undefined
    );
    return NextResponse.json(
      { success, message },
      { status: success ? 201 : 400 }
    ); //note created Succesfully
  } catch (error) {
    console.log("Note create API POST ROUTE");
    console.log(error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
