import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Validation from './LoginValidation';
import GLogin from './GLogin';
import * as API from '../../api'


const LoginForm = ({ handleSubmit, handleInput, errors, showPassword, toggleShowPassword }) => (
  <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
    <div className="flex flex-col w-full">
      <label htmlFor="email" className="text-white block mb-1">
        Email
      </label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        id="email"
        onChange={handleInput}
        className="w-full rounded bg-gray-800 text-white py-2 px-3 "
      />
      {errors.email && <span className="text-red-500 ">{errors.email}</span>}
    </div>

    <div className="w-full">
      <label htmlFor="password" className="text-white block mb-1">
        Password
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          name="password"
          id="password"
          onChange={handleInput}
          className="w-full rounded bg-gray-800 text-white py-2 px-3 "
        />
        <span onClick={toggleShowPassword} className="absolute bg-gray-800  top-1/2 right-0.5 transform -translate-y-1/2 text-white focus:outline-none">
          <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
        </span>
      </div>
      {errors.password && <span className="text-red-500 ">{errors.password}</span>}
    </div>

    <button
      type="submit"
      className="w-full h-10  bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded"
    >
      Log In
    </button>
  </form>
);

const Login = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(Validation(values));

    try {
      const { data } = await API.login({
        email: values.email,
        password: values.password,
      });

      if (data.success) {
        localStorage.setItem("auth", JSON.stringify(data));
        toast.success('User Logged In Successfully');
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
      toast.error("An error occurred")
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen bg-gradient-to-r from-slate-400	 via-slate-600 to-slate-800">
      <div className="bg-gray-900 w-1/3 p-8 rounded-md shadow-lg">
        <h1 className="text-4xl text-center font-extrabold text-white mb-4">Log-In</h1>
        <LoginForm
          handleSubmit={handleSubmit}
          handleInput={handleInput}
          errors={errors}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
        <p className="text-white mt-4">
          Don't have an account?{' '}
          <Link to="/signUp" className="text-white font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
