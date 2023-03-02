import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Task } from "@/types/tasks";
import { TextField } from "@mui/material";
import { updateTask } from "@/utils/request";
import LoadingButton from "@mui/lab/LoadingButton";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 2,
  alignItems: "flex-start",
};

interface PropsTypes {
  open: boolean;
  onClose: () => void;
  refreshTasks: () => void;
  task: Task;
}

export default function EditModal({
  open,
  onClose,
  task,
  refreshTasks,
}: PropsTypes) {
  const [editedTask, setEditedTask] = useState<Task>(task);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateTask(editedTask._id, {
        name: editedTask.name,
        completed: editedTask.completed,
      });
    } catch (e) {
      console.error(e);
    }
    setIsLoading(false);
    refreshTasks();
  };

  return (
    <Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} component="form" onSubmit={handleSubmit}>
            <Typography variant="h6" component="h2">
              Edit Task
            </Typography>
            <TextField
              size="small"
              margin="normal"
              variant="outlined"
              fullWidth
              value={editedTask?.name}
              label="Name"
              onChange={(e) =>
                setEditedTask({ ...editedTask, name: e.target.value })
              }
            />
            <LoadingButton
              loading={isLoading}
              variant="contained"
              type="submit"
            >
              Update
            </LoadingButton>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
