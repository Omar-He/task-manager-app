import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useEffect } from "react";

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
