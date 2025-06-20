import { useState } from "react";
import axios from "axios"; 

function Login({updateUserDetails}) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    let isValid = true;
    let newErrors = {};

    if (formData.username.trim() === '') {
      isValid = false;
      newErrors.username = "Username is mandatory";
    }

    if (formData.password.trim() === '') {
      isValid = false;
      newErrors.password = "Password is mandatory";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const body = {
        username:formData.username,
        password:formData.password
      }
      const config = {
        withCredentials: true, // to send cookies with the request
      };
      try{
        const res = await axios.post('http://localhost:5002/auth/login', body, config)
        updateUserDetails(res.data.user); // update user details in parent component
      }
      catch (error) {
        console.log(error);
        setErrors({message: "something went wrong, please try again"});
      }
    }
  };

  return (
    <>
    <div className="container text-center">
      {errors.message && <p><strong>{errors.message}</strong></p>}
      <h1>Login Page</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <br />
          {errors.username && <span style={{ color: "red" }}>{errors.username}</span>}
        </div>

        <div className="mt-3">
          <label>Password:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          {errors.password && <span style={{ color: "red" }}>{errors.password}</span>}
        </div>

        <div className="mt-4">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default Login;
