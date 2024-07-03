// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './login.css';

// const Login = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });
//   const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const { username, email, password } = formData;

//   const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
//     const data = isLogin ? { email, password } : { username, email, password };
//     try {
//       const response = await axios.post(url, data);
//       // Assuming the token is in response.data.token
//       const token = response.data.token;
//       localStorage.setItem('token', token); // Save the token in local storage
//       navigate('/');
//     } catch (err) {
//       const errorMsg = err.response && err.response.data && err.response.data.msg
//         ? err.response.data.msg
//         : 'An error occurred';
//       setError(errorMsg);
//     }
//   };

//   useEffect(() => {
//     const loginBtn = document.getElementById('login');
//     const signupBtn = document.getElementById('signup');

//     loginBtn.addEventListener('click', () => setIsLogin(true));
//     signupBtn.addEventListener('click', () => setIsLogin(false));

//     return () => {
//       loginBtn.removeEventListener('click', () => setIsLogin(true));
//       signupBtn.removeEventListener('click', () => setIsLogin(false));
//     };
//   }, []);

//   return (
//     <div classname="wrap">
//     <div className="form-structor">
//       <div className={`signup ${isLogin ? 'slide-up' : ''}`}>
//         <h2 className="form-title" id="signup" onClick={() => setIsLogin(false)}>
//           <span>or</span>Sign up
//         </h2>
//         <div className="form-holder">
//           <form onSubmit={onSubmit}>
//             {!isLogin && (
//               <input
//                 type="text"
//                 className="input"
//                 placeholder="Username"
//                 name="username"
//                 value={username}
//                 onChange={onChange}
//                 required
//               />
//             )}
//             <input
//               type="email"
//               className="input"
//               placeholder="Email"
//               name="email"
//               value={email}
//               onChange={onChange}
//               required
//             />
//             <input
//               type="password"
//               className="input"
//               placeholder="Password"
//               name="password"
//               value={password}
//               onChange={onChange}
//               required
//             />
//             <button className="submit-btn" type="submit">
//               {isLogin ? 'Log in' : 'Sign up'}
//             </button>
//           </form>
//         </div>
//       </div>
//       <div className={`login ${isLogin ? '' : 'slide-up'}`}>
//         <div className="center">
//           <h2 className="form-title" id="login" onClick={() => setIsLogin(true)}>
//             <span>or</span>Log in
//           </h2>
//           <div className="form-holder">
//             <form onSubmit={onSubmit}>
//               <input
//                 type="email"
//                 className="input"
//                 placeholder="Email"
//                 name="email"
//                 value={email}
//                 onChange={onChange}
//                 required
//               />
//               <input
//                 type="password"
//                 className="input"
//                 placeholder="Password"
//                 name="password"
//                 value={password}
//                 onChange={onChange}
//                 required
//               />
//               <button className="submit-btn" type="submit">
//                 {isLogin ? 'Log in' : 'Sign up'}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//       {error && <p className="error">{error}</p>}
//     </div>
//     </div>
//   );
// };

// export default Login;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    const data = isLogin ? { email, password } : { username, email, password };
    try {
      const response = await axios.post(url, data);
      // Assuming the token is in response.data.token
      const token = response.data.token;
      localStorage.setItem('token', token); // Save the token in local storage
      navigate('/');
    } catch (err) {
      const errorMsg = err.response && err.response.data && err.response.data.msg
        ? err.response.data.msg
        : 'An error occurred';
      setError(errorMsg);
    }
  };

  useEffect(() => {
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');

    loginBtn.addEventListener('click', () => setIsLogin(true));
    signupBtn.addEventListener('click', () => setIsLogin(false));

    return () => {
      loginBtn.removeEventListener('click', () => setIsLogin(true));
      signupBtn.removeEventListener('click', () => setIsLogin(false));
    };
  }, []);

  return (
    <div className="wrap">
      <div className="form-structor">
        <div className={`signup ${isLogin ? 'slide-up' : ''}`}>
          <h2 className="form-title" id="signup" onClick={() => setIsLogin(false)}>
            <span>or</span>Sign up
          </h2>
          <div className="form-holder">
            <form onSubmit={onSubmit}>
              {!isLogin && (
                <input
                  type="text"
                  className="input"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={onChange}
                  required
                />
              )}
              <input
                type="email"
                className="input"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="Password"
                name="password"
                value={password}
                onChange={onChange}
                required
              />
              <button className="submit-btn" type="submit">
                {isLogin ? 'Log in' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>
        <div className={`login ${isLogin ? '' : 'slide-up'}`}>
          <div className="center">
            <h2 className="form-title" id="login" onClick={() => setIsLogin(true)}>
              <span>or</span>Log in
            </h2>
            <div className="form-holder">
              <form onSubmit={onSubmit}>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  required
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  required
                />
                <button className="submit-btn" type="submit">
                  {isLogin ? 'Log in' : 'Sign up'}
                </button>
              </form>
            </div>
          </div>
        </div>
        {error && <p className="error">{error}</p>}
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css?family=Fira+Sans');

          .wrap {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #E1E8EE;
            font-family: 'Fira Sans', Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          .form-structor {
            background-color: #222;
            border-radius: 15px;
            height: 550px;
            width: 350px;
            position: relative;
            overflow: hidden;
          }

          .form-structor::after {
            content: '';
            opacity: .8;
            position: absolute;
            top: 0; right: 0; bottom: 0; left: 0;
            background-repeat: no-repeat;
            background-position: left bottom;
            background-size: 500px;
            background-image: url('https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=bf884ad570b50659c5fa2dc2cfb20ecf&auto=format&fit=crop&w=1000&q=100');
          }

          .signup {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 65%;
            z-index: 5;
            transition: all .3s ease;
          }

          .signup.slide-up {
            top: 5%;
            transform: translate(-50%, 0%);
            transition: all .3s ease;
          }

          .signup.slide-up .form-holder,
          .signup.slide-up .submit-btn {
            opacity: 0;
            visibility: hidden;
          }

          .signup.slide-up .form-title {
            font-size: 1em;
            cursor: pointer;
          }

          .signup.slide-up .form-title span {
            margin-right: 5px;
            opacity: 1;
            visibility: visible;
            transition: all .3s ease;
          }

          .form-title {
            color: #fff;
            font-size: 1.7em;
            text-align: center;
          }

          .form-title span {
            color: rgba(0,0,0,0.4);
            opacity: 0;
            visibility: hidden;
            transition: all .3s ease;
          }

          .form-holder {
            border-radius: 15px;
            background-color: #fff;
            overflow: hidden;
            margin-top: 50px;
            opacity: 1;
            visibility: visible;
            transition: all .3s ease;
          }

          .input {
            border: 0;
            outline: none;
            box-shadow: none;
            display: block;
            height: 30px;
            line-height: 30px;
            padding: 8px 15px;
            border-bottom: 1px solid #eee;
            width: 100%;
            font-size: 12px;
          }

          .input:last-child {
            border-bottom: 0;
          }

          .input::placeholder {
            color: rgba(0,0,0,0.4);
          }

          .submit-btn {
            background-color: rgba(0,0,0,0.4);
            color: rgba(256,256,256,0.7);
            border: 0;
            border-radius: 15px;
            display: block;
            margin: 15px auto;
            padding: 15px 45px;
            width: 100%;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
            opacity: 1;
            visibility: visible;
            transition: all .3s ease;
          }

          .submit-btn:hover {
            transition: all .3s ease;
            background-color: rgba(0,0,0,0.8);
          }

          .login {
            position: absolute;
            top: 20%;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #fff;
            z-index: 5;
            transition: all .3s ease;
          }

          .login::before {
            content: '';
            position: absolute;
            left: 50%;
            top: -20px;
            transform: translate(-50%, 0);
            background-color: #fff;
            width: 200%;
            height: 250px;
            border-radius: 50%;
            z-index: 4;
            transition: all .3s ease;
          }

          .center {
            position: absolute;
            top: calc(50% - 10%);
            left: 50%;
            transform: translate(-50%, -50%);
            width: 65%;
            z-index: 5;
            transition: all .3s ease;
          }

          .login .form-holder {
            border-radius: 15px;
            background-color: #fff;
            overflow: hidden;
            margin-top: 50px;
            opacity: 1;
            visibility: visible;
            transition: all .3s ease;
          }

          .login .input {
            border: 0;
            outline: none;
            box-shadow: none;
            display: block;
            height: 30px;
            line-height: 30px;
            padding: 8px 15px;
            border-bottom: 1px solid #eee;
            width: 100%;
            font-size: 12px;
          }

          .login .input:last-child {
            border-bottom: 0;
          }

          .login .input::placeholder {
            color: rgba(0,0,0,0.4);
          }

          .login .submit-btn {
            background-color: rgba(0,0,0,0.4);
            color: rgba(256,256,256,0.7);
            border: 0;
            border-radius: 15px;
            display: block;
            margin: 15px auto;
            padding: 15px 45px;
            width: 100%;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
            opacity: 1;
            visibility: visible;
            transition: all .3s ease;
          }

          .login .submit-btn:hover {
            transition: all .3s ease;
            background-color: rgba(0,0,0,0.8);
          }

          .login.slide-up {
            top: 90%;
            transition: all .3s ease;
          }

          .login.slide-up .center {
            top: 10%;
            transform: translate(-50%, 0%);
          }

          .error {
            color: red;
            text-align: center;
            margin-top: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default Login;
