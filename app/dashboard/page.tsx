import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { IoIosAddCircle } from "react-icons/io";
import SidebarToggle from "./SidebarToggle";
//https://lh3.googleusercontent.com/aida-public/AB6AXuAiOg5I5Tuc9v33Q8xrf0MxsAR0-N2OfSbHY4ExNIitlhzy0E18sYr-A118sX1pETflF4BEWdQmjHKFPaAsW3OTSeZEFf3Pj6BlZlfR9tRasWHk3fUKET-pibUa_R7cC2hIpw-mBnulwYjKSh6pWjXcBh_bJ15FTnT2tEcJ62sVpeDbzvBsBlkTOK48MwW0gLaC7g5JFe-YV5nqjE-uTfOv1Oc-hvdG4xIsUWGSeDilRZQC5MYTMKVDbXtHqsV-CWUzFnWi8oY1MUO6
function Dashboard() {
  const notes = [];
  const emptyState = notes.length === 0; //if no notes display emptyState
  return (
    <SidebarToggle>
      {" "}
      {emptyState && (
        <div className={styles.emptyState}>
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
            {" "}
            Capture your ideas, daily tasks, or meeting minutes here Get{" "}
            <span>started by creating a new note now. </span>
          </p>
          <Link className={styles.createLink} href={"/create"}>
            <IoIosAddCircle size={40} className={styles.createIcon} />
            Create your First Note
          </Link>
        </div>
      )}
    </SidebarToggle>
  );
}

export default Dashboard;
