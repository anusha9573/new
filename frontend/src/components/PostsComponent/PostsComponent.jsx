import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PostsComponent.css'; // Import CSS

function PostsComponent() {
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        profilePic: 'https://murrayglass.com/wp-content/uploads/2020/10/avatar-2048x2048.jpeg', // Default profile image URL
    });
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchProfileData(storedUserId);
            fetchPosts(storedUserId);
        }
    }, []);

    const fetchProfileData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
            const { username, profilePic } = response.data;
            setFormData({
                username,
                profilePic: profilePic || 'https://murrayglass.com/wp-content/uploads/2020/10/avatar-2048x2048.jpeg', // Ensure default image if profilePic is null
            });
            setFollowerCount(response.data.followers.length); // Assuming API provides followers as an array
            setFollowingCount(response.data.following.length); // Assuming API provides following as an array
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };

    const fetchPosts = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${userId}/posts`);
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return (
        <div className="grid-container">
            {/* Sidebar similar to EditProfileComponent */}
            <div className="sidebar">
                <div className="profile-info">
                    <img src={formData.profilePic} alt="Profile" className="profile-pic" />
                    <h2>{formData.username}</h2>
                    <div className="follower-info">
                        <div>
                            <h3>Followers</h3>
                            <p>{followerCount}</p>
                        </div>
                        <div>
                            <h3>Following</h3>
                            <p>{followingCount}</p>
                        </div>
                    </div>
                    <button className="follow-btn" onClick={() => setIsFollowing(!isFollowing)}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
                <nav className="profile-nav">
                    <Link to="/profile/posts" className="nav-link">My Blogs</Link>
                    <Link to="/profile/edit" className="nav-link">Edit Profile</Link>
                    <Link to="/profile/media" className="nav-link">Upload Media</Link>
                    <Link to="/profile/account" className="nav-link">Account</Link>
                </nav>
            </div>

            {/* Displaying Blogs */}
            <div className="posts-container">
                <h1>Blogs</h1>
                <div className="cards-container">
                    {posts.map(post => (
                        <Link key={post._id} to={`/profile/posts/${post._id}`} className="card-link">
                            <div className="card">
                                <div className="card-header">
                                    <h2>{post.title}</h2>
                                </div>
                                <div className="card-content">
                                    <p>{post.content}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PostsComponent;
