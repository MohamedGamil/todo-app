const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

setGlobalOptions({maxInstances: 10});

exports.addUser = onRequest(async (req, res) => {
  try {
    if (!admin.apps.length) {
      admin.initializeApp();
    }
    const {uid, name} = req.body;

    if (!uid) {
      res.status(400).send("Missing UID");
      return;
    }
    const userDoc = {
      UID: uid,
      name: name || "User",
      email: req.body.email || "",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    const docRef = await admin.firestore().collection("users").add(userDoc);
    res.status(200).send({id: docRef.id});
  } catch (error) {
    logger.error("Error adding user", error);
    res.status(500).send("Internal Server Error");
  }
});
