"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", { name, email, password });
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8 bg-backgound">
      <Card className="w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">
            Create your account
          </CardTitle>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Enter your details to get started
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Social Signup */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white"
            >
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/linkedin.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="w-5 h-5 bg-neutral-200 dark:bg-neutral-700 rounded"
                />
                <span>Sign up with LinkedIn</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white"
            >
              <div className="flex items-center justify-center gap-2">
                <Image
                  src="/google.png"
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="w-5 h-5 bg-neutral-200 dark:bg-neutral-700 rounded"
                />
                <span>Sign up with Google</span>
              </div>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-neutral-200 dark:bg-neutral-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-neutral-900 px-2 text-neutral-500 dark:text-neutral-400">
                OR
              </span>
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-neutral-400 dark:focus:border-neutral-600"
              />
            </div>

            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-neutral-400 dark:focus:border-neutral-600"
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:border-neutral-400 dark:focus:border-neutral-600"
              />
            </div>

            {/* Checkbox for Terms and Privacy Policy */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agree"
                checked={agreed}
                onCheckedChange={() => setAgreed(true)}
                className="border-neutral-300 dark:border-neutral-700 data-[state=checked]:bg-neutral-900 dark:data-[state=checked]:bg-white data-[state=checked]:border-neutral-900 dark:data-[state=checked]:border-white"
              />
              <label
                htmlFor="agree"
                className="text-sm text-neutral-600 dark:text-neutral-400 leading-none"
              >
                I agree to{" "}
                <Link
                  href="#"
                  className="text-neutral-900 dark:text-white hover:underline font-medium"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="#"
                  className="text-neutral-900 dark:text-white hover:underline font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              disabled={!agreed}
              className="w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign Up
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-neutral-900 dark:text-white hover:underline font-medium"
              >
                Log In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
