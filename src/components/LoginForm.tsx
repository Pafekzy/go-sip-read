
import { LoginContainer } from "@/components/LoginContainer";

interface LoginFormProps {
  defaultTab?: "user" | "admin";
}

export function LoginForm({ defaultTab = "user" }: LoginFormProps) {
  return <LoginContainer defaultTab={defaultTab} />;
}
