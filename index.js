const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const plainUsers = [
  { name: "KunalRajnish", password: "iloveu" },
];

app.post('/login', (req, res) => {
  const { name, password } = req.body;
  console.log(req.body);

  if (!name || !password) {
    return res.status(400).json({ success: false, message: 'Missing name or password' });
  }

  const foundUser = plainUsers.find(
    user => user.name === name && user.password === password
  );

  if (foundUser) {
    res.json({ success: true, message: `Welcome, ${name}!` });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
