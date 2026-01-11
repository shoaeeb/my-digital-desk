import connectDB from "./mongodb";
import Category from "@/lib/models/Category";
import Note from "@/lib/models/Note";

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
//categoryId, content, title
export async function createorEditNotes(
  userId: string,
  title: string,
  categoryId: string,
  isEditing: boolean,
  content: string,
  noteId: string | undefined
) {
  await connectDB();
  //check if the category exists or not
  const category = await Category.findOne({
    userId,
    _id: categoryId,
  });
  //check if the category exists or
  if (!category) {
    return { success: false, message: "Category does not exists" };
  }
  if (isEditing && noteId) {
    const existingNote = await Note.findOne({
      userId,
      categoryId,
      _id: noteId,
    });
    existingNote.content = content;
    existingNote.title = title;
    await existingNote.save();
    return { success: true, message: "Note Edited Successfully" };
  }
  if (!isEditing) {
    //create the note
    const newNote = await Note.create({
      userId,
      categoryId,
      content,
      title,
    });
    return { success: true, message: "Note created Successfully" };
  }
  return { success: false, message: "Failed to create/edit Note" };
}
