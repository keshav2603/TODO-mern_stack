import React, { useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { loginUser } from '../api/user.api';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const para = document.createElement('div');
    para.className = 'flex flex-wrap gap-0.5 h-screen items-center justify-center relative';
    let el = '<div class="transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#00FF00]"></div>';
    for (let k = 1; k <= 1000; k++) {
      el += '<div class="transition-colors duration-[1.5s] hover:duration-[0s] border-[#00FF00] h-[calc(5vw-2px)] w-[calc(5vw-2px)] md:h-[calc(4vw-2px)] md:w-[calc(4vw-2px)] lg:h-[calc(3vw-4px)] lg:w-[calc(3vw-4px)] bg-gray-900 hover:bg-[#00FF00]"></div>';
    }
    para.innerHTML = el;
    document.getElementById('myDIV').appendChild(para);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await loginUser({email, password });
      // Check if login was successful
      if (response.status === 200||201) { // Adjust based on your API's success response
        // Redirect to the /home page
        navigate('/home');
      } else {
        // Handle error (e.g., show an error message to the user)
        console.error('Registration error:', response.data.message);
      }
    } catch (error) {
      // Handle errors (e.g., show an error message to the user)
      console.error('Registration error:', error.message);
    }
  };


  return (
    <div className="bg-black before:animate-pulse before:bg-gradient-to-b before:from-gray-900 overflow-hidden before:via-[#00FF00] before:to-gray-900 before:absolute h-screen">
      <div id="myDIV">
        <div className="w-[100vw] h-[100vh] px-3 sm:px-5 flex items-center justify-center absolute">
          <div className="w-full sm:w-1/2 lg:2/3 px-6 bg-gray-500 bg-opacity-20 bg-clip-padding backdrop-filter backdrop-blur-sm text-white z-50 py-4 rounded-lg">
            <div className="w-full flex justify-center text-[#00FF00] text-xl mb:2 md:mb-5">
              signup
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-xs font-medium text-white">Your email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-xs font-medium text-white">Your password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 md:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex flex-row justify-between">
                <div className="text-white text-sm md:text-md">Forgot Password</div>
                <div className="text-[#00FF00] text-sm md:text-md">
                  <Link to="/login">login</Link>
                </div>
              </div>
              <button type="submit" className="mt-4 md:mt-10 w-full flex justify-center text-sm md:text-xl bg-[#00FF00] py-2 rounded-md">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
