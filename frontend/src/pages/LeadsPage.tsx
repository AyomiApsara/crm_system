import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {Box,Button,Card,CardContent,Typography,TextField,MenuItem,} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import AppLayout from "../components/layout/AppLayout";

import LeadTable from "../components/leads/LeadTable";
import LeadFormDialog from "../components/leads/LeadFormDialog";

import {getLeads,deleteLead,createLead,updateLead,} from "../api/leadApi";

import { getUsers } from "../api/userApi";

import type { Lead } from "../types/lead";
import type { User } from "../types/user";

const initialForm = {
  lead_name: "",
  company_name: "",
  email: "",
  phone: "",
  lead_source: "Website",
  custom_source: "",
  assigned_user_id: "",
  status: "New",
  estimated_value: "",
};

const LeadsPage = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isAdmin = currentUser.role === "admin";

  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editingLeadId, setEditingLeadId] =useState<number | null>(null);
  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");

  const [
    salespersonFilter,
    setSalespersonFilter,
  ] = useState("");

  const fetchLeads = async () => {
    const data = await getLeads();

    setLeads(data);
  };

  const fetchUsers = async () => {
    if (!isAdmin) return;

    const data = await getUsers();

    setUsers(data);
  };

  useEffect(() => {
    fetchLeads();
    fetchUsers();
  }, []);

  const handleSubmitLead = async () => {
    const assignedUserId =
      currentUser.role === "salesperson"
        ? currentUser.id
        : Number(form.assigned_user_id);

    const payload = {
      lead_name: form.lead_name,

      company_name:
        form.company_name,

      email: form.email,

      phone: form.phone,

      lead_source:
        form.lead_source ===
        "Other"
          ? form.custom_source
          : form.lead_source,

      assigned_user_id: assignedUserId,

      status: form.status,

      estimated_value: Number(
        form.estimated_value
      ),
    };

    if (editingLeadId) {
      await updateLead(
        editingLeadId,
        payload
      );
    } else {
      await createLead(payload);
    }

    setOpen(false);

    setEditingLeadId(null);

    setForm(initialForm);

    fetchLeads();
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this lead?"
      );

    if (!confirmDelete) return;

    await deleteLead(id);

    fetchLeads();
  };

  const handleEditClick = (
    lead: Lead
  ) => {
    setEditingLeadId(lead.id);

    setForm({
      lead_name: lead.lead_name,

      company_name:
        lead.company_name,

      email: lead.email,

      phone: lead.phone,

      lead_source:
        lead.lead_source,

      custom_source: "",

      assigned_user_id: String(
        lead.assigned_user_id
      ),

      status: lead.status,

      estimated_value: String(
        lead.estimated_value
      ),
    });

    setOpen(true);
  };

  const handleStatusChange =
    async (
      lead: Lead,
      status: string
    ) => {
      await updateLead(lead.id, {
        lead_name: lead.lead_name,

        company_name:
          lead.company_name,

        email: lead.email,

        phone: lead.phone,

        lead_source:
          lead.lead_source,

        assigned_user_id:
          lead.assigned_user_id,

        status,

        estimated_value:
          lead.estimated_value,
      });

      fetchLeads();
    };

  const filteredLeads =
    leads.filter((lead) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        lead.lead_name
          .toLowerCase()
          .includes(searchText) ||

        lead.company_name
          .toLowerCase()
          .includes(searchText) ||

        lead.email
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        !statusFilter ||
        lead.status ===
          statusFilter;

      const matchesSource =
        !sourceFilter ||
        lead.lead_source ===
          sourceFilter;

      const matchesSalesperson =
        !salespersonFilter ||
        lead.assigned_salesperson ===
          salespersonFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSource &&
        matchesSalesperson
      );
    });

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
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#0f172a" }}
          >
            Leads
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Manage and track sales
            leads.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() =>
            setOpen(true)
          }
          sx={{
            borderRadius: 2,
            px: 2,
            py: 1,
            fontWeight: 700,
            boxShadow: "0 12px 26px rgba(37,99,235,0.26)",
          }}
        >
          Add Lead
        </Button>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { xs: "1fr", md: "1.15fr repeat(3, minmax(180px, 1fr))" },
          mt: 3,
          p: 2,
          borderRadius: 3,
          border: "1px solid rgba(148,163,184,0.22)",
          background: "rgba(255,255,255,0.78)",
          boxShadow: "0 8px 20px rgba(2,6,23,0.04)",
        }}
      >
        <TextField
          label="Search Leads"
          size="small"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          sx={{ minWidth: 260 }}
        />

        <TextField
          select
          label="Status"
          size="small"
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            All Statuses
          </MenuItem>

          <MenuItem value="New">
            New
          </MenuItem>

          <MenuItem value="Contacted">
            Contacted
          </MenuItem>

          <MenuItem value="Qualified">
            Qualified
          </MenuItem>

          <MenuItem value="Proposal Sent">
            Proposal Sent
          </MenuItem>

          <MenuItem value="Won">
            Won
          </MenuItem>

          <MenuItem value="Lost">
            Lost
          </MenuItem>
        </TextField>

        <TextField
          select
          label="Lead Source"
          size="small"
          value={sourceFilter}
          onChange={(e) =>
            setSourceFilter(
              e.target.value
            )
          }
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            All Sources
          </MenuItem>

          <MenuItem value="Website">
            Website
          </MenuItem>

          <MenuItem value="LinkedIn">
            LinkedIn
          </MenuItem>

          <MenuItem value="Referral">
            Referral
          </MenuItem>

          <MenuItem value="Cold Email">
            Cold Email
          </MenuItem>

          <MenuItem value="Event">
            Event
          </MenuItem>
        </TextField>

        {isAdmin && (
          <TextField
            select
            label="Salesperson"
            size="small"
            value={salespersonFilter}
            onChange={(e) =>
              setSalespersonFilter(
                e.target.value
              )
            }
            sx={{ minWidth: 200 }}
          >
            <MenuItem value="">
              All Salespersons
            </MenuItem>

            {users
              .filter(
                (user) =>
                  user.role ===
                  "salesperson"
              )
              .map((user) => (
                <MenuItem
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </MenuItem>
              ))}
          </TextField>
        )}
      </Box>

      <Card
        elevation={0}
        sx={{
          border: "1px solid rgba(148,163,184,0.24)",
          borderRadius: 3,
          background: "rgba(255,255,255,0.86)",
          boxShadow: "0 12px 28px rgba(2,6,23,0.06)",
          mt: 3,
        }}
      >
        <CardContent sx={{ p: 1.2 }}>
          <LeadTable
            leads={filteredLeads}
            onView={(id) =>
              navigate(
                `/leads/${id}`
              )
            }
            onEdit={
              handleEditClick
            }
            onDelete={
              handleDelete
            }
            onStatusChange={
              handleStatusChange
            }
          />
        </CardContent>
      </Card>

      <LeadFormDialog
        open={open}
        form={form}
        users={users}
        currentUserRole={currentUser.role}
        mode={
          editingLeadId
            ? "edit"
            : "create"
        }
        onClose={() => {
          setOpen(false);

          setEditingLeadId(
            null
          );

          setForm(initialForm);
        }}
        onSubmit={
          handleSubmitLead
        }
        onChange={setForm}
      />
    </AppLayout>
  );
};

export default LeadsPage;