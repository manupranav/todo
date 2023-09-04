const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const routes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();
const PORT = process.env.port || 5001;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(`Ran into an error:  ${err}`));

app.use(routes);
app.use("/auth", authRoutes);
app.listen(PORT, () => console.log(`Listeneing on: http://127.0.0.1:${PORT}`));
