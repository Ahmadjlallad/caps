"use strict";
const caps = require("socket.io")(3000);
const { v4: uuidv4 } = require("uuid");

let MessageQueue = {
  Driver: {},
  Vendor: {},
};
/**
 * @param {payload} payload
 * @param {Diver | Vendor} type
 * @param {pickup | delivered} event
 * @param {message ID} id
 * @description use to add a message to the queue and send it to the client
 */
const addToQueue = (payload, type, event, id) => {
  if (event === "pickup") {
    type[id] = { event, payload };
  } else {
    type[payload.store] ??= {};
    type[payload.store][id] = { event, payload };
  }
};
caps.on("connection", (socket) => {
  socket.onAny((eventName, p) => {
    console.log(
      ` EVENT { 
   "event": ${eventName},
   "time": ${new Date().toISOString()},
   "payload": ${JSON.stringify(p || "").replaceAll(
     ",",
     ",\n" + " ".padStart(15)
   )}
              }\n`
    );
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("pickup", (p) => {
    const id = uuidv4();
    addToQueue(p, MessageQueue.Driver, "pickup", id);
    caps.emit("pickup", {
      messageID: id,
      payload: p,
    });
  });
  socket.on("in-transit", (p) => {
    caps.to(p.payload.store).emit("in-transit", p);
  });
  socket.on("delivered", (p) => {
    const id = uuidv4();
    addToQueue(p.payload, MessageQueue.Vendor, "delivered", id);
    caps.to(p.payload.store).emit("delivered", {
      messageID: id,
      payload: p.payload,
    });
  });
  socket.on("received", (p) => {
    if (p.event === "Driver") {
      delete MessageQueue.Driver[p.messageID];
    } else if (p.event === "Vendor") {
      let de = MessageQueue.Vendor[p.payload.store];
      delete de[p.messageID];
    }
  });
  socket.on("getAll", (store = null) => {
    if (store && Object.keys(MessageQueue.Driver).length > 0) {
      Object.entries(MessageQueue.Driver).forEach(([key, value]) => {
        socket.emit(value.event, { payload: value.payload, messageID: key });
      });
    }
    if (MessageQueue?.Vendor[store]) {
      Object.entries(MessageQueue?.Vendor[store]).forEach(([key, value]) => {
        caps
          .to(store)
          .emit(value.event, { payload: value.payload, messageID: key });
      });
    }
  });
});
