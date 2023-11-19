import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Home = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center justify-center">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Welcome to Go Ease</h1>

          <div className="flex justify-center space-x-4">
           
            <Link to="/adminlogin">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full focus:outline-none"
              >
                Admin Login
              </button>
            </Link>

    
            <Link to="/login">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none"
              >
                User Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
