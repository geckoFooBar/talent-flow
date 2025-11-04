import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectMainDB } from "./config/mainDB.js";

const PORT = process.env.PORT || 8000;

(async () => {
  await connectMainDB();
  app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
})();
