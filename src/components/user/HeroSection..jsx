import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AuthForm from "./UserAuthForm";

export default function HeroSection() {

  const navigate = useNavigate();

  return (
    <section className="relative bg-black text-white overflow-hidden rounded-xl py-8 my-1">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-1/3 left-0 w-full h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 blur-3xl opacity-40"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/2 left-0 w-full h-32 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 blur-3xl opacity-30"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-10">
        {/* Left side */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-4xl  font-semibold leading-tight mt-6 lg:mt-4"
          >
            Welcome to WalletWiz <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Take control of your money, effortlessly
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-4 text-lg text-gray-100 max-w-md mx-auto lg:mx-0"
          >
            Connect accounts, track spending, and see where every penny goes in one smart dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mt-6 flex justify-center lg:justify-start gap-4"
          >
            <Button className="rounded-full bg-white text-black px-6 hover:bg-lime-200"
            onClick={() => navigate("/signup")}
            >
              Get Started
            </Button>
            
          </motion.div>
        </div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 flex justify-center"
        >
          <div className="min-w-[310px] sm:min-w-[384px] w-full lg:mt-4 max-w-sm backdrop-blur-xl rounded-xl">
          <AuthForm/>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
