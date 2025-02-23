"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/theme";
import Link from "next/link";
import Image from "next/image";

export default function SignupDialog() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", { name, email, password });
    router.push("/");
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 transition-all ${
        theme === "light"
          ? "bg-gradient-to-br from-gray-100 to-white"
          : "bg-gradient-to-br from-gray-900 to-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-lg p-8 shadow-lg ${
          theme === "light" ? "bg-white" : "bg-gray-900"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Create your account
        </h2>

        {/* Social Signup */}
        <div className="space-y-4">
          <button className="flex items-center justify-center gap-2 w-full border rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Image src="/linkedin.png" alt="LinkedIn" width={20} height={20} />
            <span>Sign up with LinkedIn</span>
          </button>
          <button className="flex items-center justify-center gap-2 w-full border rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800">
            <Image src="/google.png" alt="Google" width={20} height={20} />
            <span>Sign up with Google</span>
          </button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500">
              OR
            </span>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>

          {/* Checkbox for Terms and Privacy Policy */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="h-5 w-5 accent-purple-600"
              required
            />
            <label htmlFor="agree" className="text-sm text-gray-600 dark:text-gray-300">
              I agree to{" "}
              <Link href="#" className="text-purple-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-purple-600 hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 font-medium transition disabled:opacity-50"
            disabled={!agreed}
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
