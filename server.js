const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

//init Middleware
app.use(express.json({ extended:false }));

app.get("/", (req, res) => {
  res.send("API is Running");
});

//Define Routes
app.use('/api/users',require('./routers/api/users'));
app.use('/api/auth',require('./routers/api/auth'));
app.use('/api/products',require('./routers/api/products'));
app.use('/api/commandes',require('./routers/api/commandes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
