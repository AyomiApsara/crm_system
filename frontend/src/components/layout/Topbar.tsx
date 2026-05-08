import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        left: { xs: 0, md: "240px" },
        width: { xs: "100%", md: "calc(100% - 240px)" },
        bgcolor: "transparent",
        color: "#0f172a",
        pt: 1,
        px: { xs: 1, sm: 1.5, md: 2 },
      }}
    >
      <Toolbar
        sx={{
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: "space-between",
          gap: { xs: 1.2, md: 2 },
          minHeight: "74px",
          borderRadius: 3,
          border: "1px solid rgba(148,163,184,0.22)",
          backgroundColor: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
          px: { xs: 1.5, sm: 2, md: 2.8 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1.6,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              CRM Workspace
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back, {user.name || "User"}
            </Typography>
          </Box>

          <Chip
            size="small"
            label={user.role === "admin" ? "ADMIN" : "SALESPERSON"}
            sx={{
              height: 24,
              fontWeight: 700,
              fontSize: 11,
              bgcolor:
                user.role === "admin"
                  ? "rgba(37,99,235,0.12)"
                  : "rgba(14,165,233,0.12)",
              color: "#1e3a8a",
              border: "1px solid rgba(37,99,235,0.24)",
            }}
          />
        </Box>

        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 0.8,
            fontWeight: 700,
            boxShadow: "none",
            bgcolor: "#2563eb",
            ml: "auto",
            "&:hover": {
              bgcolor: "#1d4ed8",
              boxShadow: "none",
            },
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;