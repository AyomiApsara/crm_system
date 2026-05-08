import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/sequelize";
import User from "./models/user.model";
import bcrypt from "bcryptjs";

dotenv.config();

const PORT = process.env.PORT || 5000;

const seedUsers = async () => {
  const adminEmail = process.env.SEED_ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || "password123";

  const salespersonEmail = process.env.SEED_SALESPERSON_EMAIL || "john@example.com";
  const salespersonPassword = process.env.SEED_SALESPERSON_PASSWORD || "spjoh123";

  // Admin
  const admin = await (User as any).findOne({ where: { email: adminEmail } });
  if (!admin) {
    const hash = await bcrypt.hash(adminPassword, 10);
    await (User as any).create({ name: "Admin User", email: adminEmail, password: hash, role: "admin" });
    console.log("Seeded admin user:", adminEmail);
  }

  // Salesperson
  const sp = await (User as any).findOne({ where: { email: salespersonEmail } });
  if (!sp) {
    const hash = await bcrypt.hash(salespersonPassword, 10);
    await (User as any).create({ name: "Salesperson", email: salespersonEmail, password: hash, role: "salesperson" });
    console.log("Seeded salesperson user:", salespersonEmail);
  }
};

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection OK");

    // Sync models (create tables if not exist)
    await sequelize.sync({ alter: true });
    console.log("Database synced (tables created/updated)");

    // Seed admin & salesperson
    await seedUsers();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Unable to start server:", err);
    process.exit(1);
  }
};

start();