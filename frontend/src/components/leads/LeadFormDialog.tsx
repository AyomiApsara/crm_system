import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";

import type { User } from "../../types/user";

interface LeadForm {
  lead_name: string;
  company_name: string;
  email: string;
  phone: string;
  lead_source: string;
  custom_source: string;
  assigned_user_id: string;
  status: string;
  estimated_value: string;
}

interface Props {
  open: boolean;
  form: LeadForm;
  users: User[];
  currentUserRole?: string;
  mode: "create" | "edit";
  onClose: () => void;
  onSubmit: () => void;
  onChange: (form: LeadForm) => void;
}

const LeadFormDialog = ({
  open,
  form,
  users,
  currentUserRole,
  mode,
  onClose,
  onSubmit,
  onChange,
}: Props) => {
  const isAdmin = currentUserRole === "admin";

  const isFormInvalid =
    !form.lead_name ||
    !form.company_name ||
    !form.email ||
    !form.phone ||
    (isAdmin && !form.assigned_user_id) ||
    !form.estimated_value ||
    (form.lead_source === "Other" && !form.custom_source);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode === "edit" ? "Edit Lead" : "Create Lead"}</DialogTitle>

      <DialogContent>
        <TextField
          fullWidth
          label="Lead Name"
          margin="normal"
          value={form.lead_name}
          onChange={(e) => onChange({ ...form, lead_name: e.target.value })}
        />

        <TextField
          fullWidth
          label="Company Name"
          margin="normal"
          value={form.company_name}
          onChange={(e) => onChange({ ...form, company_name: e.target.value })}
        />

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={form.email}
          onChange={(e) => onChange({ ...form, email: e.target.value })}
        />

        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
          value={form.phone}
          onChange={(e) => onChange({ ...form, phone: e.target.value })}
        />

        <TextField
          select
          fullWidth
          label="Lead Source"
          margin="normal"
          value={form.lead_source}
          onChange={(e) => onChange({ ...form, lead_source: e.target.value })}
        >
          <MenuItem value="Website">Website</MenuItem>
          <MenuItem value="LinkedIn">LinkedIn</MenuItem>
          <MenuItem value="Referral">Referral</MenuItem>
          <MenuItem value="Cold Email">Cold Email</MenuItem>
          <MenuItem value="Event">Event</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        {form.lead_source === "Other" && (
          <TextField
            fullWidth
            label="Custom Lead Source"
            margin="normal"
            value={form.custom_source}
            onChange={(e) => onChange({ ...form, custom_source: e.target.value })}
          />
        )}

        {isAdmin && (
          <TextField
            select
            fullWidth
            label="Assigned Salesperson"
            margin="normal"
            value={form.assigned_user_id}
            onChange={(e) => onChange({ ...form, assigned_user_id: e.target.value })}
          >
            {users
              .filter((user) => user.role === "salesperson")
              .map((user) => (
                <MenuItem key={user.id} value={user.id}>
                  {user.name}
                </MenuItem>
              ))}
          </TextField>
        )}

        <TextField
          select
          fullWidth
          label="Status"
          margin="normal"
          value={form.status}
          onChange={(e) => onChange({ ...form, status: e.target.value })}
        >
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Contacted">Contacted</MenuItem>
          <MenuItem value="Qualified">Qualified</MenuItem>
          <MenuItem value="Proposal Sent">Proposal Sent</MenuItem>
          <MenuItem value="Won">Won</MenuItem>
          <MenuItem value="Lost">Lost</MenuItem>
        </TextField>

        <TextField
          fullWidth
          type="number"
          label="Estimated Deal Value"
          margin="normal"
          value={form.estimated_value}
          onChange={(e) => onChange({ ...form, estimated_value: e.target.value })}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSubmit} disabled={isFormInvalid}>
          {mode === "edit" ? "Update Lead" : "Create Lead"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeadFormDialog;