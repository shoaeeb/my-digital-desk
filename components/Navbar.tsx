"use client";
import Link from "next/link";
import { LogoSvg } from "../app/constants/constants";
import styles from "./navbar.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, status } = useSession();
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
        {status !== "loading" && status == "authenticated" && (
          <div className={styles.profile}>
            <div>
              <h3>{session.user?.name}</h3>
              <p className={styles.emailAddress}> {session.user?.email}</p>
            </div>
            <Image
              className={styles.profilePic}
              src={session.user?.image!}
              alt="User Profile Pic"
              height={40}
              width={40}
            />
          </div>
        )}
        <div className={styles.buttons}>
          {status !== "loading" && status === "unauthenticated" && (
            <button className={styles.getStarted}>Get Started</button>
          )}
          {status !== "loading" && status == "unauthenticated" && (
            <button
              onClick={() => {
                console.log("clicked");
                router.push("/login");
              }}
              className={styles.signIn}
            >
              Sign In
            </button>
          )}
          {status !== "loading" && status === "authenticated" && (
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className={styles.signIn}
            >
              Sign Out
            </button>
          )}
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
          {status !== "loading" && status == "authenticated" && (
            <div className={styles.profile}>
              <div>
                <h3>{session.user?.name}</h3>
                <p className={styles.emailAddress}> {session.user?.email}</p>
              </div>
              <Image
                className={styles.profilePic}
                src={session.user?.image!}
                alt="User Profile Pic"
                height={40}
                width={40}
              />
            </div>
          )}
          {status !== "loading" && status === "unauthenticated" && (
            <button
              onClick={() => {
                console.log("clicked");
                router.push("/login");
              }}
              className={styles.mobileSignIn}
            >
              Sign In
            </button>
          )}
          {status !== "loading" && status === "authenticated" && (
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
              }}
              className={styles.mobileSignIn}
            >
              Signout
            </button>
          )}
          {status !== "loading" && status === "unauthenticated" && (
            <button className={styles.mobileGetStarted}>Get Started</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
