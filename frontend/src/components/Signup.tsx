import React, { useState } from "react";
import { InputElement } from "./InputElement";
import { signupSchema } from "../utils/validate";
import { ZodError } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { SignupForm } from "../utils/interfaces";

type SignUpFormErrors = Partial<SignupForm>;

export const Signup = () => {
  const [signupForm, setSignupForm] = useState<SignupForm>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<SignUpFormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      signupSchema.parse(signupForm);
      setError({});
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/signup",
          signupForm
        );
        console.log(JSON.stringify(response));
        navigate("/login");
      } catch (err: any) {
        const error = err.response.data.error;
        setServerError(error);
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      if (error instanceof ZodError) {
        const fieldErrors: SignUpFormErrors = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0] as keyof SignUpFormErrors] = err.message;
          }
        });

        setError(fieldErrors);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center h-screen justify-start">
        <h1 className="text-4xl text-center mb-6 mt-40">SignUp Here</h1>
        <div className=" border border-black p-7 rounded">
          <form onSubmit={onSubmit}>
            <InputElement
              name="username"
              label="Username"
              inputType="text"
              placeholder="John"
              onChange={handleChange}
              error={error.username}
            />

            <InputElement
              name="email"
              label="Email"
              inputType="text"
              placeholder="abcd@email.com"
              onChange={handleChange}
              error={error.email}
            />

            <InputElement
              name="password"
              label="Password"
              inputType="password"
              placeholder="******"
              onChange={handleChange}
              error={error.password}
            />

            <InputElement
              name="confirmPassword"
              label="Confirm Password"
              inputType="password"
              placeholder="******"
              onChange={handleChange}
              error={error.confirmPassword}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-3 py-2 border rounded border-black"
              >
                {loading ? "Submitting" : "Signup"}
              </button>
            </div>
            <p className="text-red-700 font-bold text-center">{serverError}</p>
          </form>
        </div>
      </div>
    </div>
  );
};
