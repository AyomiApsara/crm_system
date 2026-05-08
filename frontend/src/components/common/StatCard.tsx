import {
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

interface Props {
  title: string;
  value: string | number;
}

const StatCard = ({ title, value }: Props) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid rgba(148,163,184,0.22)",
        borderRadius: 3,
        height: "100%",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
        boxShadow: "0 8px 24px rgba(15,23,42,0.06)",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.4,
            letterSpacing: 0.25,
            textTransform: "uppercase",
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {title}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#0f172a" }}
          >
            {value}
          </Typography>

          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 2,
              background: "linear-gradient(180deg, rgba(37,99,235,0.18) 0%, rgba(14,165,233,0.1) 100%)",
              border: "1px solid rgba(37,99,235,0.2)",
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;