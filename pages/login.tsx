import SignIn from "@/components/Auth/SignIn";
import React from "react";
import styles from "@/styles/Home.module.css";

const Login = () => {
  return (
    <main className={styles.main}>
      <SignIn />
    </main>
  );
};

export default Login;
