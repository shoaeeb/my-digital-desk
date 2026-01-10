"use client";

import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import styles from "./page.module.css";

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

interface CategoryType {
  _id: string;
  name: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}

// TODO
// get the categories from the backend
const categories = [
  {
    _id: crypto.randomUUID(),
    name: "Finance",
    userId: "12354",
    color: CATEGORY_COLORS[0], // Blue
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: crypto.randomUUID(),
    name: "Work",
    userId: "12354",
    color: CATEGORY_COLORS[1], // Red
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: crypto.randomUUID(),
    name: "Personal",
    userId: "12354",
    color: CATEGORY_COLORS[2], // Green
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: crypto.randomUUID(),
    name: "Health",
    userId: "12354",
    color: CATEGORY_COLORS[3], // Yellow
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    _id: crypto.randomUUID(),
    name: "Learning",
    userId: "12354",
    color: CATEGORY_COLORS[4], // Purple
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

function SidebarToggle({ children }: SidebarToggleProps) {
  const [sidebaropen, setSidebarOpen] = useState(true);
  const [createCategoryModal, setCreateCategoryModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(CATEGORY_COLORS[0]);
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
              {categories.map((category: CategoryType) => {
                return (
                  <div
                    style={{ backgroundColor: category.color }}
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
              <button className={"createBtn"}>Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SidebarToggle;
