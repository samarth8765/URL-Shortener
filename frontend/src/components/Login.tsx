import React, { useState } from "react";
import { InputElement } from "./InputElement";
import { loginSchema } from "../utils/validate";
import { ZodError } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useSetRecoilState } from "recoil";
import { isAuthenticatedAtom } from "../store/atom";
import { LoginProps } from "../utils/interfaces";

type LoginFormError = Partial<LoginProps>;

export const Login = (): JSX.Element => {
  const [loginForm, setLoginForm] = useState<LoginProps>({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState<LoginFormError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [loginServerError, setLoginServerError] = useState<string>("");

  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);

  const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, email: e.target.value });
  };

  const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, password: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      loginSchema.parse(loginForm);
      setLoginError({});
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/login",
          loginForm
        );
        const token = response.data.token;
        localStorage.setItem("jwtToken", token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } catch (err: any) {
        setLoginServerError(err.response.data.error);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: LoginFormError = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as keyof LoginFormError] = err.message;
          }
        });
        setLoginError(fieldErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center h-screen justify-start">
        <h1 className="text-4xl mb-4 mt-40">Login Here</h1>
        <div className="border p-8 rounded border-black ">
          <form onSubmit={onSubmit}>
            <InputElement
              name="email"
              label="Email"
              inputType="text"
              placeholder="abcd@email.com"
              onChange={setEmail}
              error={loginError.email}
            />

            <InputElement
              inputType="password"
              label="Password"
              placeholder="******"
              name="password"
              onChange={setPassword}
              error={loginError.password}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="border p-2 rounded border-black"
              >
                {loading ? "Submitting" : "Login"}
              </button>
            </div>
          </form>
          <div className="text-red-500 text-center font-bold">
            {loginServerError}
          </div>
        </div>
      </div>
    </div>
  );
};
