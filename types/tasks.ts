export interface Task {
  completed: boolean;
  createdAt: string;
  createdBy: string;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface TasksResponse {
  count: number;
  tasks: Task[];
}

export interface AddTaskPayload {
  name: string;
  completed: boolean;
}
