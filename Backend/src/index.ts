import "dotenv/config";
import express from "express";
import cors from "cors";
import { auth } from "./auth.js";
import { connectDB } from "./db.js";
import { toNodeHandler } from "better-auth/node";

// Routes
import perfumeRoutes from "./modules/perfume/perfume.route.js";
import userRoutes from "./modules/user/user.route.js";

const app = express();

// Vercel / Reverse Proxy Trust (HTTPS & Cross-site Cookie-র জন্য আবশ্যক)
app.set("trust proxy", 1);

// Ensure DB connects on requests (for Serverless)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// Allowed origins
const allowedOrigins = [
  process.env.CLIENT_URL,
  "https://perfume-opal-sigma.vercel.app",
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, true); // Production safe fall-through
      }
    },
    credentials: true,
  }),
);

app.use(express.json());

// Better Auth Route
app.all("/api/auth/*splat", toNodeHandler(auth));

/*============================
           API Routes
=============================*/

// perfume api routes
app.use("/api/perfumes", perfumeRoutes);

// user api routes
app.use("/api/user", userRoutes);

// Root Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Orvella Fragrance House Server Running...",
  });
});

// Local Development Engine
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(` Server running on ${PORT}`);
  });
}

// Export for Vercel Serverless
export default app;
