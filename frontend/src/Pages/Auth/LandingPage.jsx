import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BarChart3,
  LineChart,
  Target,
  Bell,
  Smartphone,
  Shield,
  ArrowRight,
  Wallet,
  TrendingUp,
  LogIn,
  Sparkles,
  Github,
  Linkedin,
  Twitter,
  Code,
  Heart,
  Coffee,
  CheckCircle,
  DollarSign,
} from "lucide-react";

// Animated gradient background component
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden -z-10">
    <div className="absolute -inset-[10px] opacity-50">
      <div className="absolute top-0 -left-40 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute top-0 -right-40 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-40 left-20 w-80 h-80 bg-green-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      <div className="absolute -bottom-40 right-20 w-80 h-80 bg-emerald-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
    </div>
  </div>
);

// Floating particles component
const FloatingParticles = () => {
  const particles = Array(20).fill(null);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
      {particles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 rounded-full bg-emerald-500/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            transition: {
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      ))}
    </div>
  );
};

// Stats counter component
const CountUp = ({ end, duration = 2, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Tech badge component
const TechBadge = ({ name }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-[#1A231F] px-3 py-1 rounded-full text-sm text-emerald-400 border border-emerald-900/50"
  >
    {name}
  </motion.div>
);

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-white overflow-x-hidden relative">
      <AnimatedBackground />
      <FloatingParticles />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 sm:px-6 py-6 sm:py-8"
      >
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8 sm:mb-16 relative z-10">
          <motion.div
            className="flex items-center gap-2 text-2xl sm:text-3xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, 0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500" />
            </motion.div>
            <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
              SpendWise
            </span>
          </motion.div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Login Button */}
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="sm:hidden p-2 rounded-lg border-2 border-emerald-600 hover:bg-emerald-600/10 transition-all"
              >
                <LogIn className="w-5 h-5 text-emerald-500" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:flex border-2 border-emerald-600 px-6 py-2 rounded-lg hover:bg-emerald-600/10 transition-colors group"
              >
                <span>Login</span>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="ml-2"
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.button>
            </Link>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Smart finance tracking for everyone</span>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent block mb-2"
              >
                Master Your Money
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-white text-2xl md:text-4xl lg:text-5xl"
              >
                Shape Your Future
              </motion.span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Stop wondering where your money goes. Start tracking, start
              saving, start growing. Your personal finance companion that makes
              money management feel like a breeze.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-emerald-600/20 transition-all text-base sm:text-lg font-semibold flex items-center justify-center gap-2"
              >
                <span>Start Tracking Free</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="border-2 border-emerald-600/50 px-6 py-3 rounded-lg hover:bg-emerald-600/10 transition-all text-base sm:text-lg font-semibold"
                >
                  <span>I already have an account</span>
                </motion.button>
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm text-gray-400"
            >
              {[
                {
                  icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
                  text: "No credit card required",
                },
                {
                  icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
                  text: "Free forever plan",
                },
                {
                  icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
                  text: "Open source project",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative order-1 lg:order-2"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-xl blur-xl opacity-50"></div>
            <motion.div
              animate={{
                rotate: isHovered ? 5 : 0,
                scale: isHovered ? 1.02 : 1,
              }}
              className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl sm:rounded-2xl p-3 sm:p-6 relative"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                Live Demo
              </div>
              <div className="bg-[#121917] rounded-lg sm:rounded-xl p-4 sm:p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <h3 className="text-lg sm:text-2xl font-semibold">
                    Financial Dashboard
                  </h3>
                  <span className="text-emerald-500 text-sm sm:text-base">
                    April 2024
                  </span>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <div className="flex justify-between mb-2 text-sm sm:text-base">
                      <span>Monthly Budget</span>
                      <span className="text-emerald-500">75% on track</span>
                    </div>
                    <div className="h-2 sm:h-4 bg-[#1A231F] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "75%" }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-gradient-to-r from-emerald-600 to-green-600 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    <div className="bg-[#1A231F] p-2 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                        Income
                      </h4>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                        <p className="text-base sm:text-2xl font-bold text-emerald-500">
                          $4,250
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#1A231F] p-2 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                        Expenses
                      </h4>
                      <p className="text-base sm:text-2xl font-bold text-red-500">
                        $2,850
                      </p>
                    </div>
                    <div className="bg-[#1A231F] p-2 sm:p-4 rounded-lg">
                      <h4 className="text-gray-400 text-xs sm:text-sm mb-1 sm:mb-2">
                        Savings
                      </h4>
                      <p className="text-base sm:text-2xl font-bold text-emerald-500">
                        $1,400
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span>Groceries</span>
                      <div className="h-1.5 sm:h-2 w-24 sm:w-48 bg-[#1A231F] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "75%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="w-3/4 h-full bg-emerald-600 rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span>Entertainment</span>
                      <div className="h-1.5 sm:h-2 w-24 sm:w-48 bg-[#1A231F] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "50%" }}
                          transition={{ duration: 1, delay: 0.7 }}
                          className="w-1/2 h-full bg-green-600 rounded-full"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span>Transport</span>
                      <div className="h-1.5 sm:h-2 w-24 sm:w-48 bg-[#1A231F] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: "66%" }}
                          transition={{ duration: 1, delay: 0.9 }}
                          className="w-2/3 h-full bg-emerald-600 rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -bottom-10 -left-10 w-20 h-20 bg-emerald-500/10 rounded-full backdrop-blur-md border border-emerald-500/20 flex items-center justify-center"
            >
              <DollarSign className="w-8 h-8 text-emerald-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="absolute -top-5 -right-5 w-16 h-16 bg-green-500/10 rounded-full backdrop-blur-md border border-green-500/20 flex items-center justify-center"
            >
              <BarChart3 className="w-6 h-6 text-green-500" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Tech Stack Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm mb-4">
            <Code className="w-4 h-4" />
            <span>Built With Modern Tech</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Powered by cutting-edge
            <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
              {" "}
              technologies
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {[
            "React",
            "Node.js",
            "MongoDB",
            "Express",
            "JWT",
            "Tailwind CSS",
            "Framer Motion",
            "Vite",
            "Axios",
          ].map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TechBadge name={tech} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Powerful Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Everything you need to
            <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
              {" "}
              master your finances
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive suite of tools to track, analyze, and optimize your
            financial life with ease.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-gradient-to-b from-[#121917] to-[#1A231F] p-6 sm:p-8 rounded-xl sm:rounded-2xl border border-emerald-900/50 shadow-xl hover:shadow-emerald-500/5 transition-all"
            >
              <div className="bg-emerald-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Stats Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center"
        >
          {[
            {
              icon: <Code className="w-6 h-6 text-emerald-500" />,
              value: 15000,
              suffix: "+",
              label: "Lines of Code",
            },
            {
              icon: <Coffee className="w-6 h-6 text-emerald-500" />,
              value: 120,
              suffix: "",
              label: "Cups of Coffee",
            },
            {
              icon: <Github className="w-6 h-6 text-emerald-500" />,
              value: 42,
              suffix: "",
              label: "GitHub Commits",
            },
            {
              icon: <Heart className="w-6 h-6 text-emerald-500" />,
              value: 100,
              suffix: "%",
              label: "Passion",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#121917] p-4 sm:p-6 rounded-xl border border-emerald-900/50"
            >
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <h3 className="text-2xl sm:text-4xl font-bold text-white mb-1">
                <CountUp
                  end={stat.value}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix || ""}
                />
              </h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 sm:px-6 py-16 sm:py-24"
      >
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-xl blur-xl"></div>
          <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center relative border border-emerald-500/20 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 rounded-full backdrop-blur-md border border-emerald-500/20"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -bottom-16 -left-16 w-32 h-32 bg-green-500/10 rounded-full backdrop-blur-md border border-green-500/20"
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Open Source Project</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Ready to take control of your finances?
            </h2>
            <p className="text-gray-300 text-lg sm:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto">
              Start tracking your expenses, visualize your spending patterns,
              and make smarter financial decisions today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-4 rounded-lg hover:shadow-lg hover:shadow-emerald-600/20 transition-all text-lg font-semibold flex items-center justify-center gap-2 mx-auto"
            >
              <span>Get Started Now — It's Free</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-300">
              {[
                {
                  icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
                  text: "No credit card required",
                },
                {
                  icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
                  text: "Free forever plan",
                },
                {
                  icon: <CheckCircle className="w-4 h-4 text-emerald-500" />,
                  text: "Open source project",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Footer with Developer Info */}
      <footer className="bg-[#0A0F0D] border-t border-emerald-900/30 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-2xl font-bold mb-6"
            >
              <Wallet className="w-6 h-6 text-emerald-500" />
              <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
                SpendWise
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-4"
            >
              <Heart className="w-5 h-5 text-red-500" />
              <p className="text-gray-400">
                Made with love by{" "}
                <span className="text-emerald-500 font-medium">Shamit</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 mb-6"
            >
              <a
                href="https://github.com/iamshamit"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#121917] p-2 rounded-full hover:bg-emerald-500/10 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-400 hover:text-emerald-500" />
              </a>
              <a
                href="https://linkedin.com/in/iamshamit"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#121917] p-2 rounded-full hover:bg-emerald-500/10 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-emerald-500" />
              </a>
              <a
                href="https://twitter.com/iamshamit"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#121917] p-2 rounded-full hover:bg-emerald-500/10 transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-400 hover:text-emerald-500" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6"
            >
              <Link
                to="/register"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Login
              </Link>
              <a
                href="#features"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Features
              </a>
              <a
                href="https://github.com/iamshamit/spendwise"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-500 transition-colors"
              >
                Source Code
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border-t border-emerald-900/30 pt-8 flex flex-col md:flex-row justify-between items-center"
          >
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 SpendWise. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/iamshamit/Finance/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-500 transition-colors text-sm"
              >
                MIT License
              </a>
              <a
                href="https://github.com/iamshamit/Finance/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-emerald-500 transition-colors text-sm"
              >
                Report Issues
              </a>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2, type: "spring" }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleGetStarted}
          className="bg-gradient-to-r from-emerald-600 to-green-600 w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-emerald-500/20 transition-all"
        >
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </motion.div>
    </div>
  );
};

// Define keyframes for the blob animation in your CSS
const features = [
  {
    icon: <BarChart3 className="w-8 h-8 text-emerald-500" />,
    title: "Smart Categorization",
    description:
      "Automatically categorize your transactions and get insights into your spending patterns",
  },
  {
    icon: <LineChart className="w-8 h-8 text-emerald-500" />,
    title: "Visual Analytics",
    description:
      "Beautiful charts and graphs that make understanding your finances a breeze",
  },
  {
    icon: <Target className="w-8 h-8 text-emerald-500" />,
    title: "Budget Goals",
    description:
      "Set and track your financial goals with intelligent progress tracking",
  },
  {
    icon: <Bell className="w-8 h-8 text-emerald-500" />,
    title: "Smart Alerts",
    description:
      "Get notified about unusual spending and stay on top of your budget",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-emerald-500" />,
    title: "Mobile First",
    description: "Track your finances on the go with our responsive design",
  },
  {
    icon: <Shield className="w-8 h-8 text-emerald-500" />,
    title: "Bank-Grade Security",
    description: "Your financial data is encrypted and secure with us",
  },
];

// Add this to your global CSS file
const globalStyles = `
@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`;

export default LandingPage;
