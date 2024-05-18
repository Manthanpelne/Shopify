import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';


export const createUser = (userData) => {
  return new Promise(async (resolve) => {
    const response = await fetch("https://shopify-ten-pi.vercel.app/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    if(response.ok){
      const data = await response.json();
      resolve({ data });
      window.location.href = `${window.location.origin}/login`
      toast.success("Signup successfull")
    }else{
      const error = await response.text();
      reject({ error });
      toast.error("something went wrong. Try again")
    }
  });
};

export const loginUser = (loginInfo) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://shopify-ten-pi.vercel.app/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
        credentials: "include",
        withCredentials: true,
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
        window.location.href = `${window.location.origin}/`
         toast.success("Logged In successfully")
      } else {
        const error = await response.text();
        reject({ error });
        toast.error("Login failed. Check credentials!")

      }
    } catch (error) {
      reject({ error });
      toast.error("something went wrong")
    }
  });
};

export const checkAuth = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://shopify-ten-pi.vercel.app/auth/check", {
        credentials: "include",
        withCredentials: true,
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
};

export const signOut = () => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch("https://shopify-ten-pi.vercel.app/auth/logout", {
        credentials: "include",
        withCredentials: true,
      });
      if (response.ok) {
        resolve({ data:"successfully logged out" });
        //window.location.href = `${window.location.origin}/login`
        toast.success("Logged out successfully")
      } else {
        const error = await response.text();
        reject({ error });
        toast.error("something went wrong")
      }
    } catch (error) {
      reject({ error });
      toast.error("something went wrong")
    }
  });
};

export const resetPasswordRequest = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://shopify-ten-pi.vercel.app/auth/reset-password-request",
        {
          method: "POST",
          body: JSON.stringify({ email }),
          headers: { "content-type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
        toast.success("Email sent successfully")
      } else {
        const error = await response.text();
        reject({ error });
        toast.error("something went wrong")
      }
    } catch (error) {
      reject({ error });
      toast.error("something went wrong")
    }
  });
};


export const resetPasswordApi = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://shopify-ten-pi.vercel.app/auth/reset-password",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
          credentials: "include",
          withCredentials: true,
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
        toast.success("New password saved successfully")
      } else {
        const error = await response.text();
        reject({ error });
        toast.error("something went wrong")
      }
    } catch (error) {
      reject({ error });
      toast.error("something went wrong")
    }
  });
};
