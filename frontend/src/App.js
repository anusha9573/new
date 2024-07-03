// // // src/App.js
// // import React from 'react';
// // import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// // import Login from './components/Login/login';

// // import Blog from "./components/Blog/blog";
// // import CreateBlog from "./components/CreateBlog/CreateBlog";
// // import DashBoard from './components/DashBoard/dashboard';
// // // import Media from "./components/Media/media";

// // ///
// // import Destination from 'E:/TravelTales/frontend/src/components/Destination/Destination';

// // // import ProfileComponent from './components/ProfileComponent/ProfileComponent.jsx';
// // // import PostsComponent from './components/PostsComponent/PostsComponent';
// // //import EditProfileComponent from './components/EditProfileComponent/EditProfileComponent.jsx';

// // import Media from 'E:/TravelTales/frontend/src/components/Media/media';
// // //import PostDetailsComponent from 'E:/TravelTales/frontend/src/components/Profile/PostDetailsComponent/PostDetailsComponent.jsx';

// // import AccountComponent from './components/AccountComponent/AccountComponent.jsx';

// // import Search from 'E:/TravelTales/frontend/src/components/Search/Search.jsx';


// // import EditProfileComponent from './components/EditProfileComponent/EditProfileComponent.jsx';
// // import PostsComponent from './components/PostsComponent/PostsComponent';
// // import ProfileComponent from './components/ProfileComponent/ProfileComponent.jsx';

// // import PostDetailsComponent from './components/PostDetailsComponent/PostDetailsComponent.jsx';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="App">
// //         <Routes>
// //            <Route path ="/" element ={<DashBoard/>}/>
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/blog" element={<Blog />} />
// //           <Route path = "/media" element ={<Media />}/>
// //           <Route path = "createblog" element ={<CreateBlog />}/>
// //           <Route path='/profile' element={<ProfileComponent />} />
// //             <Route path="/profile/posts" element={<PostsComponent />} />
// //             <Route path="/profile/edit" element={<EditProfileComponent />} />
// //             <Route path="/profile/posts/:postId" element={<PostDetailsComponent />} />
// //             <Route path="/profile/account" element={<AccountComponent />} />

// //             <Route path="/profile/media" element={<Media />} />
// //             {/* <Route path="/destination" element={<Destination />} /> */}
            
// //             <Route path="/Search" element={<Search />} />
// //           <Route path="/destinations/:category" element={<Destination />} />



// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;
 

// // src/App.js
// import React from 'react';
// import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// import Login from './components/Login/login';
// import Blog from './components/Blog/blog';
// import CreateBlog from './components/CreateBlog/CreateBlog';
// import Dashboard from 'E:/TravelTales/frontend/src/components/DashBoard/dashboard.jsx';
// import Destination from './components/Destination/Destination';
// import Media from 'E:/TravelTales/frontend/src/components/Media/media.jsx';
// import AccountComponent from './components/AccountComponent/AccountComponent';
// import Search from './components/Search/Search';
// import EditProfileComponent from './components/EditProfileComponent/EditProfileComponent';
// import PostsComponent from './components/PostsComponent/PostsComponent';
// import ProfileComponent from './components/ProfileComponent/ProfileComponent';
// import PostDetailsComponent from './components/PostDetailsComponent/PostDetailsComponent';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/media" element={<Media />} />
//           <Route path="/createblog" element={<CreateBlog />} />
//           <Route path="/profile" element={<ProfileComponent />} />
//           <Route path="/profile/posts" element={<PostsComponent />} />
//           <Route path="/profile/edit" element={<EditProfileComponent />} />
//           <Route path="/profile/posts/:postId" element={<PostDetailsComponent />} />
//           <Route path="/profile/account" element={<AccountComponent />} />
//           <Route path="/profile/media" element={<Media />} />
//           <Route path="/search" element={<Search />} />
//           <Route path="/destinations/:category" element={<Destination />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;



// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Login from './components/Login/login';

import Blog from "./components/Blog/blog";
import CreateBlog from "./components/CreateBlog/CreateBlog";
import DashBoard from './components/DashBoard/dashboard';
// import Media from "./components/Media/media";

///
import Destination from 'E:/TravelTales/frontend/src/components/Destination/Destination';

// import ProfileComponent from './components/ProfileComponent/ProfileComponent.jsx';
// import PostsComponent from './components/PostsComponent/PostsComponent';
//import EditProfileComponent from './components/EditProfileComponent/EditProfileComponent.jsx';

import Media from 'E:/TravelTales/frontend/src/components/Media/media';
//import PostDetailsComponent from 'E:/TravelTales/frontend/src/components/Profile/PostDetailsComponent/PostDetailsComponent.jsx';

import AccountComponent from './components/AccountComponent/AccountComponent.jsx';

import Search from 'E:/TravelTales/frontend/src/components/Search/Search.jsx';


import EditProfileComponent from './components/EditProfileComponent/EditProfileComponent.jsx';
import PostsComponent from './components/PostsComponent/PostsComponent';
import ProfileComponent from './components/ProfileComponent/ProfileComponent.jsx';

import PostDetailsComponent from './components/PostDetailsComponent/PostDetailsComponent.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
           <Route path ="/" element ={<DashBoard/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<Blog />} />
          <Route path = "/media" element ={<Media />}/>
          <Route path = "createblog" element ={<CreateBlog />}/>
          <Route path='/profile' element={<ProfileComponent />} />
            <Route path="/profile/posts" element={<PostsComponent />} />
            <Route path="/profile/edit" element={<EditProfileComponent />} />
            <Route path="/profile/posts/:postId" element={<PostDetailsComponent />} />
            <Route path="/profile/account" element={<AccountComponent />} />

            <Route path="/profile/media" element={<Media />} />
       {/* <Route path="/destination" element={<Destination />} /> */}
            
            <Route path="/Search" element={<Search />} />
           <Route path="/destinations/:category" element={<Destination />} /> 



        </Routes>
      </div>
    </Router>
  );
}

export default App;
