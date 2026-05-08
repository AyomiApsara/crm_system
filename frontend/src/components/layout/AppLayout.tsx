import { Box, Toolbar } from "@mui/material";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface Props {
  children: React.ReactNode;
}

const AppLayout = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
        background:
          "radial-gradient(circle at top left, rgba(37,99,235,0.1), transparent 28%), radial-gradient(circle at bottom right, rgba(14,165,233,0.08), transparent 24%), linear-gradient(180deg, #f3f7fc 0%, #eef3f9 100%)",
      }}
    >
      <Sidebar />
      <Topbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          width: "100%",
          boxSizing: "border-box",
          minHeight: "100vh",
          p: { xs: 2.5, md: 4 },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;