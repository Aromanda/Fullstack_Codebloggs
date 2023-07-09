import express from "express";
import db from "../conn.mjs";
import { ObjectId } from "mongodb";
import cookieParser from 'cookie-parser';

const router = express.Router();
router.use(cookieParser());

// This section will help you get a list of all the users.
router.get("/", async (req, res) => {
  let collection = await db.collection("user");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single user by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("user");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

router.post("/session", async (req, res) => {
  try {
    let { userId, email, password } = req.body;
    let collection = await db.collection("user");
    let user;

    if (userId) {
      user = await collection.findOne({ _id: new ObjectId(userId) });
    } else {
      user = await collection.findOne({ email: email });
    }

    if (!user || (!userId && password !== user.password)) {
      res.status(400).json({error: "invalid information"});
    } else {
      // Initialize user session upon successful login
      req.session.user = { id: user._id, email: user.email };

      const userId = user._id.toString();
      const cookieValue = `${userId}_${Date.now()}`; // A unique, secure value
  
      // Set the cookie in the user's browser
      res.cookie('connect.sid', cookieValue, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
      
      // Save the cookie to MongoDB
      const cookieDocument = {
        userId: userId,
        email: user.email,
        cookie: cookieValue,
        createdAt: new Date() // current date/time
      };
  
      try {
        await db.collection('session').insertOne(cookieDocument);
      } catch (e) {
        console.error(e);
      }

      res.status(200).json({
        status: 'ok',
        data: { token: cookieValue },
        message: 'session saved successfully'
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "An error occurred"});
  }
});

// This section will help you update a user by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      email: req.body.email,
      password: req.body.password,
    }
  };

  let collection = await db.collection("user");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a user
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("user");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
