export const createUser = (userData) => {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
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
      } else {
        const error = await response.text();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
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
      } else {
        const error = await response.text();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
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
      } else {
        const error = await response.text();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
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
      } else {
        const error = await response.text();
        reject({ error });
      }
    } catch (error) {
      reject({ error });
    }
  });
};
