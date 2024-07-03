import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './EditProfileComponent.css'; // Import CSS file for styling

function EditProfileComponent() {
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

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
            fetchUserData(storedUserId);
        }
    }, []);

    const fetchUserData = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
            const { username, email, profilePic, location, bio, socialProfiles } = response.data;
            setFormData({
                username,
                email,
                profilePic: profilePic || 'https://murrayglass.com/wp-content/uploads/2020/10/avatar-2048x2048.jpeg',
                location: location || '',
                bio: bio || '',
                socialProfiles: {
                    twitter: socialProfiles?.twitter || '',
                    facebook: socialProfiles?.facebook || '',
                    instagram: socialProfiles?.instagram || '',
                    linkedin: socialProfiles?.linkedin || ''
                }
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['twitter', 'facebook', 'instagram', 'linkedin'].includes(name)) {
            setFormData(prevFormData => ({
                ...prevFormData,
                socialProfiles: {
                    ...prevFormData.socialProfiles,
                    [name]: value
                }
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Assuming you're storing the JWT in local storage
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };
            const response = await axios.put(`http://localhost:5000/api/users/${userId}`, formData, config);
            console.log(response.data);
            // Optionally, navigate the user to a different page after successful submission
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!formData) {
        return <div>Loading...</div>; // Add loading state if needed
    }

    return (
        <div className="profile-container">
            <div className="sidebar">
                <div className="profile-info">
                    <img src={formData.profilePic} alt="Profile" className="profile-pic" />
                    <h2>{formData.username}</h2>
                    <div className="follower-info">
                        <div>
                            <h3>Followers</h3>
                            <p>0</p> {/* Replace with actual follower count if needed */}
                        </div>
                        <div>
                            <h3>Following</h3>
                            <p>0</p> {/* Replace with actual following count if needed */}
                        </div>
                    </div>
                    <button className="follow-btn">Follow</button> {/* Adjust logic if follow/unfollow needed */}
                </div>
                <nav className="profile-nav">
                    <Link to="/profile/posts" className="nav-link">My Blogs</Link>
                    <Link to="/profile/edit" className="nav-link">Edit Profile</Link>
                    <Link to="/profile/media" className="nav-link">Upload Media</Link>
                    <Link to="/profile/account" className="nav-link">Account</Link>
                </nav>
            </div>
            <div className="edit-profile-content">
                <h1>Edit Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profilePic">Profile Picture URL</label>
                        <input
                            type="text"
                            id="profilePic"
                            name="profilePic"
                            value={formData.profilePic}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Social Profiles</label>
                        <div className="social-profiles">
                            <div className="social-profile">
                                <span>Twitter:</span>
                                <input
                                    type="text"
                                    id="twitter"
                                    name="twitter"
                                    value={formData.socialProfiles.twitter || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="social-profile">
                                <span>Facebook:</span>
                                <input
                                    type="text"
                                    id="facebook"
                                    name="facebook"
                                    value={formData.socialProfiles.facebook || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="social-profile">
                                <span>Instagram:</span>
                                <input
                                    type="text"
                                    id="instagram"
                                    name="instagram"
                                    value={formData.socialProfiles.instagram || ''}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="social-profile">
                                <span>LinkedIn:</span>
                                <input
                                    type="text"
                                    id="linkedin"
                                    name="linkedin"
                                    value={formData.socialProfiles.linkedin || ''}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
}

export default EditProfileComponent;
