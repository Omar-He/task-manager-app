import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import ForgotPassword from "@/components/Auth/ForgotPassword";

const ForgotPasswordPage = () => {
  return (
    <main className={styles.main}>
      <ForgotPassword />
    </main>
  );
};

export default ForgotPasswordPage;
