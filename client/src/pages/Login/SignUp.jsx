import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Validation from './SignUpValidation';
import * as API from '../../api'



const initialState = {
  name: '',
  email: '',
  password: '',
};

function SignUp() {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(Validation(values));
    try {
      const { data } = await API.signup({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      console.log("data ===============>", data);

      if (data.success) {
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success('User Signed Up Successfully');
        if(JSON.parse(localStorage.getItem('auth'))?.user.role === 2){
          navigate('/dashboard/worker/booksForWorkers')
          window.location.reload();
        }else if(JSON.parse(localStorage.getItem('auth'))?.user.role === 0 ){
          navigate('/dashboard/user/books')
          window.location.reload();
        }
       ;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-400	 via-slate-600 to-slate-800">
      <div className="bg-gray-900 w-1/3 p-8 rounded-md shadow-lg">
        <h1 className="text-4xl font-extrabold text-center text-white mb-6">Sign-Up</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="text-white block mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              className="w-full rounded bg-gray-800 text-white py-2 px-3"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span className="text-red-500">{errors.name}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-white block mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded bg-gray-800 text-white py-2 px-3"
              name="email"
              onChange={handleInput}
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-white block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                className="w-full rounded bg-gray-800 text-white py-2 px-3"
                onChange={handleInput}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute bg-gray-800  top-1/2 right-0.5 transform -translate-y-1/2 text-white focus:outline-none"
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            {errors.password && <span className="text-red-500">{errors.password}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>

          <p className="text-gray-300  mt-3">
            Already have an account?{' '}
            <Link to="/" className="text-white font-bold">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
