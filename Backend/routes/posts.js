const express = require("express");
const router = express.Router();
const Todo = require("../schema/todo");

router.get("/", async (req, res) => {
  try {
    const items = await Todo.find({ idUser: req.user.id });
    return res.json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener los todos" });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const todo = new Todo({
      idUser: req.user.id,
      title: req.body.title,
      completed: false,
    });
    const todoInfo = await todo.save();
    console.log({ todoInfo });
    res.json(todoInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el todo" });
  }
});
// PUT /todos/:id
router.put("/:id", async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const todo = await Todo.findOne({ id: req.params.id });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    todo.title = req.body.title;
    todo.completed = req.body.completed;
    const todoInfo = await todo.save();
    console.log({ todoInfo });
    res.json(todoInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al actualizar el todo" });
  }
}
);
// DELETE /todos/:id
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const todoInfo = await todo.delete();
    console.log({ todoInfo });
    res.json(todoInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al eliminar el todo" });
  }
});

module.exports = router;
