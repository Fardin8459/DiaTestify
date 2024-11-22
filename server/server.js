require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const router = require("../server/auth-route.js");
const connectDb = require("../server/db.js");
const errorMiddleware = require("../server/error-middleware");


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", router);
app.use(errorMiddleware);

const PORT = 5001;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});