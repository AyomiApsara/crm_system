import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";

import AppLayout from "../components/layout/AppLayout";

import StatCard from "../components/common/StatCard";

import { getDashboardStats } from "../api/dashboardApi";

type DashboardStats = {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  qualifiedLeads: number;
  proposalSentLeads: number;
  wonLeads: number;
  lostLeads: number;
  totalEstimatedValue: number;
  totalWonValue: number;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

const chartStatuses = [
  { label: "New", key: "newLeads", color: "#3b82f6" },
  { label: "Contacted", key: "contactedLeads", color: "#8b5cf6" },
  { label: "Qualified", key: "qualifiedLeads", color: "#0f766e" },
  { label: "Proposal Sent", key: "proposalSentLeads", color: "#f59e0b" },
  { label: "Won", key: "wonLeads", color: "#16a34a" },
  { label: "Lost", key: "lostLeads", color: "#ef4444" },
] as const;

const LeadStatusChart = ({ stats }: { stats: DashboardStats }) => {
  const maxValue = Math.max(...chartStatuses.map((item) => Number(stats[item.key] || 0)), 1);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid rgba(148,163,184,0.24)",
        borderRadius: 3,
        background: "rgba(255,255,255,0.86)",
        boxShadow: "0 12px 28px rgba(2,6,23,0.06)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Leads by Status
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Distribution of all current leads.
            </Typography>
          </Box>
          <Chip
            label={`Total ${stats.totalLeads}`}
            size="small"
            sx={{ fontWeight: 700, bgcolor: "rgba(37,99,235,0.12)", color: "#1e3a8a" }}
          />
        </Box>

        <Box
          sx={{
            height: 260,
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
              xl: "repeat(6, minmax(0, 1fr))",
            },
            gap: 1.6,
            alignItems: "end",
          }}
        >
          {chartStatuses.map((item) => {
            const value = Number(stats[item.key] || 0);
            const height = `${Math.max((value / maxValue) * 100, value > 0 ? 12 : 3)}%`;

            return (
              <Box key={item.label} sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "end", height: "100%" }}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 92,
                    minHeight: 220,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: "#0f172a" }}>
                    {value}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height,
                      minHeight: 28,
                      borderRadius: 2,
                      background: `linear-gradient(180deg, ${item.color} 0%, rgba(59,130,246,0.18) 100%)`,
                      boxShadow: `0 10px 24px ${item.color}22`,
                      border: `1px solid ${item.color}33`,
                    }}
                  />
                </Box>
                <Typography variant="caption" sx={{ mt: 1, fontWeight: 700, color: "#475569" }}>
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

const ValuePieChart = ({ stats }: { stats: DashboardStats }) => {
  const estimated = Number(stats.totalEstimatedValue || 0);
  const won = Number(stats.totalWonValue || 0);
  const remaining = Math.max(estimated - won, 0);
  const total = Math.max(estimated, 1);

  const wonPercent = Math.max((won / total) * 100, 0);
  const remainingPercent = Math.max((remaining / total) * 100, 0);

  const radius = 66;
  const circumference = 2 * Math.PI * radius;
  const wonStroke = circumference * (wonPercent / 100);
  const remainingStroke = circumference * (remainingPercent / 100);

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid rgba(148,163,184,0.24)",
        borderRadius: 3,
        background: "rgba(255,255,255,0.86)",
        boxShadow: "0 12px 28px rgba(2,6,23,0.06)",
        height: "100%",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
              Value Mix
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total estimated value vs won value.
            </Typography>
          </Box>
          <Chip
            label={formatCurrency(estimated)}
            size="small"
            sx={{ fontWeight: 700, bgcolor: "rgba(14,165,233,0.12)", color: "#0c4a6e" }}
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "180px 1fr" },
            gap: 2,
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "grid", placeItems: "center" }}>
            <Box sx={{ position: "relative", width: 180, height: 180 }}>
              <svg viewBox="0 0 180 180" width="180" height="180">
                <circle cx="90" cy="90" r={radius} fill="none" stroke="#dbeafe" strokeWidth="22" />
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeDasharray={`${wonStroke} ${circumference - wonStroke}`}
                  transform="rotate(-90 90 90)"
                />
                <circle
                  cx="90"
                  cy="90"
                  r={radius}
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="22"
                  strokeLinecap="round"
                  strokeDasharray={`${remainingStroke} ${circumference - remainingStroke}`}
                  strokeDashoffset={-wonStroke}
                  transform="rotate(-90 90 90)"
                />
              </svg>

              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  placeItems: "center",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                  Won Share
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
                  {estimated ? `${Math.round(wonPercent)}%` : "0%"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Stack spacing={1.4}>
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.14)" }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                Total Estimated Value
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
                {formatCurrency(estimated)}
              </Typography>
            </Box>

            <Box sx={{ p: 2, borderRadius: 2, bgcolor: "rgba(22,163,74,0.08)", border: "1px solid rgba(22,163,74,0.14)" }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>
                Total Won Value
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: "#0f172a" }}>
                {formatCurrency(won)}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", gap: 1.2, flexWrap: "wrap" }}>
              <Chip label={`Won ${estimated ? Math.round(wonPercent) : 0}%`} size="small" sx={{ bgcolor: "rgba(37,99,235,0.12)", color: "#1e3a8a", fontWeight: 700 }} />
              <Chip label={`Open ${estimated ? Math.round(remainingPercent) : 0}%`} size="small" sx={{ bgcolor: "rgba(22,163,74,0.12)", color: "#166534", fontWeight: 700 }} />
            </Box>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

const DashboardPage = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10,
          }}
        >
          <CircularProgress />
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#0f172a" }}>
          Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.6 }}>
          Performance overview and lead pipeline indicators.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2.2,
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, minmax(0, 1fr))",
            xl: "repeat(3, minmax(0, 1fr))",
          },
        }}
      >
        <Box>
          <StatCard
            title="Total Leads"
            value={stats?.totalLeads ?? 0}
          />
        </Box>

        <Box>
          <StatCard
            title="New Leads"
            value={stats?.newLeads ?? 0}
          />
        </Box>

        <Box>
          <StatCard
            title="Qualified Leads"
            value={stats?.qualifiedLeads ?? 0}
          />
        </Box>

        <Box>
          <StatCard
            title="Won Leads"
            value={stats?.wonLeads ?? 0}
          />
        </Box>

        <Box>
          <StatCard
            title="Lost Leads"
            value={stats?.lostLeads ?? 0}
          />
        </Box>

        <Box>
          <StatCard
            title="Total Estimated Value"
            value={formatCurrency(stats?.totalEstimatedValue ?? 0)}
          />
        </Box>

        <Box>
          <StatCard
            title="Total Won Value"
            value={formatCurrency(stats?.totalWonValue ?? 0)}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "grid",
          gap: 2.2,
          gridTemplateColumns: { xs: "1fr", xl: "1fr 1fr" },
          mt: 3,
        }}
      >
        <LeadStatusChart stats={stats ?? {
          totalLeads: 0,
          newLeads: 0,
          contactedLeads: 0,
          qualifiedLeads: 0,
          proposalSentLeads: 0,
          wonLeads: 0,
          lostLeads: 0,
          totalEstimatedValue: 0,
          totalWonValue: 0,
        }} />
        <ValuePieChart stats={stats ?? {
          totalLeads: 0,
          newLeads: 0,
          contactedLeads: 0,
          qualifiedLeads: 0,
          proposalSentLeads: 0,
          wonLeads: 0,
          lostLeads: 0,
          totalEstimatedValue: 0,
          totalWonValue: 0,
        }} />
      </Box>
    </AppLayout>
  );
};

export default DashboardPage;