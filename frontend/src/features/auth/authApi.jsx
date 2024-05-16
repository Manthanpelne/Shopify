import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';


export const createUser = (userData) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    if(response.ok){
      const data = await response.json();
      resolve({ data });
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
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
        credentials: "include",
        withCredentials: true,
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
        toast.success("Login successfull")
        return 
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
      const response = await fetch("http://localhost:8080/auth/check", {
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
      const response = await fetch("http://localhost:8080/auth/logout", {
        credentials: "include",
        withCredentials: true,
      });
      if (response.ok) {
        resolve({ data:"successfully logged out" });
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
        "http://localhost:8080/auth/reset-password-request",
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
        "http://localhost:8080/auth/reset-password",
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
