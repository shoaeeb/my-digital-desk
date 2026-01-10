import Image from "next/image";
import styles from "./page.module.css";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import FeatureDragandDrop from "../components/FeatureDragandDrop";
import ReviewSection from "../components/ReviewSection";
import CTASection from "../components/CTASection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }
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
