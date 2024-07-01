export interface DashBoardProps {
  username: string;
}

export interface URLProps {
  title: string;
  shortURL: string;
  longURL: string;
  numberOfLinks: number;
  TotalClicks: number;
  TotalForAllLinks?: number;
  createdAt: Date;
}

export interface InputElementProps {
  inputType: string;
  label: string;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface ProtectedRouteProps {
  apiUrl: string;
  element: React.FC<{ username: string }>;
}

export interface SignupForm {
  email: string;
  password: string;
  username: string;
  confirmPassword: string;
}

export interface URLFormProps {
  onSubmit: (newURL: Partial<URLProps>) => void;
  onClose: () => void;
}
