import Link from "next/link";
import styles from "./cta.module.css";

const CTASection = () => {
  return (
    <div className={styles.CTAContainer}>
      <div className={styles.CTAaction}>
        <h1 className={styles.heading}>Ready to clear your mind?</h1>
        <p className={styles.info}>
          Join a thousand of users who have switched to a{" "}
          <span>simpler, more organized digital life.</span>
        </p>
        <div className={styles.action}>
          <button className={styles.getStarted}>Get Started Free</button>
          <Link href={"/pricing"} className={styles.pricing}>
            View Pricing
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
