import { motion } from "framer-motion";
import { useState } from "react";
import {
  BarChart3,
  LineChart,
  Target,
  Bell,
  Smartphone,
  Shield,
  ArrowRight,
  PieChart,
  Wallet,
  TrendingUp,
  LogIn,
  ExternalLink,
} from "lucide-react";

const LandingPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0F0D] text-white overflow-x-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 sm:px-6 py-6 sm:py-8"
      >
        {/* Navigation */}
        <nav className="flex justify-between items-center mb-8 sm:mb-16">
          <motion.div
            className="flex items-center gap-2 text-2xl sm:text-3xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-500" />
            <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
              SpendWise
            </span>
          </motion.div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="sm:hidden p-2 rounded-lg border-2 border-emerald-600 hover:bg-emerald-600/10 transition-all"
            >
              <LogIn className="w-5 h-5 text-emerald-500" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex border-2 border-emerald-600 px-6 py-2 rounded-lg hover:bg-emerald-600/10 transition-colors"
            >
              Login
            </motion.button>

            {/* Launch App Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="sm:hidden p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-all"
            >
              <ExternalLink className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex bg-emerald-600 px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Launch App
            </motion.button>
          </div>
        </nav>
        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <motion.div
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="bg-emerald-600 px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all text-base sm:text-lg font-semibold flex items-center justify-center gap-2 mx-auto lg:mx-0 w-full sm:w-auto"
            >
              <span>Start Tracking Free</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
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
            <motion.div
              animate={{
                rotate: isHovered ? 5 : 0,
                scale: isHovered ? 1.02 : 1,
              }}
              className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl sm:rounded-2xl p-3 sm:p-6"
            >
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
                        <div className="w-3/4 h-full bg-emerald-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span>Entertainment</span>
                      <div className="h-1.5 sm:h-2 w-24 sm:w-48 bg-[#1A231F] rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-green-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm sm:text-base">
                      <span>Transport</span>
                      <div className="h-1.5 sm:h-2 w-24 sm:w-48 bg-[#1A231F] rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-emerald-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl font-bold text-center mb-10 sm:mb-16 px-4"
        >
          Everything you need to
          <span className="bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-transparent">
            {" "}
            master your finances
          </span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#121917] p-6 sm:p-8 rounded-xl sm:rounded-2xl hover:bg-[#1A231F] transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
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

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-4 sm:px-6 py-16 sm:py-24"
      >
        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl sm:rounded-2xl p-6 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Ready to take control?
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl mb-6 sm:mb-8">
            Join thousands of others who have already started their journey to
            financial freedom
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-emerald-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-emerald-700 transition-colors text-base sm:text-lg font-semibold flex items-center justify-center gap-2 mx-auto"
          >
            Get Started Now - It's Free
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

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

export default LandingPage;
