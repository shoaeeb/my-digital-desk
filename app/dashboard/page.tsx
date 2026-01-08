"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to Your Dashboard</h1>
      <div style={{ margin: "20px 0" }}>
        <img
          src={session.user?.image || ""}
          alt="Profile"
          style={{ borderRadius: "50%", width: "80px", height: "80px" }}
        />
        <h2>Hello, {session.user?.name}!</h2>
        <p>{session.user?.email}</p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        style={{
          padding: "10px 20px",
          backgroundColor: "#dc3545",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
