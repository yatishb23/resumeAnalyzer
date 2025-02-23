"use client";

import { useState, FormEvent } from "react";
import { useTheme } from "@/components/theme";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { theme } = useTheme();
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
    router.push("/");
  };

  return (
    <div
      className={`h-screen flex items-center justify-center px-4 transition-all ${
        theme === "light"
          ? "bg-gradient-to-br from-gray-100 to-white"
          : "bg-gradient-to-br from-gray-900 to-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>

        {/* Social Login */}
        <div className="space-y-4">
          {["linkedin", "google", "facebook"].map((provider) => (
            <button
              key={provider}
              className="flex items-center justify-center gap-2 w-full border rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Image src={`/${provider}.png`} alt={provider} width={20} height={20} />
              <span>{provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
            </button>
          ))}
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">OR</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 font-medium transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="#" className="text-purple-600 hover:underline">
            Forgot your password?
          </Link>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            First time here?{" "}
            <button
              onClick={() => router.push("/signup")}
              className="text-purple-600 hover:underline"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
