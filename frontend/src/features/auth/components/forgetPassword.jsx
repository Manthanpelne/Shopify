import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPasswordRequestAsync, selecMailSent } from "../authSlice";
//import { checkUserAsync, selectError } from "../authSlice";

export const ForgetPass = () => {

  const mailSent = useSelector(selecMailSent)
  const dispatch = useDispatch();
  //console.log(error)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div>
        <main className="w-full flex">
          <div className="relative flex-1 hidden items-center justify-center h-screen lg:flex">
            <img
              className="h-full border-black"
              src="https://i.pinimg.com/564x/29/65/46/2965467d65f2b58cf3fe3f810a0581c8.jpg"
              alt=""
            />
          </div>
          <div className="flex-1 flex items-center justify-center h-screen">
            <div className="w-full max-w-md space-y-8 px-4 auth bg-white text-gray-600 sm:px-0">
              <div className="">
                <h1 className="lg:hidden text-2xl font-bold text-center bg-slate-400 h-24 pt-7">
                  SHOPIFY
                </h1>
                <div className="mt-5 space-y-2">
                  <h3 className="text-gray-600 text-2xl font-bold sm:text-3xl text-center">
                    Forgot password
                  </h3>
                  <p className="text-center">
                    Back to login page?{" "}
                    <Link
                      to="/login"
                      href="javascript:void(0)"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>

              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  dispatch(resetPasswordRequestAsync(data.email))
                })}
                className="space-y-5"
              >
                <div className="px-5">
                  <label className="font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    {...register("email", {
                      required: "Please enter your email",
                      message: "Email is invalid",
                    })}
                    className="w-full mt-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div className="px-4 py-3">
                  <button className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-black active:bg-gray-600 rounded-lg duration-150">
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
