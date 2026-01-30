import "dotenv/config";
import express from "express";
import { prisma } from "@repo/database";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.get("/", async (req, res) => {
  console.log("DATABASE_URL present?", Boolean(process.env.DATABASE_URL));
  console.log("DATABASE_URL preview:", process.env.DATABASE_URL?.slice(0, 30));

  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`HTTP server is running on http://localhost:${PORT}`);
});
