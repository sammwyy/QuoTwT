import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";

/* Setup environment variables */
dotenv.config();

/* Initializing Application */
async function start() {
  /* Connect to Database */
  await mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Database connected.");

  /* Listen server */
  const { HOST, PORT } = process.env;
  app.listen(PORT, HOST, () => {
    console.log("Application listening on http://" + HOST + ":" + PORT + "/");
  });
}

start().catch((e) => {
  console.error(e);
  process.exit(2);
});
