import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

import axios from 'axios';
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthContext"

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_AUTH}/api/auth/user/login`, {
        email,
        password,
      });

      const token = res.data.access_token;

      localStorage.setItem("token", token);

      const profileRes = await axios.get(`${import.meta.env.VITE_API_AUTH}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userName = profileRes.data.name;

      login(token, userName);
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome to MyHotel',
      }).then((result) => {
        navigate('/');
      });
    } catch (err) {
      console.error('Login gagal:', err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: err.response?.data?.msg || 'An error occurred while logging in.',
      });
      
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          Sign In
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form onSubmit={handleLogin} className="mx-auto max-w-[24rem] text-left">
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Email
              </Typography>
            </label>
            <Input
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="mail@example.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <div className="relative">
              <Input
                id="password"
                size="lg"
                placeholder="********"
                type={passwordShown ? "text" : "password"}
                className="w-full pr-12 placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
                labelProps={{
                  className: "hidden",
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={togglePasswordVisiblity}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {passwordShown ? (
                  <EyeIcon className="h-5 w-5" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5" />
                )}
              </div>
            </div>
          </div>
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>
          <Button
            type="submit"
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2 bg-black text-white"
            fullWidth
          >
            sign in
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <a href="/register" className="font-medium text-gray-900">
              Create account
            </a>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Login;