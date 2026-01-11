import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/lib/models/User";
import { createorEditCategory } from "@/lib/noteEngine";

//edit categories

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
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const { name, color } = await req.json();

    if (!name || !color) {
      return NextResponse.json(
        {
          success: false,
          message: "Name and Color are required",
        },
        { status: 400 }
      );
    }
    const { success, message } = await createorEditCategory(
      user._id.toString(),
      name,
      color,
      true
    );

    return NextResponse.json(
      { success, message },
      { status: success ? 200 : 400 }
    );
  } catch (error) {
    console.log("Edit Category Error");
    console.log(error);

    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    ); //internal server error
  }
}
