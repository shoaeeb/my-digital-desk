"use client";

import { useRouter } from "next/navigation";
import { LogoSvg } from "../constants/constants";
import styles from "./page.module.css";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getSession, signIn } from "next-auth/react";
const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });
      if (result?.error) {
        console.log("Sign in error", result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.log("Sign in Failed", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <LogoSvg size={"50px"} />
        <h1>My Digital Desk</h1>
        <p>Your private digital workplace</p>
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className={styles.googleContainer}
        >
          <FaGoogle className={styles.googleIcon} size={20} />
          <p>Sign In with Google</p>
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
