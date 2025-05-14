# SpendWise - Personal Finance Tracker

![SpendWise Banner](https://files.catbox.moe/4wo2ed.png)

## 🚀 Overview

SpendWise is a comprehensive personal finance management application that helps users track expenses, monitor income, and gain insights into their spending habits. Built with a modern tech stack, this application offers an intuitive interface for managing your financial life with ease.

## ✨ Features

- **Dashboard Overview**: Get a quick snapshot of your financial health
- **Income & Expense Tracking**: Log and categorize all your financial transactions
- **Visual Analytics**: Beautiful charts and graphs to visualize your spending patterns
- **Budget Goals**: Set and track financial goals with progress indicators
- **Category Management**: Create custom categories for better organization
- **User Authentication**: Secure login and registration system
- **Profile Management**: Update your profile information and settings
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/iamshamit/Finance.git
   cd Finance
   ```

2. Install dependencies for both frontend and backend
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   - Create a `.env` file in the backend directory
   ```
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   IMGBB_API_KEY=your_imgbb_api_key
   ```

4. Start the development servers
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server in a new terminal
   cd frontend
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🌟 Usage

1. **Register/Login**: Create an account or log in to access the dashboard
2. **Add Transactions**: Record your income and expenses
3. **Create Categories**: Organize transactions with custom categories
4. **View Analytics**: Check the dashboard for insights into your spending
5. **Set Budgets**: Create budget goals to manage your finances better

## 📝 Project Structure

```
iamshamit-finance/
├── backend/                 # Backend server code
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   └── server.js            # Server entry point
└── frontend/                # React frontend
    ├── public/              # Static files
    └── src/
        ├── components/      # Reusable components
        ├── Context/         # React context providers
        ├── hooks/           # Custom React hooks
        ├── Layout/          # Layout components
        ├── Pages/           # Page components
        ├── services/        # API service functions
        └── utils/           # Utility functions
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Shamit** - [GitHub](https://github.com/iamshamit)

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Lucide Icons](https://lucide.dev/)

---

Made with ❤️ by Shamit
