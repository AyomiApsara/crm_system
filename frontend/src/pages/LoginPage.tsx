import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/authApi";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberedEmail");

    if (remembered) {
      setEmail(remembered);
    }
  }, []);

  const handleLogin = async () => {
    try {
      setError("");
      setLoading(true);

      const data = await loginUser(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (remember) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
        background:
          "radial-gradient(circle at top left, rgba(37,99,235,0.22), transparent 32%), radial-gradient(circle at bottom right, rgba(14,165,233,0.18), transparent 28%), linear-gradient(135deg, #071321 0%, #0b1b30 42%, #f3f7fb 42%, #f7f9fc 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 48,
          left: 48,
          width: 180,
          height: 180,
          borderRadius: "50%",
          filter: "blur(30px)",
          background: "rgba(59,130,246,0.18)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          right: 72,
          bottom: 72,
          width: 220,
          height: 220,
          borderRadius: "50%",
          filter: "blur(34px)",
          background: "rgba(14,165,233,0.16)",
          pointerEvents: "none",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 1120,
            borderRadius: 5,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 24px 80px rgba(15, 23, 42, 0.24)",
            backdropFilter: "blur(16px)",
            background: "rgba(255,255,255,0.86)",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
              minHeight: { md: 680 },
            }}
          >
            <Box
              sx={{
                p: { xs: 4, md: 6 },
                color: "#f8fafc",
                background:
                  "linear-gradient(160deg, #0f172a 0%, #173a6a 56%, #2563eb 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              <Box>
                
                <Typography
                  variant="overline"
                  sx={{
                    letterSpacing: 3,
                    color: "rgba(255,255,255,0.72)",
                  }}
                >
                   CRM
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    mt: 1,
                    fontWeight: 800,
                    lineHeight: 1.1,
                    maxWidth: 520,
                  }}
                >
                  Move faster with a sharper sales workflow.
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    maxWidth: 520,
                    color: "rgba(255,255,255,0.82)",
                    lineHeight: 1.8,
                  }}
                >
                  Track leads and keep your team aligned from a
                  clean, focused workspace built for daily use.
                </Typography>

                <Stack spacing={2} sx={{ mt: 4 }}>
                  {[
                    {
                      icon: <BusinessCenterOutlinedIcon />,
                      title: "Pipeline clarity",
                      text: "See who owns each lead and what needs attention next.",
                    },
                    {
                      icon: <GroupsOutlinedIcon />,
                      title: "Team collaboration",
                      text: "Admins and sales reps stay in sync without extra steps.",
                    },
                    {
                      icon: <SpeedOutlinedIcon />,
                      title: "Fast daily flow",
                      text: "A focused interface helps you get in, work quickly, and move on.",
                    },
                  ].map((item) => (
                    <Box
                      key={item.title}
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "flex-start",
                        p: 2,
                        borderRadius: 3,
                        bgcolor: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: "rgba(255,255,255,0.14)",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "rgba(255,255,255,0.78)", mt: 0.4 }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>

            </Box>

            <Box
              sx={{
                p: { xs: 4, md: 6 },
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "100%", maxWidth: 440, mx: "auto" }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: "#0f172a" }}>
                  Sign in
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.2, mb: 3 }}>
                  Use your CRM credentials to continue to the dashboard.
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                <Box
                  component="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                  }}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailOutlinedIcon color="action" />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockOutlinedIcon color="action" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onClick={() => setShowPassword((s) => !s)}
                              aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      mt: 1,
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={remember}
                          onChange={(e) => setRemember(e.target.checked)}
                        />
                      }
                      label="Remember me"
                    />

                    <Typography
                      variant="body2"
                      sx={{
                        color: "primary.main",
                        fontWeight: 600,
                        cursor: "pointer",
                        userSelect: "none",
                      }}
                      onClick={() => alert("Forgot password flow not configured in this demo")}
                    >
                      Forgot password?
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 3,
                      py: 1.35,
                      borderRadius: 2,
                      fontWeight: 700,
                      boxShadow: "0 14px 28px rgba(37,99,235,0.25)",
                      transition: "transform 0.18s ease, box-shadow 0.18s ease",
                      "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 18px 32px rgba(37,99,235,0.3)",
                      },
                    }}
                    disabled={loading}
                    endIcon={!loading ? <ArrowForwardRoundedIcon /> : undefined}
                  >
                    {loading ? <CircularProgress size={20} color="inherit" /> : "Login"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginPage;
