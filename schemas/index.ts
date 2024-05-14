import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }
  await mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.2kgti7a.mongodb.net/`,
    {
      dbName: "velog",
      autoIndex: true,
    }
  );
};

mongoose.connection.on("connected", () => {
  console.log("Success to connect with database");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB Connect Fail!", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("MongoDB Connection Disconnected! Retrying connection after 5 seconds...");
  setTimeout(() => {
    connect();
  }, 5000);
});

export default connect;
