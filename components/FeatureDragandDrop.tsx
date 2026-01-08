import Image from "next/image";
import styles from "./featuredraganddrop.module.css";
import { MdDragIndicator } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const FeatureDragandDrop = () => {
  return (
    <div className={styles.featureContainer}>
      <div className={styles.leftSection}>
        <div className={styles.heading}>
          <MdDragIndicator className={styles.icon} />
          <h4>INTUITIVE CONTROL</h4>
        </div>
        <h1 className={styles.subheading}>Drag and Drop Organization</h1>
        <div className={styles.paragraph}>
          <p>Intuitively manage your tasks and notes by simply dragging them</p>
          <p>
            into the right categories.Reorganize your entire life in seconds,not
          </p>
          <p>hours</p>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <TiTick className={styles.iconTick} />
            <p>Smart Sorting</p>
          </div>
          <div className={styles.feature}>
            <TiTick className={styles.iconTick} />
            <p>Custom Tags</p>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <Image
          alt="heroImage"
          height={300}
          width={400}
          src={
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDa3dTv13Wd2s0EwkBX8ZiKpwEFOoZIGGXELIzFhqvyiDM_6OtGSTmNgOc5yuNefDEIcl0f5wqFZuw7xioihMF5AVtC17mEIBA2dxiPr6iVKGLF1n7CoytlJvuDu-IgWvsjWoevrGEb2N6p4qtJ0pCuHI1eNGcixPyk4WtxYAJhBuWy998oweBauSPQItKpX3-Q0vnatPs187dN58e9HtGdDH-TOdFj1jUD2BzwATym8IAiGUgJS7JGk3Xltt18ZUKV1og4PdYoZUnl"
          }
        />
      </div>
    </div>
  );
};

export default FeatureDragandDrop;
