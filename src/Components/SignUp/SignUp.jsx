import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
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
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success('User registered successfully');
        setUser({ username: '', email: '', phone: '', password: '' });
        navigate('/login');
      } else {
         // Check if the error message from the backend is related to email already existing
         if (response.status === 400) {
          toast.error("This email is already registered. Please try logging in.");
        } else {
          toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
      }
    } catch (error) {
      console.error('Error', error);
      toast.error('An error occurred, please try again.');
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen ">
      <div className="flex flex-col md:flex-row max-w-6xl items-center gap-8 bg-gradient-to-r from-green-200 via-blue-300 to-purple-400 hover:shadow-2xl rounded-lg shadow-lg p-6">
      {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="src/assets/images/register.png"
            alt="A nurse with a cute look"
            className="w-full h-auto"
          />
        </div>

        {/* Registration Form */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-6 text-gray-800 relative after:content-[''] after:block after:w-1/2 after:h-1 after:bg-blue-500 after:mt-2">
            Registration Form
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-lg font-medium text-gray-800">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleInput}
                placeholder="Username"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-lg font-medium text-gray-800">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleInput}
                placeholder="Email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-lg font-medium text-gray-800">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                value={user.phone}
                onChange={handleInput}
                placeholder="Phone"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-lg font-medium text-gray-800">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-500 rounded-full hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
