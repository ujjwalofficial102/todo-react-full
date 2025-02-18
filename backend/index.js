const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

//Middleware
app.use(express.json());
app.use(cors());
// app.use(cors({ origin: "http://localhost:3001", optionsSuccessStatus: 200 }));

//Routes
app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Wrong Inputs!",
    });
    return;
  }
  //put it in mongodb
  await todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });
  res.json({
    msg: "Todo created",
  });
});

app.get("/todos", async (req, res) => {
  const todos = await todo.find({});
  res.json({
    todos,
  });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({
      msg: "Wrong Inputs!",
    });
    return;
  }
  //put it in mongodb
  await todo.updateOne(
    { _id: new mongoose.Types.ObjectId(updatePayload.id) },
    { completed: true }
  );
  res.json({
    msg: "Todo marked as completed",
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
