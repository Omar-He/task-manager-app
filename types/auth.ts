export interface LoginResponse {
  token: string;
}

export interface LoginPayload {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  rememberMe?: boolean;
}
