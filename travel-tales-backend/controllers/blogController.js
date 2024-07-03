// @desc    Get all blog posts
// @route   GET /api/posts
const Blog = require('../models/Blog');
const User = require('../models/User');

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'username')
      .populate('media'); // Populate media references
    res.json(blogs);
  } catch (err) {
    console.error('Error fetching blogs:', err.message);
    res.status(500).send('Server Error');
  }
};


// controllers/blogController.js
exports.createBlog = async (req, res) => {
  const { title, content, location } = req.body;  // Ensure location is destructured
  const media = req.file ? req.file.path : null;

  try {
    

    const newBlog = new Blog({
      title,
      content,
      author,
      location,
      media: media ? [media] : []
    });

    await newBlog.save();

    // Add the new blog to the user's blogs array
    const user = await User.findById(author);
    user.blogs.push(newBlog._id);
    await user.save();

    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get details of a specific blog post
// @route   GET /api/posts/:id
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'username')
      .populate('comments')
      .populate('media'); // Populate media references
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err.message);
    res.status(500).send('Server Error');
  }
};
// @desc    Update details of a specific blog post
// @route   PUT /api/posts/:id
exports.updateBlog = async (req, res) => {
  const { title, content, location, media } = req.body; // Include location and media in the request body
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    blog.title = title;
    blog.content = content;
    blog.location = location; // Update location
    blog.media = media; // Update media references

    await blog.save();
    res.json(blog);
  } catch (err) {
    console.error('Error updating blog:', err.message);
    res.status(500).send('Server Error');
  }
};
// @desc    Delete a specific blog post
// @route   DELETE /api/posts/:id
exports.deleteBlog = async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ msg: 'Blog not found' });
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Blog removed' });
  } catch (err) {
    console.error('Error deleting blog:', err.message);
    res.status(500).send('Server Error');
  }
};
