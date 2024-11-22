const User = require("../server/models/user-model.js");


// *-------------------
// Home Logic
// *-------------------
const home = async (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};

// *-------------------------------
//* User Registration Logic 📝
// *-------------------------------
// 1. Get Registration Data: 📤 Retrieve user data (username, email, password).
// 2. Check Email Existence: 📋 Check if the email is already registered.
// 3. Hash Password: 🔒 Securely hash the password.
// 4. Create User: 📝 Create a new user with hashed password.
// 5. Save to DB: 💾 Save user data to the database.
// 6. Respond: ✅ Respond with "Registration Successful" or handle errors.

const register = async (req, res) => {
  try {
    // const data = req.body;
    console.log(req.body);
    const { username, email, phone, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    const userCreated = await User.create({ username, email, phone, password });

    // res.status(201).json({ msg: "User registered successfully" });
    res.status(200).json({ msg: userCreated });
  } catch (error) {
    res.status(500).json("Internal server error");
  }
};

//login logic

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
      const userExist = await User.findOne({ email });
      if (!userExist) {
          return res.status(400).json({ msg: 'Invalid credentials' });
      }

      if (userExist.password !== password) {  // Compare plain text passwords
          return res.status(400).json({ msg: 'Invalid credentials' });
      }

      res.status(200).json({ msg: 'Login successful' });
  } catch (err) {
      // res.status(500).send('Server error');
      next(error)
  }
};

module.exports = { home, register, login };
