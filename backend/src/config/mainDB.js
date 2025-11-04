import mongoose from "mongoose";

export const connectMainDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_MAIN_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`✅ Main DB Connected: ${conn.connection.name}`);
  } catch (err) {
    console.error("❌ Main DB connect failed:", err.message);
    process.exit(1);
  }
};
