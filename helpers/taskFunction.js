const { taskData } = require("./registerUser");

const createTask = (req, res) => {
  const { title } = req.body;
  const taskId = req.token.id;
  const task = { taskId, title };
  if (taskData.push(task)) {
    res.status(201).json({ message: "task created" });
  } else {
    res.status(400).json({ message: "task not created" });
  }
};

const displayTask = (req, res) => {
  const userId = req.token.id;
  const tasks = taskData.filter((task) => task.taskId === userId).map((task) => task.title);
  res.status(200).json({ tasks });
};

module.exports = { createTask, displayTask };
