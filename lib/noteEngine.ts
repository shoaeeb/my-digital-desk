import connectDB from "./mongodb";
import Category from "@/lib/models/Category";

export async function createorEditCategory(
  userId: string,
  name: string,
  color: string,
  isEditing: boolean
) {
  await connectDB();
  if (isEditing) {
    const existingCategory = await (Category as any).findOne({ userId, name });
    console.log(existingCategory);
    if (!existingCategory) {
      return {
        success: false,
        message: "No Category with that name exists",
      };
    }
    existingCategory.name = name;
    existingCategory.color = color;
    await existingCategory.save();
    return {
      success: true,
      data: existingCategory,
      message: "Category Editted Successfully",
    };
  }
  if (!isEditing) {
    const newCategory = await Category.create({
      userId,
      name,
      color,
    });

    return {
      data: newCategory,
      success: true,
      message: "Category Created Successfully",
    };
  }
  return { success: false, message: "Internal Server Error" };
}
