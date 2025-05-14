import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { useRegisterUserMutation } from "../redux/api/authApi/authApi";
 

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(50, "Password must not exceed 50 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const [register, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate()
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const result = await register(data);
      console.log(result);
      if (result.error) {
        toast.error(result.error.data.message || "Registration failed");
         
      }
      if (result.data) {
        toast.success("User registration successfull!");
        navigate("/login")
      }
    } catch {
      toast.error("An error occurred during registration");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-360px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <section className="flex justify-center items-center min-h-[calc(100vh-360px)] bg-gradient-to-br from-black to-gray-900 py-16">
      <div className="w-full max-w-md p-8 bg-black/40 backdrop-blur-md rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <h2 className="text-3xl font-bold mb-6 text-center text-white tracking-wider">Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 tracking-wide">
              Name
            </label>
            <input
              {...registerField("name")}
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full p-3 bg-black/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 tracking-wide">
              Email
            </label>
            <input
              {...registerField("email")}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-black/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 tracking-wide">
              Password
            </label>
            <input
              {...registerField("password")}
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-black/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
            />
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 tracking-wide">
              Confirm Password
            </label>
            <input
              {...registerField("confirmPassword")}
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              className="w-full p-3 bg-black/40 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-white text-black font-medium rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-200 shadow-lg hover:shadow-white/20"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default Signup; 