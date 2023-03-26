import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Register from "@/components/Auth/Register";

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
      <Register />
    </main>
  );
};

export default Login;
