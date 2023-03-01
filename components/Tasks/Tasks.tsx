import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Chip,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { addTask, deleteTask, getTasks } from "@/utils/request";
import { Task, TasksResponse } from "@/types/tasks";

const Tasks = () => {
  const [allTasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getAllTasks();
  }, []);

  async function getAllTasks() {
    setIsLoading(true);
    try {
      const res = await getTasks();
      setTasks(res.tasks);
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await addTask({
        name: taskName,
        completed: false,
      });
      await getAllTasks();
    } catch (e) {
      console.error(e);
    }
    setTaskName("");
    setIsLoading(false);
  };

  const onDeleteTask = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteTask(id);
      await getAllTasks();
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
        mb={4}
        mt={8}
        onSubmit={onSubmit}
      >
        <Typography variant="h3" align="center" color="textSecondary">
          Task Manager
        </Typography>
        <TextField
          size="small"
          margin="normal"
          variant="outlined"
          fullWidth
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Button variant="contained" type="submit" disabled={isLoading}>
          Add
        </Button>
      </Box>
      <Box>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {allTasks?.map((task, index) => (
              <Grid item key={index}>
                <Chip
                  label={task.name}
                  variant="outlined"
                  onDelete={() => onDeleteTask(task._id)}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Tasks;
