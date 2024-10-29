import { X } from "lucide-react";
import { useLogin, useRegister } from "../lib/auth";
import { useState } from "react";

export default function Modal({ formType, onClose, onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    setError("");
    setSuccess("");
    e.preventDefault();
    if (
      formType === "register" &&
      credentials.password !== credentials.confirmPassword
    ) {
      setError("Password tidak sama!");
      return;
    }
    try {
      setError("");
      if (formType === "login") {
        await loginMutation.mutateAsync(credentials);
        localStorage.getItem("username");
        onLoginSuccess(credentials.username);
        onClose();
      } else {
        const newUser = await registerMutation.mutateAsync({
          username: credentials.username,
          password: credentials.password,
        });
        setSuccess("Registrasi berhasil! Silahkan masuk.");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999]">
      <div className="flex flex-col bg-background rounded-md p-4 w-full max-w-xs border border-foreground relative">
        <button
          className="absolute top-4 right-4 text-foreground text-xl"
          onClick={onClose}
        >
          <X />
        </button>
        <p className="text-4xl">{formType === "login" ? "Masuk" : "Daftar"}</p>
        <form className="my-2 space-y-2" onSubmit={handleLogin}>
          <div className="flex items-center bg-black rounded-md p-2 w-full max-w-md border border-foreground">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
              value={credentials.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center bg-black rounded-md p-2 w-full max-w-md border border-foreground">
            <input
              type="password"
              name="password"
              placeholder="Kata Sandi"
              className="bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          {formType === "register" && (
            <div className="flex items-center bg-black rounded-md p-2 w-full max-w-md border border-foreground">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Konfirmasi Kata Sandi"
                className="bg-black border-none outline-none text-gray-400 placeholder-gray-500 pl-2 flex-1"
                value={credentials.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          )}
          {error && <p className="text-red-500">{error}</p>}{" "}
          {success && <p className="text-green-500">{success}</p>}{" "}
          <button
            type="submit"
            className={`bg-foreground text-black py-2 px-2 rounded-md max-w-xs ${loginMutation.isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loginMutation.isLoading || registerMutation.isLoading}
          >
            {formType === "login"
              ? loginMutation.isLoading
                ? "Loading..."
                : "Login"
              : registerMutation.isLoading
                ? "Loading..."
                : "Register"}
          </button>
          {(loginMutation.isError || registerMutation.isError) && (
            <p className="text-red-500">
              Error:{" "}
              {loginMutation.error?.message || registerMutation.error?.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
