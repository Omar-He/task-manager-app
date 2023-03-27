import { LoginPayload, LoginResponse, RegisterPayload } from "@/types/auth";
import { TasksResponse, AddTaskPayload } from "@/types/tasks";
import Cookies from "js-cookie";

const API_URL = "https://task-manager-api-sepia.vercel.app/api/v1";

const getToken = (): string | null => localStorage.getItem("token");

const setToken = (token: string, rememberMe?: boolean): void => {
  Cookies.set("token", token, {
    secure: true,
    sameSite: "strict",
    expires: rememberMe ? 30 : undefined,
  });
  localStorage.setItem("token", token);
};

export const logoutUser = (): void => {
  Cookies.remove("token");
  localStorage.removeItem("token");
};

const request = async <T>(
  path: string,
  method: string,
  payload?: any
): Promise<T> => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const options = { method, headers, body: JSON.stringify(payload) };

  try {
    const response = await fetch(`${API_URL}/${path}`, options);
    if (!response.ok) throw new Error(`Unable to ${method} ${path}`);

    const data: T = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Unable to ${method} ${path}`);
  }
};

export const loginUser = async (
  payload: LoginPayload,
  rememberMe?: boolean
): Promise<void> => {
  try {
    const data: LoginResponse = await request("auth/login", "POST", payload);
    setToken(data.token, rememberMe);
    console.log("You logged in successfully");
  } catch (error) {
    throw new Error("Unable to login");
  }
};

//registerUser
export const registerUser = async (payload: RegisterPayload): Promise<void> => {
  try {
    const data: LoginResponse = await request("auth/register", "POST", payload);
    console.log("You registered successfully");
  } catch (error) {
    throw new Error("Unable to register");
  }
};

export const forgotPassword = async (email: string): Promise<void> => {
  try {
    await request("auth/forgot-password", "POST", { email });
    console.log("Password reset link has been sent to your email");
  } catch (error) {
    throw new Error("Unable to send the password reset link");
  }
};

export const resetPassword = async (payload: {
  password: string;
  token: string;
}): Promise<void> => {
  try {
    await request("auth/reset-password", "POST", payload);
    console.log("Password has been reset successfully");
  } catch (error) {
    throw new Error("Unable to reset the password");
  }
};

export const getTasks = async (): Promise<TasksResponse> => {
  try {
    const data: TasksResponse = await request("tasks", "GET");
    console.log("Fetched tasks successfully");
    return data;
  } catch (error) {
    throw new Error("Unable to fetch the tasks");
  }
};

export const addTask = async (payload: AddTaskPayload): Promise<void> => {
  try {
    await request("tasks", "POST", payload);
    console.log("Task has been added successfully");
  } catch (error) {
    throw new Error("Unable to add a task");
  }
};

export const updateTask = async (
  id: string,
  payload: AddTaskPayload
): Promise<void> => {
  try {
    await request(`tasks/${id}`, "PATCH", payload);
    console.log("Task has been updated successfully");
  } catch (error) {
    throw new Error("Unable to update the task");
  }
};

export const deleteTask = async (id: string): Promise<void> => {
  try {
    await request(`tasks/${id}`, "DELETE");
    console.log("Task has been deleted successfully");
  } catch (error) {
    throw new Error("Unable to delete the task");
  }
};
