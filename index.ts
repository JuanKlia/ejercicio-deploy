import { firestore, rtdb } from "./database";
import * as express from "express";
import * as cors from "cors";
import { nanoid } from "nanoid";
import { database } from "firebase-admin";

const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(cors());


const port = process.env.PORT;

const userCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

app.get("/chat", (req, res) => {
  res.json(console.log("Hola"));
});

app.get("*", (req, res) => {
  console.log("Serving index.html for unknown route");
  res.sendFile(__dirname + "/dist/index.html");
});

app.post("/mesagge", (req, res) => {
  const { mensaje } = req.body;
  const { from } = req.body;
  const { userId } = req.body;
  const { roomId } = req.query;
  const objMensaje = { from: from, mensaje: mensaje, userId: userId };
  console.log(objMensaje);

  roomsCollection
    .doc(roomId.toString())
    .get()
    .then((snap) => {
      const rtdbId = snap.data().rtdbId;

      const roomRef = rtdb.ref("rooms/" + rtdbId);
      const messagesRef = roomRef.child("messages");
      messagesRef.push(objMensaje).then(() => {
        res.json("creadp" + objMensaje);
      });
    });
});
app.get("/prueba", (req, res) => {
  res.json("prueba");
});
app.post("/auth", (req, res) => {
  const { email } = req.body;
  const { nombre } = req.body;
  userCollection
    .where("email", "==", email)
    .get()
    .then((snapSerch) => {
      if (snapSerch.empty) {
        userCollection
          .add({
            email: email,
            nombre: nombre,
          })
          .then((snap) => res.json({ id: snap.id }));
      } else {
        res.json({ id: snapSerch.docs[0].id });
      }
    });
});

app.post("/messages", (req, res) => {
  const { mensaje } = req.body;
  const de = req.body.from;
  const { userId } = req.body;
  const { id } = req.query;

  userCollection
    .doc(userId)
    .get()
    .then((snap) => {
      if (snap.exists) {
        roomsCollection
          .doc(id.toString())
          .get()
          .then((snap) => {
            const rtdbId = snap.data().rtdbId;
            const roomRef = rtdb.ref("rooms/" + rtdbId);
            const messagesRef = roomRef.child("messages");
            messagesRef.push({ mensaje: mensaje, from: de });
          })
          .then(() => {
            res.status(201).json({ message: "Mensaje pusheado" });
          });
      } else {
        res.status(401).json({ mensaje: "No autorizado" });
      }
    });
});

app.post("/rooms", (req, res) => {
  const { userId } = req.body;

  userCollection
    .doc(userId)
    .get()
    .then((usersnap) => {
      if (usersnap.exists) {
        //Si el ID del usuario existe, se crea

        const nuevoId = nanoid();
        const roomRef = rtdb.ref("rooms/" + nuevoId);

        roomRef
          .set({
            owner: userId,
          })
          .then(() => {
            const roomLongId = roomRef.key;
            const roomShortId = 1000 + Math.floor(Math.random() * 999);
            roomsCollection
              .doc(roomShortId.toString())
              .set({ rtdbId: roomLongId })
              .then(() => {
                res.json({ status: "Room creada", id: roomShortId });
              });
          });
      } else {
        //Si no existe, no tiene permiso para crear
        res.status(401).json({ message: "No existis" });
      }
    });
});

app.get("/rooms/:roomId", (req, res) => {
  const { roomId } = req.params;
  const { userId } = req.query;

  userCollection
    .doc(userId.toString())
    .get()
    .then((snap) => {
      if (snap.exists) {
        roomsCollection
          .doc(roomId)
          .get()
          .then((snap) => {
            if (snap.exists) {
              res.json({ rtdbId: snap.data().rtdbId });
            } else {
              res.json({ rtdbId: false });
            }
          });
      } else {
        res.status(401).json({ massage: "No auth" });
      }
    });
});

app.listen(port, () => {
  console.log(`Arranco re piolita! http://localhost:${port}`);
});
