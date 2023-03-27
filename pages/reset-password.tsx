import React, { useEffect } from "react";
import styles from "@/styles/Home.module.css";
import ResetPassword from "@/components/Auth/ResetPassword";

const ResetPasswordPage = () => {
  return (
    <main className={styles.main}>
      <ResetPassword />
    </main>
  );
};

export default ResetPasswordPage;
