import { useMutation, useQuery } from "@tanstack/react-query";

const login = async (credentials) => {
  const response = await fetch("http://localhost:3005/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) throw new Error("Invalid credentials");

  const data = await response.json();
  localStorage.setItem("token", data.data.token);
  localStorage.setItem("username", data.data.username);
  localStorage.setItem("userId", data.data.userId);

  console.log(data);
  return data.user;
};

const register = async (credentials) => {
  const response = await fetch("http://localhost:3005/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  const data = await response.json();
  console.log(response.status);
  if (response.status >= 400) throw new Error(data.error);

  console.log(data);
  return data;
};

const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

export const useLogin = () =>
  useMutation({
    mutationFn: login,
  });
export const useLogout = () =>
  useMutation({
    mutationFn: logout,
  });
export const useRegister = () =>
  useMutation({
    mutationFn: register,
  });
