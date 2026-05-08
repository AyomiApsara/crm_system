import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Alert,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Chip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AppLayout from "../components/layout/AppLayout";
import { getUsers, createUser, deleteUser } from "../api/userApi";
import type { User } from "../types/user";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "salesperson",
  });

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreate = async () => {
    setLoading(true);
    setError("");

    try {
      await createUser(form);
      setOpen(false);
      setForm({
        name: "",
        email: "",
        password: "",
        role: "salesperson",
      });
      fetchUsers();
    } catch (err: any) {
      const message = err?.response?.data?.message || "Failed to create user";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    await deleteUser(id);
    fetchUsers();
  };

  return (
    <AppLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2.5,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#0f172a" }}>
            Users
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage admins and salespersons.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1,
            fontWeight: 700,
            boxShadow: "0 12px 26px rgba(37,99,235,0.26)",
          }}
        >
          Add User
        </Button>
      </Box>

      <Card
        elevation={0}
        sx={{
          border: "1px solid rgba(148,163,184,0.24)",
          borderRadius: 3,
          mt: 3,
          background: "rgba(255,255,255,0.86)",
          boxShadow: "0 12px 28px rgba(2,6,23,0.06)",
        }}
      >
        <CardContent sx={{ p: 1.2 }}>
          <Table
            sx={{
              "& .MuiTableCell-head": {
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: 0.3,
                color: "#64748b",
                fontWeight: 700,
                borderBottom: "1px solid rgba(148,163,184,0.26)",
              },
              "& .MuiTableCell-body": {
                borderBottom: "1px solid rgba(226,232,240,0.8)",
                color: "#1e293b",
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(37,99,235,0.04)",
                    },
                  }}
                >
                  <TableCell>
                    <Typography sx={{ fontWeight: 700 }}>{user.name}</Typography>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        textTransform: "capitalize",
                        bgcolor:
                          user.role === "admin"
                            ? "rgba(37,99,235,0.14)"
                            : "rgba(148,163,184,0.16)",
                        color: user.role === "admin" ? "#1e3a8a" : "#334155",
                        border:
                          user.role === "admin"
                            ? "1px solid rgba(37,99,235,0.24)"
                            : "1px solid rgba(148,163,184,0.28)",
                      }}
                    />
                  </TableCell>
                  <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <Button
                      color="error"
                      size="small"
                      sx={{ fontWeight: 700, borderRadius: 1.5 }}
                      onClick={() => handleDelete(user.id)}
                      disabled={user.role === "admin"}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 3,
              border: "1px solid rgba(148,163,184,0.24)",
              boxShadow: "0 20px 50px rgba(2,6,23,0.2)",
            },
          },
        }}
      >
        <DialogTitle>Add New User</DialogTitle>

        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mt: 1, mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <TextField
            select
            fullWidth
            label="Role"
            margin="normal"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <MenuItem value="salesperson">Salesperson</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{ fontWeight: 700 }}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </AppLayout>
  );
};

export default UsersPage;