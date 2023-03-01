import { Auth } from "@/components/Auth/Auth";
import Tasks from "@/components/Tasks/Tasks";
import React from "react";

const TasksPage = () => {
  return (
    <Auth>
      <Tasks />
    </Auth>
  );
};

export default TasksPage;
