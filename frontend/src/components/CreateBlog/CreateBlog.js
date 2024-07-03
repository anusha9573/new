import { Button, Container, IconButton, Paper, TextField, Typography } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createBlogStyles.css'; // Import the external CSS file

const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState(''); // New state for location
  const [mediaFile, setMediaFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('location', location); // Append location to form data
    formData.append('media', mediaFile);

    try {
      const token = localStorage.getItem('token'); // Assuming you have token for authenticated requests
      const response = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Assuming Bearer token authentication
        },
      });
      console.log('Blog created:', response.data);
      navigate('/profile/posts'); // Redirect to user's posts page
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleFileChange = (e) => {
    setMediaFile(e.target.files[0]);
  };

  return (
    <Container maxWidth="sm">
      <Paper className="create-blog-root">
        <Typography variant="h4" className="create-blog-title">
          Create New Blog
        </Typography>
        <form className="create-blog-form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Location"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            fullWidth
          />
          <input
            accept="image/*, video/*"
            className="create-blog-media-input"
            id="mediaFile"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="mediaFile" className="create-blog-media-label">
            <IconButton component="span">
              <AddPhotoAlternateIcon />
            </IconButton>
            Upload Media (Image or Video)
          </label>
          <Button
            type="submit"
            variant="contained"
            className="create-blog-submit-button"
            fullWidth
          >
            Create Blog
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateBlog;
