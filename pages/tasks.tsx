import { Auth } from "@/components/Auth/Auth";
import Tasks from "@/components/Tasks/Tasks";
import React from "react";
import styles from "@/styles/Home.module.css";

const TasksPage = () => {
  return (
    <Auth>
      <main className={styles.main}>
        <Tasks />
      </main>
    </Auth>
  );
};

export default TasksPage;
