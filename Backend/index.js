const connectToMongo=require("./db");
connectToMongo();
const express = require('express');
const cors =require("cors");
const app = express();
const port = 5000;
//A middleWare to  use req.body
app.use(express.json());
app.use(
  cors({
    origin:"*"
  })
)
//Avialable Routes
app.use("/api/auth",require("./routes/auth"));
app.use("/api/notes",require("./routes/notes"));


// app.get('/api/login', (req, res) => {
//   res.send('Hello login!');
// })

// app.get('/api/auth', (req, res) => {
//     res.send('Hello Auth!');
// })


// app.get('/api/user', (req, res) => {
//     res.send('Hello user!');
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})