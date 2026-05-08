import {
  Avatar,
  Box,
  Chip,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import GroupIcon from "@mui/icons-material/Group";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  const menuItems = [
    { text: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { text: "Leads", path: "/leads", icon: <PeopleIcon /> },
    { text: "Users", path: "/users", icon: <GroupIcon /> },
  ].filter((item) => item.path !== "/users" || role === "admin");

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid rgba(255,255,255,0.12)",
          background:
            "linear-gradient(180deg, #0b1b30 0%, #0f2847 56%, #14355f 100%)",
          color: "#e2e8f0",
          px: 1,
          py: 2,
        },
      }}
    >
      <Box sx={{ px: 2.2, pt: 1.4, pb: 2.2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.4 }}>
          <Avatar
            sx={{
              bgcolor: "rgba(37,99,235,0.35)",
              color: "#fff",
              width: 38,
              height: 38,
              fontSize: 14,
              fontWeight: 700,
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            TC
          </Avatar>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
              Torch CRM
            </Typography>
            <Typography variant="caption" sx={{ color: "rgba(226,232,240,0.75)" }}>
              Lead Management
            </Typography>
          </Box>
        </Box>

        <Chip
          label={role === "admin" ? "Admin Access" : "Sales Access"}
          size="small"
          sx={{
            mt: 2,
            bgcolor: "rgba(255,255,255,0.12)",
            color: "#f8fafc",
            border: "1px solid rgba(255,255,255,0.18)",
            fontWeight: 600,
          }}
        />
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            selected={location.pathname === item.path}
            onClick={() => navigate(item.path)}
            sx={{
              mx: 1,
              mb: 0.6,
              borderRadius: 2.3,
              color: "rgba(226,232,240,0.92)",
              "& .MuiListItemIcon-root": {
                color: "rgba(226,232,240,0.85)",
                minWidth: 36,
              },
              "& .MuiListItemText-primary": {
                fontWeight: 600,
                fontSize: 14,
              },
              "&.Mui-selected": {
                background:
                  "linear-gradient(90deg, rgba(59,130,246,0.36) 0%, rgba(37,99,235,0.2) 100%)",
                border: "1px solid rgba(191,219,254,0.3)",
                boxShadow: "0 10px 20px rgba(2,6,23,0.2)",
                "& .MuiListItemIcon-root": {
                  color: "#dbeafe",
                },
              },
              "&:hover": {
                backgroundColor: "rgba(148,163,184,0.16)",
              },
            }}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;