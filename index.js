require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Note = require("./models/note");

const app = express();

app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const note = new Note({
    content: body.content,
    important: false,
  });

  note.save().then((result) => {
    console.log("note saved!");
    mongoose.connection.close();
  });
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
