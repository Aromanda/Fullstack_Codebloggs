import express from "express";
import db from "../conn.mjs";
import { ObjectId } from "mongodb";
import cookieParser from 'cookie-parser';
import sessionSchema from "../schemas/session.schemas.mjs";

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
        const insertResult = await db.collection('session').insertOne(cookieDocument);
        
        if (insertResult.insertedCount === 1) {
          const insertedDocumentId = insertResult.insertedId;
          const retrievedDocument = await db.collection('session').findOne({ _id: insertedDocumentId });
          console.log(retrievedDocument);
        }
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

router.get('/validate_token', async (req, res) => {
  const token = req.query.token;
  console.log('Token:', token);
  const objectIdFromToken = token.split('_')[0];
  console.log('objectIdFromToken:', objectIdFromToken);

  let collection = await db.collection('session');

  if (!ObjectId.isValid(objectIdFromToken)) {
      res.status(400).json({ error: 'Invalid token format.' });
      return;
  }
  
  let query = { userId: new ObjectId(objectIdFromToken), cookie: token };
  console.log('Query:', query);

  let result = await collection.findOne(query);
  console.log('Result:', result);

  if (!result) {
      res.status(404).json({ error: 'Token not found.' });
  } else {
      res.status(200).json({ message: 'Token is valid.' });
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
