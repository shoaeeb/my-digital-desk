import Image from "next/image";
import styles from "./hero.module.css";
const Hero = () => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.leftSection}>
        <div className={styles.heading}>
          <h1>Your Desk,</h1>
          <h1 className={styles.text}>Digitally</h1>
          <h1 className={styles.text}>Decluttered.</h1>
        </div>
        <div className={styles.subheading}>
          <p>
            The minimalist workspace for your personal notes and ideas. Create
            categories, stay organized, and focus on what matters most.
          </p>
        </div>
        <button className={styles.getStarted}>Get Started For Free</button>
      </div>
      <div className={styles.rightSection}>
        <div
          className={styles.imageSection}
          data-alt="Minimalist dashboard interface on a laptop screen with organized folders"
        >
          {/*  sizes="(max-width: 700px) 100vw, 400px" */}
          <Image
            className={styles.heroImage}
            alt="heroImage"
            height={300}
            width={400}
            src={
              "https://lh3.googleusercontent.com/aida-public/AB6AXuB8tOQKA6nIdO5rb5mJXwlEGmOrFpk1JbyCEGrFuD3pfSqRaqkZHOgBWGYUxot7rSlwk0AaQwToPmDyChIKqvQ9223YFoYkIXzZ1bVmDxk454L1g49KNbP9IucLE_4-r8KcSgoGni97EhpLdJcdIVAGyA3hUidVe87B_EReaR5UwkmwWBqybRklwyRb1VzbpqBggKCOjoVzCfDenKEl7jq295HyhMs5HSjj003mrJBmcJGrSqH3XTRf9nsl-JYHumNcv-32OZkINWmv"
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
