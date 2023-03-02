import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

interface AuthProps {
  children: React.ReactNode;
}

export const Auth = ({ children }: AuthProps) => {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
};
