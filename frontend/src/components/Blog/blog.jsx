import { Box, Button, Card, CardContent, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { makeStyles } from '@mui/styles';


import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  topSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
  },
  createBlogButton: {
    backgroundColor: '#3f51b5',
    color: 'white',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  blogCard: {
    maxWidth: 400,
    margin: 'auto',
  },
  blogImage: {
    width: '100%',
    height: 'auto',
  },
}));

const Blog = () => {
  const classes = useStyles();
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/');
        setBlogs(response.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateBlog = () => {
    navigate('/createblog'); 
  };

  return (
    <div className={classes.root}>
      <Box className={classes.topSection}>
        <Typography variant="h4">Top Blogs</Typography>
        <Button
          variant="contained"
          className={classes.createBlogButton}
          onClick={handleCreateBlog}
        >
          Create Blog
        </Button>
      </Box>
      <Box className={classes.searchContainer}>
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Grid container spacing={2}>
        {filteredBlogs.map((blog) => (
          <Grid item key={blog._id} xs={12} sm={6} md={4}>
            <Card className={classes.blogCard}>
              <img
                className={classes.blogImage}
                src={`http://localhost:5000${blog.media[0].url}`}
                alt={blog.media[0].description}
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {blog.content}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Author:</strong> {blog.author.username}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>Location:</strong> {blog.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Blog;
