"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";

interface Note {
  _id: string;
  title: string;
  content: string;
  categoryId: {
    color: string;
    name: string;
    userId: string;
    createdAt: string;
  };
  createdAt: string;
}

interface Pagination {
  total: number;
  page: number;
  pages: number;
}

interface Props {
  initialNotes: Note[];
  pagination?: Pagination | null;
  searchParams: any;
}

export default function SearchAndNotes({
  initialNotes,
  pagination,
  searchParams,
}: Props) {
  const router = useRouter();
  const [searchTitle, setSearchTitle] = useState(searchParams.title || "");
  const [searchContent, setSearchContent] = useState(
    searchParams.content || ""
  );
  console.log(initialNotes);
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchTitle) params.set("title", searchTitle);
    if (searchContent) params.set("content", searchContent);
    params.set("page", "1"); //reset to first page
    router.push(`/dashboard?${params}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (searchTitle) params.set("title", searchTitle);
    if (searchContent) params.set("content", searchContent);
    params.set("page", page.toString());
    router.push(`/dashboard?${params}`);
  };
  return (
    <div className={styles.searchAndNotesContainer}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by tite..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className={styles.searchInputTitle}
        />
        <input
          type="text"
          placeholder="Search By Content..."
          value={searchContent}
          onChange={(e) => setSearchContent(e.target.value)}
          className={styles.searchInputContent}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
      <div className={styles.noteGridContainer}>
        {initialNotes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
      {/* pagination */}
      {pagination && pagination.pages > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  backgroundColor:
                    page === pagination.page ? "#007bff" : "#f8f9fa",
                  color: page === pagination.page ? "white" : "#333",
                }}
                className={styles.paginationBtn}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}

function NoteCard({ note }: { note: Note }) {
  const truncateContent = (content: string, maxLength: number) => {
    return content.length > maxLength
      ? content.substring(0, maxLength) + "..."
      : content;
  };

  return (
    <div className={styles.noteDivContainer}>
      <h3 className={styles.noteTitle}>{note.title}</h3>
      <p className={styles.noteContentPreview}>
        {truncateContent(note.content, 56)}
      </p>
      <div className={styles.noteInfoPreview}>
        <span>
          {new Date(note.createdAt).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>{" "}
        <div
          style={{
            color: "white",
            padding: "8px 16px",
            background: note.categoryId?.color || "",
          }}
        >
          {note.categoryId.name}
        </div>
      </div>
    </div>
  );
}
