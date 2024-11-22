import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Login.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle input field values
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Login Successful");
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        toast.error(res_data.extraDetails || res_data.message);
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="login-section">
      <main>
        <div className="login-container">
          <div className="login-image">
            <img
              src="src/assets/images/register.png"
              alt="a nurse with a cute look"
              className="login-img"
            />
          </div>

          {/* Login Form */}
          <div className="login-form">
            <h1 className="login-heading mb-3">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="Enter your email"
                  className="input-field"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Enter your password"
                  className="input-field"
                />
              </div>

              <div className="form-btn">
                <button type="submit" className="btn-submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login;
