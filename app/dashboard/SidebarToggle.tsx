"use client";

import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import styles from "./page.module.css";
import { CategoryType } from "../constants/constants";
import { useRouter } from "next/navigation";

interface SidebarToggleProps {
  children: React.ReactNode;
}

const CATEGORY_COLORS = [
  "#3b82f6", // Blue
  "#ef4444", // Red
  "#10b981", // Green
  "#f59e0b", // Yellow
  "#8b5cf6", // Purple
  "#f97316", // Orange
  "#06b6d4", // Cyan
  "#84cc16", // Lime
];

// TODO
// get the categories from the backend
// const categories = [
//   {
//     _id: crypto.randomUUID(),
//     name: "Finance",
//     userId: "12354",
//     color: CATEGORY_COLORS[0], // Blue
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   },
//   {
//     _id: crypto.randomUUID(),
//     name: "Work",
//     userId: "12354",
//     color: CATEGORY_COLORS[1], // Red
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   },
//   {
//     _id: crypto.randomUUID(),
//     name: "Personal",
//     userId: "12354",
//     color: CATEGORY_COLORS[2], // Green
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   },
//   {
//     _id: crypto.randomUUID(),
//     name: "Health",
//     userId: "12354",
//     color: CATEGORY_COLORS[3], // Yellow
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   },
//   {
//     _id: crypto.randomUUID(),
//     name: "Learning",
//     userId: "12354",
//     color: CATEGORY_COLORS[4], // Purple
//     createdAt: Date.now(),
//     updatedAt: Date.now(),
//   },
// ];

function SidebarToggle({ children }: SidebarToggleProps) {
  const [sidebaropen, setSidebarOpen] = useState(true);
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(CATEGORY_COLORS[0]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const router = useRouter();
  //get all the categories on first reload;

  useEffect(() => {
    async function getAllCategories() {
      try {
        const response = await fetch("/api/category", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        });
        const { data } = await response.json();
        setCategories(data);
      } catch (error) {
        console.log(error);
        alert("Failed to get Categories");
      }
    }
    getAllCategories();
  }, []);

  async function handleEditCategory() {
    console.log("clicked");
    const name = categoryTitle;
    const color = selectedColor;
    setLoading(true);
    try {
      const response = await fetch("/api/category/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color }),
      });
      const { success, message } = await response.json();

      if (success) {
        alert(message);
        setEditCategoryModal(false);
        setCategoryTitle("");
        // Refetch categories
        const categoriesResponse = await fetch("/api/category");
        const { data } = await categoriesResponse.json();
        setCategories(data);
      } else {
        // ADD THIS ELSE BLOCK
        alert(message || "Failed to edit category");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to Edit category. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCategory() {
    if (!categoryTitle.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/category/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: categoryTitle, color: selectedColor }),
      });

      const { message, success } = await response.json();

      if (success) {
        alert(message);
        setCreateCategoryModal(false);
        setCategoryTitle("");
        // Refetch categories
        const categoriesResponse = await fetch("/api/category");
        const { data } = await categoriesResponse.json();
        setCategories(data);
      } else {
        // ADD THIS ELSE BLOCK
        alert(message || "Failed to Add Category");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const findCategoryColor = () => {
    return categories.find((item) => item._id.toString() === selectedCategoryId)
      ?.color;
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div
          className={`${styles.sidebar} ${
            !sidebaropen ? styles.sidebarClosed : ""
          }`}
        >
          <button
            className={styles.toggleButton}
            onClick={() => setSidebarOpen(!sidebaropen)}
          >
            {sidebaropen ? (
              <HiX className={styles.icon} />
            ) : (
              <HiMenuAlt3 className={styles.icon} />
            )}
          </button>
          {/* TODO Sidebar */}
          {sidebaropen && (
            <div className={styles.sidebarContent}>
              <h3 className={styles.categoryText}>Categories</h3>
              <button
                onClick={() => {
                  router.push("/create");
                }}
              >
                Create Note
              </button>
              <button
                onClick={() => setEditCategoryModal(true)}
                className={styles.editCategoryBtn}
              >
                <FaEdit size={20} className={styles.createIcon} />
                Edit Category
              </button>
              {categories.map((category: CategoryType) => {
                return (
                  <div
                    style={{
                      cursor: "pointer",
                      backgroundColor: category.color,
                    }}
                    className={styles.categoryItem}
                    key={category._id}
                  >
                    {category.name}
                  </div>
                );
              })}
              <button
                onClick={() => setCreateCategoryModal(true)}
                className={styles.createCategoryBtn}
              >
                <IoIosAddCircle size={20} className={styles.createIcon} />
                Add Category
              </button>
            </div>
          )}
        </div>
        <div className={styles.noteContainer}>
          <h1>All Notes</h1>
          <p className={styles.subheading}>
            Manage your personal knowledge base.
          </p>

          <div
            className={`${styles.emptyState} ${
              !sidebaropen ? styles.emptyStateExpanded : ""
            }`}
          >
            {children}
          </div>
        </div>
      </div>
      {createCategoryModal && (
        <div className={"modalOverlay"}>
          <div className={"modalContent"}>
            <h2>Create New Category</h2>
            <input
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value.trim())}
              type="text"
              placeholder="Category name"
              className={"modalInput"}
            />
            <div className={"colorPicker"}>
              {CATEGORY_COLORS.map((color) => (
                <div
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`colorOption ${
                    selectedColor === color ? "selectedColor" : ""
                  }`}
                  key={color}
                ></div>
              ))}
            </div>
            <div className={"modalActions"}>
              <button
                className={"cancelBtn"}
                onClick={() => setCreateCategoryModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCategory}
                className={"createBtn"}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
      {editCategoryModal && (
        <div className={"modalOverlay"}>
          <div className={"modalContent"}>
            <h2>Edit Category</h2>
            <input
              value={categoryTitle}
              onChange={(e) => setCategoryTitle(e.target.value.trim())}
              type="text"
              placeholder="Category name"
              className={"modalInput"}
            />
            <div className={"colorPicker"}>
              {CATEGORY_COLORS.map((color) => (
                <div
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`colorOption ${
                    selectedColor === color ? "selectedColor" : ""
                  }`}
                  key={color}
                ></div>
              ))}
            </div>
            <div className={"modalActions"}>
              <button
                className={"cancelBtn"}
                onClick={() => setEditCategoryModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={handleEditCategory}
                className={"createBtn"}
                disabled={loading}
              >
                {loading ? "Editing..." : "Edit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SidebarToggle;
