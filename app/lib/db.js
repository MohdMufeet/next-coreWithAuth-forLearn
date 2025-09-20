

import mongoose from "mongoose";

const MONGO_URI = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.jkwxfi2.mongodb.net/Learning?retryWrites=true&w=majority&appName=Cluster0`;

const dbcon = async () => {
  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}; 

export default dbcon;