// Destination/DestinationBlogs.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

function DestinationBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchAllBlogs = async () => {
      try {
        // Fetch all existing blogs from the backend API
        const response = await axios.get('http://localhost:3000/api/posts');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchAllBlogs();
  }, []);

  return (
    <div>
      {/* Display the fetched blogs */}
      <h2>All Blogs</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog._id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default DestinationBlogs;
