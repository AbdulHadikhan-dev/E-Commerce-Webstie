const express = require("express");
// const { ExpressAuth } = require("@auth/express");
const app = express();
const port = process.env.PORT || 3005;
const Product = require("./routes/product.js");
const Order = require("./routes/order.js");
const User = require("./routes/user.js");
const cors = require("cors");
const bodyParser = require("body-parser");


// setup authorization 
// app.set("trust proxy", true);
// app.use("/auth/*", ExpressAuth({ providers: [] }));


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/product", Product);
app.use("/api/order", Order);
app.use("/api/user", User);

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get('/api/endpoint', (req, res) => {
  res.send('API is working');
});

app.listen(port, () => {
  console.log(`HTTPS Server running on port ${port}`);
});
