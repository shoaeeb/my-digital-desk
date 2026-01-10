"use client";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useRouter } from "next/navigation";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// create a new note
//call an API
const CreatePage = () => {
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
          <button className={"note-cancel"}>Cancel</button>
          <button className={"note-save"}>Save Changes</button>
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
