Complete SidebarToggle.tsx:

"use client";

import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import styles from "./page.module.css";

interface SidebarToggleProps {
children: React.ReactNode;
}

export default function SidebarToggle({ children }: SidebarToggleProps) {
const [sidebarOpen, setSidebarOpen] = useState(true);

return (

<div className={styles.mainContainer}>
<div className={`${styles.sidebar} ${!sidebarOpen ? styles.sidebarClosed : ''}`}>
<button
className={styles.toggleButton}
onClick={() => setSidebarOpen(!sidebarOpen)} >
{sidebarOpen ? <HiX /> : <HiMenuAlt3 />}
</button>
{sidebarOpen && <div>SideBar</div>}
</div>

      <div className={styles.noteContainer}>
        <h1>All Notes</h1>
        <p className={styles.subheading}>Manage your personal knowledge base</p>
        <div className={`${styles.emptyState} ${!sidebarOpen ? styles.emptyStateExpanded : ''}`}>
          {children}
        </div>
      </div>
    </div>

);
}
Dashboard page.tsx:
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import SidebarToggle from "./SidebarToggle";

function Dashboard() {
const notes = [];
const emptyState = notes.length === 0;

return (
<SidebarToggle>
{emptyState && (
<>
<Image
className={styles.emptyStateImage}
height={300}
width={400}
alt="Empty State"
src={
"https://lh3.googleusercontent.com/aida-public/AB6AXuAiOg5I5Tuc9v33Q8xrf0MxsAR0-N2OfSbHY4ExNIitlhzy0E18sYr-A118sX1pETflF4BEWdQmjHKFPaAsW3OTSeZEFf3Pj6BlZlfR9tRasWHk3fUKET-pibUa_R7cC2hIpw-mBnulwYjKSh6pWjXcBh_bJ15FTnT2tEcJ62sVpeDbzvBsBlkTOK48MwW0gLaC7g5JFe-YV5nqjE-uTfOv1Oc-hvdG4xIsUWGSeDilRZQC5MYTMKVDbXtHqsV-CWUzFnWi8oY1MUO6"
}
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
</>
)}
</SidebarToggle>
);
}

export default Dashboard;

css

.mainContainer {
height: 100vh;
display: flex;
gap: 5px;
}

.sidebar {
width: 300px;
height: 100%;
min-height: 100vh;
border-right: 1px solid black;
transition: width 0.3s ease;
padding: 10px;
}

.sidebarClosed {
width: 50px;
padding: 5px;
}

.toggleButton {
background: none;
border: none;
font-size: 20px;
padding: 10px;
cursor: pointer;
width: 100%;
text-align: left;
}

.noteContainer {
min-height: 100vh;
height: 100%;
padding: 20px 10px;
flex: 1;
}

.subheading {
color: grey;
}

.emptyState {
height: 100%;
width: 100%;
min-width: calc(100vw - 300px);
display: flex;
justify-content: center;
align-items: center;
margin-left: auto;
margin-right: auto;
border: 1px solid green;
flex-direction: column;
gap: 10px;
transition: min-width 0.3s ease;
}

.emptyStateExpanded {
min-width: calc(100vw - 50px);
}

.emptyStateImage {
height: auto !important;
width: 100% !important;
max-width: 300px;
}

.noNote {
text-align: center;
}

.info {
color: grey;
text-align: center;
}

.info span {
display: block;
}

.createIcon {
color: white;
}

.createLink {
text-decoration: none;
color: white;
display: flex;
gap: 5px;
align-items: center;
background-color: var(--primary);
padding: 10px 15px;
border-radius: 25px;
}
