const socket = require("socket.io");
const crypto = require("crypto");
const Chart = require("../models/chart");
const { timeStamp } = require("console");
const ConnectionRequestModel = require("../models/connectionRequest");

const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("_"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    //handel socket events
    socket.on("joinChart", ({ firstName, userId, targetUserId }) => {
      const roomId = getSecretRoomId(userId, targetUserId);
      socket.join(roomId);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          const roomId = getSecretRoomId(userId, targetUserId);


          const checkConnection = await ConnectionRequestModel.findOne({
            $or: [
              { fromUserId: userId, toUserId: targetUserId },
              { fromUserId: targetUserId, toUserId: userId },
            ],
          });
          if (!checkConnection) {
            return socket.emit("error", {
              message: "You are not connected with this user",
            });
          }

          // Save the message to the database here
          let chart = await Chart.findOne({
            participants: { $all: [userId, targetUserId] },
          });

          if (!chart) {
            chart = new Chart({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chart.messages.push({
            senderId: userId,
            text,
          });
          await chart.save();

          io.to(roomId).emit("messageRecived", { firstName, text ,timeStamp: new Date()});
        } catch (error) {
          console.error("Error saving message:", error);
        }
      }
    );
    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
