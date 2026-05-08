import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  GlobalStyles,
  Stack,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import AppLayout from "../components/layout/AppLayout";
import { getLeadById } from "../api/leadApi";
import { createNote, getLeadNotes } from "../api/noteApi";

import type { Lead } from "../types/lead";
import type { Note } from "../types/note";

const workflowSteps = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Won",
  "Lost",
] as const;

const getWorkflowIndex = (status: string) =>
  workflowSteps.indexOf(status as (typeof workflowSteps)[number]);

const WorkflowTracker = ({ status }: { status: string }) => {
  const currentIndex = Math.max(getWorkflowIndex(status), 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#0f172a" }}>
          Status Progress
        </Typography>

        <Typography
          variant="caption"
          sx={{
            px: 1.2,
            py: 0.6,
            borderRadius: 999,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 0.6,
            bgcolor:
              status === "Won"
                ? "rgba(22,163,74,0.12)"
                : status === "Lost"
                  ? "rgba(239,68,68,0.12)"
                  : "rgba(37,99,235,0.12)",
            color:
              status === "Won"
                ? "#166534"
                : status === "Lost"
                  ? "#b91c1c"
                  : "#1e3a8a",
          }}
        >
          {status}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.8,
        }}
      >
        {workflowSteps.map((step, index) => {
          const isActive = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const isLost = status === "Lost" && step === "Lost";
          const isWon = status === "Won" && step === "Won";
          const tooltipTitle = `${step}: ${index < currentIndex ? "Completed" : isCurrent ? "Current stage" : "Pending"}`;

          return (
            <Tooltip key={step} title={tooltipTitle} arrow placement="right">
              <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", position: "relative" }}>
                {/* Vertical Timeline Line */}
                {index < workflowSteps.length - 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 11,
                      top: 40,
                      bottom: -32,
                      width: 2,
                      backgroundColor: isActive ? (isLost ? "#ef4444" : "#22c55e") : "#e2e8f0",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Status Icon */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: isActive ? (isLost ? "#ef4444" : "#22c55e") : "#e2e8f0",
                    zIndex: 1,
                    transition: "all 0.3s ease",
                    boxShadow: isCurrent ? `0 0 0 6px ${isLost ? "rgba(239,68,68,0.15)" : isWon ? "rgba(22,163,74,0.15)" : "rgba(37,99,235,0.15)"}` : "none",
                  }}
                >
                  {index < currentIndex ? (
                    <CheckCircleIcon
                      sx={{
                        fontSize: 20,
                        color: "white",
                        animation: "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    />
                  ) : isCurrent ? (
                    <AccessTimeIcon
                      sx={{
                        fontSize: 20,
                        color: "white",
                        animation: "pulse 2s infinite",
                      }}
                    />
                  ) : (
                    <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#cbd5e1" }} />
                  )}
                </Box>

                {/* Stage Info */}
                <Box sx={{ flex: 1, pt: 0.3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: isActive ? (isLost ? "#b91c1c" : isWon ? "#166534" : "#0f172a") : "#94a3b8",
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      mb: 0.3,
                    }}
                  >
                    {step}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: isActive ? "#475569" : "#94a3b8",
                      fontSize: "0.75rem",
                    }}
                  >
                    {index < currentIndex ? "Completed" : isCurrent ? "Current" : "Pending"}
                  </Typography>
                </Box>
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteContent, setNoteContent] = useState("");

  const fetchLead = async () => {
    const data = await getLeadById(Number(id));
    setLead(data);
  };

  const fetchNotes = async () => {
    const data = await getLeadNotes(Number(id));
    setNotes(data);
  };

  useEffect(() => {
    fetchLead();
    fetchNotes();
  }, [id]);

  const handleAddNote = async () => {
    if (!noteContent.trim()) return;

    await createNote(Number(id), noteContent);
    setNoteContent("");
    fetchNotes();
  };

  if (!lead) {
    return (
      <AppLayout>
        <Typography>Loading lead details...</Typography>
      </AppLayout>
    );
  }

  return (
    <>
      <GlobalStyles
        styles={{
          "@keyframes scaleIn": {
            from: {
              opacity: 0,
              transform: "scale(0.8)",
            },
            to: {
              opacity: 1,
              transform: "scale(1)",
            },
          },
          "@keyframes pulse": {
            "0%, 100%": {
              opacity: 1,
            },
            "50%": {
              opacity: 0.6,
            },
          },
        }}
      />
      <AppLayout>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/leads")}
          sx={{
            borderRadius: 2,
            border: "1px solid rgba(148,163,184,0.28)",
            bgcolor: "rgba(255,255,255,0.74)",
            px: 1.5,
            py: 0.6,
          }}
        >
          Back
        </Button>

        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: "#0f172a" }}>
            Lead Details
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View lead information and activity notes.
          </Typography>
        </Box>
      </Box>

      <Card
        elevation={0}
        sx={{
          border: "1px solid rgba(148,163,184,0.24)",
          borderRadius: 3,
          mb: 3,
          background: "rgba(255,255,255,0.86)",
          boxShadow: "0 12px 28px rgba(2,6,23,0.06)",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: 3,
            }}
          >
            {/* Left Column - Lead Details */}
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2.5 }}>
                {lead.lead_name}
              </Typography>

              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: 0.5 }}>
                    Company
                  </Typography>
                  <Typography sx={{ mt: 0.4, color: "#0f172a", fontWeight: 500 }}>
                    {lead.company_name}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5 }} />

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: 0.5 }}>
                    Email
                  </Typography>
                  <Typography sx={{ mt: 0.4, color: "#0f172a", fontWeight: 500 }}>
                    {lead.email}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5 }} />

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: 0.5 }}>
                    Phone
                  </Typography>
                  <Typography sx={{ mt: 0.4, color: "#0f172a", fontWeight: 500 }}>
                    {lead.phone}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5 }} />

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: 0.5 }}>
                    Lead Source
                  </Typography>
                  <Typography sx={{ mt: 0.4, color: "#0f172a", fontWeight: 500 }}>
                    {lead.lead_source}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5 }} />

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: 0.5 }}>
                    Assigned Salesperson
                  </Typography>
                  <Typography sx={{ mt: 0.4, color: "#0f172a", fontWeight: 500 }}>
                    {lead.assigned_salesperson}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5 }} />

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: 0.5 }}>
                    Estimated Deal Value
                  </Typography>
                  <Typography sx={{ mt: 0.4, color: "#0f172a", fontWeight: 700, fontSize: "1.1rem" }}>
                    ${lead.estimated_value.toLocaleString()}
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5 }} />

                <Box>
                  <Typography variant="caption" sx={{ fontWeight: 700, textTransform: "uppercase", color: "#64748b", letterSpacing: 0.5 }}>
                    Created Date
                  </Typography>
                  <Typography sx={{ mt: 0.4, color: "#0f172a", fontWeight: 500 }}>
                    {new Date(lead.created_at).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Right Column - Workflow Tracker */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                border: "1px solid rgba(148,163,184,0.12)",
                background: "linear-gradient(180deg, rgba(248,250,252,0.6) 0%, rgba(240,245,255,0.6) 100%)",
              }}
            >
              <WorkflowTracker status={lead.status} />
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card
        elevation={0}
        sx={{
          border: "1px solid rgba(148,163,184,0.24)",
          borderRadius: 3,
          background: "rgba(255,255,255,0.86)",
          boxShadow: "0 12px 28px rgba(2,6,23,0.06)",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Notes
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              alignItems: "flex-start",
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Add a note about a call, email, meeting, or follow-up..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  backgroundColor: "rgba(248,250,252,0.85)",
                },
              }}
            />

            <Button
              variant="contained"
              onClick={handleAddNote}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1,
                fontWeight: 700,
                boxShadow: "0 12px 26px rgba(37,99,235,0.24)",
              }}
            >
              Add Note
            </Button>
          </Box>

          <Stack spacing={2}>
            {notes.map((note) => (
              <Card
                key={note.id}
                variant="outlined"
                sx={{
                  borderColor: "rgba(148,163,184,0.28)",
                  borderRadius: 2,
                  background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
                }}
              >
                <CardContent>
                  <Typography sx={{ mb: 1 }}>{note.content}</Typography>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="caption" color="text.secondary">
                    By {note.created_by || "Unknown"} • {new Date(note.created_at).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}

            {notes.length === 0 && (
              <Typography color="text.secondary">
                No notes added yet.
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </AppLayout>
    </>
  );
};

export default LeadDetailsPage;