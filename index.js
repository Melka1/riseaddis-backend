import express from "express";
import dotenv from "dotenv";

import cors from "cors";
import unitRoute from "./src/routes/unitRoute.js";
import siteRoute from "./src/routes/siteRoute.js";
import realestateRoute from "./src/routes/realestateRoute.js";
import galleryRoute from "./src/routes/galleryRoute.js";
import amenityRoute from "./src/routes/amenityRoute.js";
import paymentRoute from "./src/routes/paymentRoute.js";

const { WEBSITE_URL, PORT } = dotenv.config(process.cwd, ".env").parsed;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: WEBSITE_URL,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

app.use("/api/unit", unitRoute);
app.use("/api/site", siteRoute);
app.use("/api/realestate", realestateRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/amenity", amenityRoute);
app.use("/api/payment", paymentRoute);

app.get("/api", (req, res) => {
  res.json({
    message:
      "Hello, this is riseaddis, your most trusted realestate properties site provider",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

export { app };
