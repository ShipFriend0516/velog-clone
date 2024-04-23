import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  mongoose.connect(`mongodb://oracion:${process.env.DB_PW}@localhost:27017/?authSource=admin`, {
    dbName: "velog",
    autoIndex: true,
  });
};

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Connect Fail!", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("MongoDB Connection Disconnected! Retrying connection...");
  connect();
});

export default connect;