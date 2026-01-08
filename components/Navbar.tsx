"use client";
import Link from "next/link";
import { LogoSvg } from "../app/constants/constants";
import styles from "./navbar.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <LogoSvg size="30px" />
        <h5>My Digital Desk</h5>
      </div>
      {/* Desktop Actions */}
      <div className={styles.actions}>
        <div className={styles.links}>
          <Link className={styles.link} href={"/features"}>
            Features
          </Link>
          <Link className={styles.link} href={"/pricing"}>
            Pricing
          </Link>
          <Link className={styles.link} href={"/about"}>
            About
          </Link>
        </div>
        <div className={styles.buttons}>
          <button className={styles.getStarted}>Get Started</button>
          <button
            onClick={() => {
              console.log("clicked");
              router.push("/login");
            }}
            className={styles.signIn}
          >
            Sign In
          </button>
        </div>
      </div>
      {/* mobile Actions */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={styles.menuButton}
      >
        ☰
      </button>
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <Link className={styles.mobileLink} href={"/features"}>
            Features
          </Link>
          <Link className={styles.mobileLink} href={"/pricing"}>
            Pricing
          </Link>
          <Link className={styles.mobileLink} href={"/about"}>
            About
          </Link>
          <button
            onClick={() => {
              console.log("clicked");
              router.push("/login");
            }}
            className={styles.mobileSignIn}
          >
            Sign In
          </button>
          <button className={styles.mobileGetStarted}>Get Started</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
