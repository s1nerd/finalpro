const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require('cors');
const path = require('path');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  const user = jwt.verify(token, "inikodesangatsangatrahasia");
  req.userId = user.userId;
  next();
}

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  methods: "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  optionsSuccessStatus: 200
}));

//bikin api disini, referensi nya bisa pake backend/index.js di homework 13 dan 14 yahh

//register api
app.post("/register", async (req, res) => {
  const { first_name, last_name, username, email, password, user_address } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const { password: passwordDB, ...user } = await prisma.user.create({
      data: {
        first_name,
        last_name,
        username,
        email,
        password: hashedPassword,
        user_address,
      },
    });
    res.json({ user });
  }
  catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, "inikodesangatsangatrahasia");
    res.setHeader("Set-Cookie", `token=${ token }; httpOnly; path=/`);
    res.json({ user });

  }
  catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid credentials" });
  }
});

// Start the server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});