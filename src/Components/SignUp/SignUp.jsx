import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './SignUp.module.css'; // Import the CSS module

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("User registered successfully");
        setUser({ username: "", email: "", phone: "", password: "" });
        navigate("/login");
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred, please try again.");
    }
  };

  return (
    <>
      <section className={styles.sectionRegistration}>
        <main>
          <div className={styles.container}>
            <div className={styles.registrationImage}>
              <img
                src="src/assets/images/register.png"
                alt="A nurse with a cute look"
                className={styles.animatedImg}
              />
            </div>
            <div className={styles.registrationForm}>
              <h1 className={styles.mainHeading}>Registration Form</h1>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="Username"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Email"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
                    placeholder="Phone"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="Password"
                  />
                </div>
                <div className={styles.regBtn}>
                  <button type="submit" className={styles.submitBtn}>
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Register;
