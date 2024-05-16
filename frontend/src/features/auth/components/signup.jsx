import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectLoggedInUser, createUserAsync } from "../authSlice";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  //console.log(user)
  
  return (
      <div>
         {user?.token && <Navigate to="/login" replace={true}></Navigate> }
      <main className="w-full flex">
        <div className="relative flex-1 hidden items-center justify-center h-screen lg:flex">
          <img
            className="h-full border-black"
            src="https://i.pinimg.com/564x/29/65/46/2965467d65f2b58cf3fe3f810a0581c8.jpg"
            alt=""
          />
        </div>
        <div className="flex-1 flex items-center justify-center h-screen">
          <div className="w-full max-w-md space-y-8 px-4 bg-white auth text-gray-600 sm:px-0">
            <div className="">
              <h1 className="lg:hidden text-2xl font-bold text-center bg-slate-400 h-24 pt-7">
                SHOPIFY
              </h1>
              <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl text-center">
                  Sign up
                </h3>
                <p className="text-center">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    href="javascript:void(0)"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>

            <div className="relative">
              <span className="block w-full h-px bg-gray-300"></span>
              <p className="inline-block w-fit bg-white text-sm px-2 absolute -top-3 inset-x-0 mx-auto">
                or continue with
              </p>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                dispatch(createUserAsync({email:data.email, name:data.name, password:data.password, addresses:[], role:"user" }))
                console.log(data);
              })}
              className="space-y-5"
            >
              <div>
                <label className="font-medium">Name</label>
                <input
                  id="name"
                  {...register("name", { required: "Please enter your name" })}
                  type="text"
                  {...register("name")}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  {...register("email", {
                    required: "Please enter your email",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "Email is invalid",
                    },
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="font-medium">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  {...register("password", {
                    required: "Please enter password",
                    pattern: {
                      value:
                        /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/gi,
                      message: `*password must be 8 to 64 characters long\n
                      -contains a mix of upper and lower case characters\n
                      -one numeric and one special character`,
                    },
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div>
                <label className="font-medium">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: "password and confirm password are not matching",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "Password is not matching",
                  })}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-black active:bg-gray-600 rounded-lg duration-150">
                Create account
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignUp;
