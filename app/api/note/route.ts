import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import Note from "@/lib/models/Note";

//searchparams
//page

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
          data: [],
        },
        { status: 401 }
      );
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Not Found", data: [] },
        { status: 404 }
      );
    }

    const url = new URL(req.url);
    const title = url.searchParams.get("title") || "";
    const content = url.searchParams.get("content") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = 5;
    const skip = (page - 1) * pageSize;

    // Build query with user filtering
    const query: any = { userId: user._id };

    // Add search filters if provided
    if (title && content) {
      query.$or = [
        { title: new RegExp(title, "i") },
        { content: new RegExp(content, "i") },
      ];
    } else if (title) {
      query.title = new RegExp(title, "i");
    } else if (content) {
      query.content = new RegExp(content, "i");
    }

    const notes = await Note.find(query)
      .populate("categoryId")
      .skip(skip)
      .limit(pageSize)
      .lean();
    const total = await Note.countDocuments(query);
    const pages = Math.ceil(total / pageSize);

    return NextResponse.json({
      success: true,
      message: "Notes Fetched Successfully",
      data: notes,
      pagination: {
        total,
        page,
        pages,
      },
    });
  } catch (error) {
    console.log("Get Notes Error:", error);
    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
