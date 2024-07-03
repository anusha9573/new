import React, { useEffect, useState } from 'react';
import { Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './media.css'; // Import custom CSS for additional styling

const MediaGallery = () => {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/media');
        setMedia(response.data);
      } catch (err) {
        console.error('Error fetching media:', err);
      }
    };

    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/media/${id}`);
      setMedia(media.filter((item) => item._id !== id));
    } catch (err) {
      console.error('Error deleting media:', err);
    }
  };

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    try {
      const response = await axios.post('http://localhost:5000/api/media', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMedia([...media, response.data]);
    } catch (err) {
      console.error('Error uploading media:', err);
    }
  };

  return (
    <div className="container-fluid gallery-container">
      <input
        accept="image/*"
        id="contained-button-file"
        multiple
        type="file"
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span" className="btn btn-primary mb-3">
          Upload Media
        </Button>
      </label>
      <Typography variant="h5" align="center" gutterBottom>
        Media Gallery
      </Typography>
      <div className="grid-container">
        {media.map((item) => (
          <div key={item._id} className="grid-item position-relative">
            <img
              src={`http://localhost:5000${item.url}`}
              alt={item.description}
              className="img-fluid rounded gallery-image"
            />
            <IconButton
              aria-label="delete"
              className="btn btn-danger position-absolute top-0 end-0 m-2 delete-button"
              onClick={() => handleDelete(item._id)}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
