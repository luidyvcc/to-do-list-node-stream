import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const db = new Database();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;
      const dateNow = new Date().toISOString();
      const task = db.insert("tasks", {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: dateNow,
        updated_at: dateNow,
      });
      res.writeHead(201);
      res.end(JSON.stringify(task));
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;
      const tasks = db.select(
        "tasks",
        search
          ? {
              title: search,
              description: search,
            }
          : null
      );

      res.end(JSON.stringify(tasks));
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const data = {};
      if (title) data.title = title;
      if (description) data.description = description;

      if (Object.keys(data).length === 0) {
        res.writeHead(400);
        res.end(
          JSON.stringify({ message: "Title or description is required." })
        );
        return;
      }

      const updatedTask = db.update("tasks", id, data);

      if (updatedTask) {
        res.end(JSON.stringify(updatedTask));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Task not found." }));
      }
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const isDeleted = db.delete("tasks", id);
      if (!isDeleted) {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Task not found." }));
        return;
      }
      res.writeHead(204);
      res.end(JSON.stringify({ message: "Task deleted." }));
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;
      const task = db.select("tasks", { id })[0];
      const updatedTask = db.update("tasks", id, {
        completed_at: task.completed_at ? null : new Date().toISOString(),
      });
      res.end(JSON.stringify(updatedTask));
    },
  },
];
