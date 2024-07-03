import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ProfileComponent.css';

const ProfileComponent = () => {
    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        profilePic: 'https://murrayglass.com/wp-content/uploads/2020/10/avatar-2048x2048.jpeg',
        location: '',
        bio: '',
        socialProfiles: {
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: ''
        }
    });
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchProfileData(storedUserId);
        }
    }, []);

    const fetchProfileData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
            const { username, email, profilePic, location, bio, socialProfiles } = response.data;
            setFormData({
                ...formData,
                username,
                email,
                profilePic: profilePic || 'https://murrayglass.com/wp-content/uploads/2020/10/avatar-2048x2048.jpeg', // Ensure default image if profilePic is null
                location,
                bio,
                socialProfiles
            });
            setFollowerCount(response.data.followers.length); // Assuming API provides followers as an array
            setFollowingCount(response.data.following.length); // Assuming API provides following as an array

            // Check if current user is following the fetched user
            const currentUser = await axios.get('http://localhost:5000/api/auth/user', {
                headers: {
                    'x-auth-token': localStorage.getItem('token')
                }
            });
            setIsFollowing(currentUser.data.following.includes(userId));
        } catch (error) {
            console.error('Error fetching profile details:', error);
        }
    };

    const handleFollowToggle = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };

            const response = await axios.post(`http://localhost:5000/api/users/${userId}/follow`, {}, config);
            console.log(response.data); // Log success message or update state accordingly
            setIsFollowing(!isFollowing); // Toggle isFollowing state

            // Update follower count based on response data (assuming response provides updated counts)
            setFollowerCount(response.data.updatedFollowerCount); // Example assuming response.data has updated count

        } catch (error) {
            console.error('Error toggling follow:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div className="profile-container">
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
                        <button onClick={handleFollowToggle} className={isFollowing ? 'unfollow-btn' : 'follow-btn'}>
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
            </div>
        </div>
    );
}

export default ProfileComponent;
