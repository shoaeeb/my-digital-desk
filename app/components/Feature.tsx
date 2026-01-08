import styles from "./feature.module.css";
import { FaFolderOpen } from "react-icons/fa";
import { IoPencil } from "react-icons/io5";
import { CiLock } from "react-icons/ci";
const Feature = () => {
  return (
    <div className={styles.featureContainer}>
      <div className={styles.top}>
        <h1 className={styles.heading}>Simplify Your WorkFlow</h1>
        <p className={styles.subheading}>
          Everything you need to keep your thoughts organised and accessible
        </p>
      </div>
      <div className={styles.bottom}>
        <div className={styles.box}>
          <FaFolderOpen className={styles.icon} />
          <h3>Categorize Instantly</h3>
          <p>Create Custom buckets for work</p>
          <p>and passion projects. Keep</p>
          <p>Everything in right place</p>
        </div>
        <div className={styles.box}>
          <IoPencil className={styles.icon} />
          <h3>Focus Mode</h3>
          <p>A clean writing interface that gets</p>
          <p>Out of your.Just you and your</p>
          <p>Words</p>
        </div>
        <div className={styles.box}>
          <CiLock className={styles.icon} />
          <h3>Secure & Private</h3>
          <p>Your data belongs to you.We</p>
          <p>priotize your privacy above all else</p>
          <p>with encryption</p>
        </div>
      </div>
    </div>
  );
};
export default Feature;
