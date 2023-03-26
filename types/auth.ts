export interface LoginResponse {
  token: string;
}

export interface LoginPayload {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  rememberMe?: boolean;
}
export interface RegisterPayload {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  name: FormDataEntryValue | null;
}
