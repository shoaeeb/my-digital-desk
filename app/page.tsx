import Image from "next/image";
import styles from "./page.module.css";
import Hero from "./components/Hero";
import Feature from "./components/Feature";
import FeatureDragandDrop from "./components/FeatureDragandDrop";
import ReviewSection from "./components/ReviewSection";
import CTASection from "./components/CTASection";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <Hero />
      <Feature />
      <FeatureDragandDrop />
      <ReviewSection />
      <CTASection />
    </div>
  );
}
