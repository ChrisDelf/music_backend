require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const sequelize = require("./config/sequelize");
/* const {logger} = require('./middleWare/logEvents') */
/* const connectDB = require('./config/connectDB') */
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const credentials = require("./middleware/credentials.js");
const corsOptions = require("./config/corsOptions");
const initDB = require("./scripts/initDB");
const socketScript = require("./scripts/socketScript");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { join } = require("node:path");

const PORT = process.env.PORT || 3500;

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// connecting to the database
initDB();
// routes

app.use("/auth", require("./routes/auth"));
app.use("/register", require("./routes/register_user"));
app.use("/refresh", require("./routes/refresh"));

app.use("/song", require("./routes/api/song"));
app.use("/role", require("./routes/role.js"));

// the links below will be restricted
/* app.use(verifyJWT) */
app.use("/addSong", require("./routes/api/addSong"));

app.use("/user", require("./routes/user.js"));
app.use("/logout", require("./routes/logout"));
app.use("/playlist", require("./routes/api/playlist"));
app.use("/like", require("./routes/api/like"));
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`),
);

const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for incoming messages from the client
  socket.on("message", (message) => {
    // Broadcast the message to all connected clients
    console.log(message)
    // io.emit("message", { ...message, sender: "server" });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
httpServer.listen(3000);
