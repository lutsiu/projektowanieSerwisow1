import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { createUser } from "../api/api"; // Adjust this path to your API call file

const signUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, 
{
  message: "Passwords must match",
  path: ["confirmPassword"]
}); 

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    setLoading(true);
    setError(null); // Reset error state before the request

    try {

      
      // Make the API request to create the user
      await createUser({name: data.username, username: `@${data.username.toLowerCase()}`, "email": data.email, "password": data.password});
      setLoading(false);
      setSuccess(true); // Show success message on successful account creation
    } catch (err) {
      setLoading(false);
      setError("An error occurred while creating the account. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-xl bg-gray-800 p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">
          Create an Account
        </h2>

        {success ? (
          <div className="text-center">
            <p className="mb-4 text-green-400">
              ✅ Account created successfully! You can now log in.
            </p>
            <Link
              to="/login"
              className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-500 transition"
            >
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-white">Username</label>
              <input
                {...register("username")}
                className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:outline-none"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-400">{errors.username.message}</p>
              )}
            </div>

            <div>
              <label className="text-white">Email</label>
              <input
                type="email"
                {...register("email")}
                className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-white">Password</label>
              <input
                type="password"
                {...register("password")}
                className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:outline-none"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="text-white">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword")}
                className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-3 text-white focus:border-blue-500 focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            {error && (
              <p className="mt-1 text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-500 transition disabled:bg-gray-600"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
