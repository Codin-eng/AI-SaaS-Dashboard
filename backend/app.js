const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/auth/auth.routes");
const clientRoutes = require("./src/clients/clients.routes");

const errorHandler = require("./src/middleware/error.middleware");
const limiter = require("./src/middleware/ratelimit");

const aiRoutes = require("./src/ai/ai.routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/ai", aiRoutes);
app.use(errorHandler);

module.exports = app;