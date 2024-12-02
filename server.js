const express = require("express");
const app = express();
const port = 3000;

let dummyUsers = [
  {
    id: 1,
    name: "Daniel Paiz",
    quote: "The secret of getting ahead is getting started.",
  },
  {
    id: 2,
    name: "Curious Cucumber",
    quote:
      "Courage is resistance to fear, mastery of fear, not absence of fear",
  },
  {
    id: 3,
    name: "Precious Poppy",
    quote:
      "Truth is stranger than fiction, but it is because Fiction is obliged to stick to possibilities; Truth isn't.",
  },
];

// Middleware to parse JSON request bodies
app.use(express.json());

// ROUTES
// CREATE snippets - WORKING
app.post("/snippets", (req, res) => {
  const newSnippet = {
    id: dummyUsers.length + 1,
    name: req.body.name,
    quote: req.body.quote,
  };
  dummyUsers.push(newSnippet);
  res.status(201).json(newSnippet);
});

// GET ALL snippets - WORKING
app.get("/snippets", (req, res) => {
  res.json(dummyUsers);
});

// GET ONE BY ID snippet - WORKING
app.get("/snippets/:id", (req, res) => {
  const user = dummyUsers.find(
    (u) => u.id === parseInt(req.params.id)
);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// DELETE ONE BY ID snippet - WORKING
app.delete("/snippets/:id", (req, res) => {
  const userIndex = dummyUsers.findIndex(
    (u) => u.id === parseInt(req.params.id)
  );

  if (userIndex != -1) {
    const deletedUser = dummyUsers.splice(userIndex, 1);
    res.json(deletedUser);
  } else {
    res.status(404).send("User not found");
  }
  res.send("Got a DELETE request at /snipper/:id");
});

// UPDATE ONE BY ID snippet - WORKING
app.put("/snippets/:id", (req, res) => {
    const userIndex = dummyUsers.findIndex(
        (u) => u.id === parseInt(req.params.id)
    );
    // validate 
    if(userIndex !== -1) {
        if(dummyUsers[userIndex].name !== req.body.name) {
            dummyUsers[userIndex].name = req.body.name;
        }
        if(dummyUsers[userIndex].quote !== req.body.quote) {
            dummyUsers[userIndex].quote = req.body.quote;
        }
        res.json(dummyUsers[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});


// Listening for REQUESTS from site-visitors
app.listen(port, () => {
  console.log(`Listening on port.. ${port}`);
});
