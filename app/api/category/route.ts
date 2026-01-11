import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import Category from "@/lib/models/Category";

export async function GET(req: Request) {
  try {
    //get the categories of this user
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
    //fetch the categories of the user
    const categories = await Category.find({
      userId: user._id.toString(),
    });
    return NextResponse.json({
      success: true,
      message: "Fetched Categories Successfully",
      data: categories,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, data: [], message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
