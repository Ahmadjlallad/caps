const caps = require("socket.io")(3000);

caps.on("connection", (socket) => {
  socket.onAny((eventName, p) => {
    console.log(
      ` EVENT { 
   "event": ${eventName},
   "time": ${new Date().toISOString()},
   "payload": ${JSON.stringify(p).replaceAll(",", ",\n" + " ".padStart(15))}
              }\n`
    );
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("pickup", (data) => {
    caps.emit("pickup", data);
  });
  socket.on("in-transit", (p) => {
    caps.to(p.store).emit("in-transit", p);
  });
  socket.on("delivered", (p) => {
    caps.to(p.store).emit("delivered", p);
  });
});
