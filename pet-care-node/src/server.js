const express = require("express");
const cors = require("cors");
const app = express();
const port = 3001;

const petRoutes = require("./routes/petRoutes");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pets", petRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
