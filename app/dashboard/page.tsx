// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import SidebarToggle from "./SidebarToggle";
import SearchAndNotes from "./SearchAndNotes";

interface SearchParams {
  title?: string;
  content?: string;
  page?: string;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Build API URL with search params
  const params = new URLSearchParams();
  if (searchParams.title) params.set("title", searchParams.title);
  if (searchParams.content) params.set("content", searchParams.content);
  params.set("page", searchParams.page || "1");

  // Get cookies for authentication
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  // Fetch notes server-side with cookies
  let notesData = { data: [], pagination: null };

  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL}/api/note?${params}`,
      {
        cache: "no-store",
        headers: {
          Cookie: cookieHeader, // Pass cookies for authentication
        },
      }
    );

    if (response.ok) {
      notesData = await response.json();
    } else {
      console.error("API Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Failed to fetch notes:", error);
  }

  const notes = notesData.data || [];
  const emptyState = notes.length === 0;

  return (
    <SidebarToggle>
      {emptyState && (
        <div className={styles.emptyState}>
          <Image
            className={styles.emptyStateImage}
            height={300}
            width={400}
            alt="Empty State"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiOg5I5Tuc9v33Q8xrf0MxsAR0-N2OfSbHY4ExNIitlhzy0E18sYr-A118sX1pETflF4BEWdQmjHKFPaAsW3OTSeZEFf3Pj6BlZlfR9tRasWHk3fUKET-pibUa_R7cC2hIpw-mBnulwYjKSh6pWjXcBh_bJ15FTnT2tEcJ62sVpeDbzvBsBlkTOK48MwW0gLaC7g5JFe-YV5nqjE-uTfOv1Oc-hvdG4xIsUWGSeDilRZQC5MYTMKVDbXtHqsV-CWUzFnWi8oY1MUO6"
          />
          <h1 className={styles.noNote}>You haven't created any Notes yet</h1>
          <p className={styles.info}>
            Capture your ideas, daily tasks, or meeting minutes here Get{" "}
            <span>started by creating a new note now. </span>
          </p>
          <Link className={styles.createLink} href={"/create"}>
            <IoIosAddCircle size={40} className={styles.createIcon} />
            Create your First Note
          </Link>
        </div>
      )}

      {!emptyState && (
        <SearchAndNotes
          initialNotes={notes}
          pagination={notesData.pagination || { total: 0, page: 1, pages: 0 }}
          searchParams={searchParams}
        />
      )}
    </SidebarToggle>
  );
}
