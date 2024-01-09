// Create web server
// 1. Create web server
// 2. Create route
// 3. Create route handler
// 4. Listen on port
// 5. Test route in browser

const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto"); // randomBytes is a function
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {}; // store comments in memory

// Route handler
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []); // return an empty array if commentsByPostId[req.params.id] is undefined
});

// Route handler
app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex"); // generate a random comment id
  const { content } = req.body; // get content from request body

  const comments = commentsByPostId[req.params.id] || []; // get comments from commentsByPostId object
  comments.push({ id: commentId, content }); // add new comment to comments array
  commentsByPostId[req.params.id] = comments; // store comments array in commentsByPostId object

  res.status(201).send(comments); // send back comments array
});

// Listen on port 4001
app.listen(4001, () => {
  console.log("Listening on 4001");
});