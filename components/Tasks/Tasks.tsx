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
  Paper,
} from "@mui/material";
import { addTask, deleteTask, getTasks, logoutUser } from "@/utils/request";
import { Task } from "@/types/tasks";
import { useRouter } from "next/router";
import EditModal from "./EditModal";

const Tasks = () => {
  const router = useRouter();
  const [allTasks, setTasks] = useState<Task[]>([]);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>();
  const [taskName, setTaskName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

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

  const onLogout = () => {
    logoutUser();
    router.push("/login");
  };

  const editTask = (task: Task) => {
    setTaskToEdit(task);
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setTaskToEdit(null);
    setOpenModal(false);
  };

  const onRefresh = () => {
    getAllTasks();
    onCloseModal();
  };

  return (
    <>
      <Container maxWidth="xs">
        <Paper elevation={3} sx={{ px: 4, pt: 6, pb: 2 }}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
            mb={4}
            onSubmit={onSubmit}
          >
            <Typography variant="h4" align="center" color="textSecondary">
              Task Manager
            </Typography>
            <TextField
              size="small"
              margin="normal"
              variant="outlined"
              fullWidth
              value={taskName}
              placeholder="Type the task name.."
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
                      onClick={() => editTask(task)}
                      onDelete={() => onDeleteTask(task._id)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>

          <Box mt={8}>
            <Button onClick={onLogout}>Logout</Button>
          </Box>
        </Paper>
      </Container>
      {taskToEdit && (
        <EditModal
          open={openModal}
          onClose={onCloseModal}
          task={taskToEdit}
          refreshTasks={onRefresh}
        />
      )}
    </>
  );
};

export default Tasks;
