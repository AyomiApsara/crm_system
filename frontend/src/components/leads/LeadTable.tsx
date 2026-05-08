import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import type { Lead } from "../../types/lead";

interface Props {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: number) => void;
  onStatusChange: (
    lead: Lead,
    status: string
  ) => void;
  onView: (id: number) => void;
}

const LeadTable = ({ leads,onEdit,onDelete,onStatusChange,onView,
}: Props) => {

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Table
        sx={{
          width: "100%",
          minWidth: 1180,
          "& .MuiTableCell-head": {
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: 0.3,
            color: "#64748b",
            fontWeight: 700,
            borderBottom: "1px solid rgba(148,163,184,0.26)",
            whiteSpace: "nowrap",
          },
          "& .MuiTableCell-body": {
            borderBottom: "1px solid rgba(226,232,240,0.8)",
            color: "#1e293b",
            whiteSpace: "nowrap",
          },
        }}
      >
      <TableHead>
        <TableRow>
          <TableCell>Lead Name</TableCell>
          <TableCell>Company</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Lead Source</TableCell>
          <TableCell>Salesperson</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Deal Value</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {leads.map((lead) => (
          <TableRow
            key={lead.id}
            hover
            sx={{
              "&:hover": {
                backgroundColor: "rgba(37,99,235,0.04)",
              },
            }}
          >
            <TableCell>
              <Typography sx={{ fontWeight: 700 }}>
                {lead.lead_name}
              </Typography>
            </TableCell>

            <TableCell>
              {lead.company_name}
            </TableCell>

            <TableCell>
              {lead.email}
            </TableCell>

            <TableCell>
              {lead.phone}
            </TableCell>

            <TableCell>
              {lead.lead_source}
            </TableCell>

            <TableCell>
              {
                lead.assigned_salesperson
              }
            </TableCell>

            <TableCell>
              <Select
                size="small"
                value={lead.status}
                onChange={(e) =>
                  onStatusChange(
                    lead,
                    e.target.value
                  )
                }
                sx={{
                  minWidth: 150,
                }}
              >
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
              </Select>
            </TableCell>

            <TableCell>
              $
              {lead.estimated_value}
            </TableCell>

            <TableCell align="right">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 1,
                }}
              >
                <Button
                  size="small"
                  sx={{ fontWeight: 700, borderRadius: 1.5 }}
                  onClick={() =>
                    onView(lead.id)
                  }
                >
                  View
                </Button>

                <Button
                  size="small"
                  sx={{ fontWeight: 700, borderRadius: 1.5 }}
                  onClick={() =>
                    onEdit(lead)
                  }
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  color="error"
                  sx={{ fontWeight: 700, borderRadius: 1.5 }}
                  onClick={() =>
                    onDelete(lead.id)
                  }
                >
                  Delete
                </Button>
              </Box>
            </TableCell>
          </TableRow>
        ))}

        {leads.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={9}
              align="center"
            >
              No leads found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      </Table>
    </Box>
  );
};

export default LeadTable;