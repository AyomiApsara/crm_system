import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  allowedRoles?: Array<"admin" | "salesperson">;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  allowedRoles,
  redirectTo = "/dashboard",
}: Props) => {
  const token = localStorage.getItem("token");
  const userRaw = localStorage.getItem("user");

  let role: "admin" | "salesperson" | undefined;

  if (userRaw) {
    try {
      const user = JSON.parse(userRaw);
      role = user.role;
    } catch {
      role = undefined;
    }
  }

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && (!role || !allowedRoles.includes(role))) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;