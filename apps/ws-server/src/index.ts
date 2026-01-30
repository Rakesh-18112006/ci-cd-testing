import "dotenv/config";

import { WebSocketServer } from "ws";
import { prisma } from "@repo/database";
const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });
wss.on("connection", (ws) => {
  prisma.user
    .create({
      data: {
        username: `user_${Date.now()}`,
        password: "defaultpassword",
      },
    })
    .then((newUser) => {
      ws.send(`Welcome new user! Your ID is: ${newUser.id}`);
    });
  console.log("New client connected");
});
