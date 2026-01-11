"use client";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
import { CategoryType } from "../constants/constants";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// create a new note
//call an API

const CreatePage = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [SelectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      ["link"],
      ["code-block"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  const handleBack = () => {
    router.back(); ///go to previous page;
  };
  const findCategoryColor = () => {
    return categories.find((item) => item._id.toString() === SelectedCategoryId)
      ?.color;
  };
  const handleSubmit = async () => {
    //TODO:API Call
    if (!SelectedCategoryId || !content || !title) {
      alert("All fields are required");
      return;
    }
    console.log(SelectedCategoryId);
    console.log(content);
    console.log(title);
    try {
      const response = await fetch("/api/note/create", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          content,
          title,
          categoryId: SelectedCategoryId,
        }),
      });
      const { message, success } = await response.json();
      if (success) {
        alert(message);
        //note create successfully
      } else {
        alert(message || "Failed to create note");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //get all the categories of the User
  useEffect(() => {
    const getAllCategories = async () => {
      const response = await fetch("/api/category", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });
      const { data } = await response.json();
      setCategories(data);
      if (data.length === 0) {
        alert("Before Creating a Note . Pls Create a category from dashboard");
        router.push("/dashboard");
      }
    };
    getAllCategories();
  }, []);
  return (
    <>
      <div className={"create-navbar"}>
        <div className={"title-action"}>
          <IoIosArrowRoundBack
            style={{ cursor: "pointer" }}
            onClick={handleBack}
            size={30}
          />
          <h1>New Entry</h1>
        </div>

        <div className={"actions"}>
          <button className={"note-cancel"} onClick={handleBack}>
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className={"note-save"}
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </div>
      <div className={"editor-container"}>
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="title-input"
        />
        <select
          style={{ backgroundColor: findCategoryColor() || "" }}
          className={"select"}
          value={SelectedCategoryId || ""}
          onChange={(e) => {
            setSelectedCategoryId(e.target.value || null);
          }}
        >
          <option value="">Select a category</option>
          {categories.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
        <ReactQuill
          formats={formats}
          value={content}
          theme="snow"
          onChange={setContent}
          modules={modules}
          placeholder="Start writing your note..."
        />
      </div>
    </>
  );
};

export default CreatePage;
