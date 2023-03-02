import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import SignIn from "@/components/Auth/SignIn";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <main className={styles.main}>
      <SignIn />
    </main>
  );
};

export default Login;
