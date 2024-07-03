// Destination.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box
} from '@mui/material';

function Destination() {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/api/destinations/search?location=${searchTerm}`);
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, [searchTerm]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    if (term) {
      const searchResult = blogs.filter(blog => blog.location.toLowerCase().includes(term));
      setFilteredBlogs(searchResult);
    } else {
      setFilteredBlogs(blogs);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          {category.charAt(0).toUpperCase() + category.slice(1)} Destinations
        </Typography>
        <TextField
          label="Search by location"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Grid container spacing={4}>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <Grid item xs={12} sm={6} md={4} key={blog._id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={blog.imageUrl}
                    alt={blog.title}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Location:</strong> {blog.location}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {blog.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="textSecondary" align="center">
              .
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default Destination;