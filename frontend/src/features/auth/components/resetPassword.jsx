import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPasswordApiAsync, selectPasswordReset } from "../authSlice";
//import { checkUserAsync, selectError } from "../authSlice";

export const ResetPass = () => {
 const passwordReset = useSelector(selectPasswordReset)
 const query = new URLSearchParams(window.location.search)
const token = query.get("token")
const email = query.get("email")

  const dispatch = useDispatch();
  //console.log(error)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log(errors)
  console.log(email,token)

  return (
    <>
      {(email && token) ? <div>
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
                    Reset Password
                  </h3>
                 
                </div>
              </div>

              <form
                noValidate
                onSubmit={handleSubmit((data) => {
                  console.log(data);
                  dispatch(resetPasswordApiAsync({email, token, password:data.password}))
                })}
                className="space-y-5"
              >
                <div className="px-5">
                  <label className="font-medium">Enter New Password</label>
                  <input
                    id="password"
                    type="=password"
                    name="password"
                    {...register("password", {
                      required: "Please enter new password",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `- at least 8 characters\n
                        - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                        - Can contain special characters`,
                      },
                    })}
                    className="w-full mt-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div className="px-5">
                  <label className="font-medium">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="=password"
                    {...register("confirmPassword", {
                        required: 'confirm password is required',
                        validate: (value, formValues) =>
                          value === formValues.password || 'password not matching',
                      })}
                    className="w-full mt-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                  />
                  {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
                 {passwordReset && (
                    <p className="text-green-500">Password successfully reset! ✅</p>
                  )}
                </div>
                <div className="px-4 py-3">
                  <button className="w-full px-4 py-2 text-white font-medium bg-gray-800 hover:bg-black active:bg-gray-600 rounded-lg duration-150">
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div> : <p>Incorrect link</p> }
    </>
  );
};
