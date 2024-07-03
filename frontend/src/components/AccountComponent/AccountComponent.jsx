import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AccountComponent.css';

const AccountComponent = () => {
    const navigate = useNavigate();

    const [userId, setUserId] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        profilePic: 'https://murrayglass.com/wp-content/uploads/2020/10/avatar-2048x2048.jpeg',
    });
    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [isFollowing, setIsFollowing] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [changePasswordError, setChangePasswordError] = useState(null);

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
            const { username, profilePic } = response.data;
            setFormData({
                username,
                profilePic: profilePic || 'https://murrayglass.com/wp-content/uploads/2020/10/avatar-2048x2048.jpeg',
            });
            setFollowerCount(response.data.followers.length);
            setFollowingCount(response.data.following.length);
            setIsFollowing(response.data.isFollowing); // Assuming the API returns whether current user follows this user
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
            const response = await axios.put(`http://localhost:5000/api/users/${userId}/follow`, {}, config);
            console.log(response.data);
            setIsFollowing(!isFollowing);
        } catch (error) {
            console.error('Error toggling follow:', error);
        }
    };

    const toggleChangePassword = () => {
        setShowChangePassword(!showChangePassword);
        setShowDeleteAccount(false); // Close delete account section if open
    };

    const handlePasswordChange = async () => {
        try {
            if (!oldPassword || !newPassword || !confirmPassword) {
                setChangePasswordError('Please fill out all fields.');
                return;
            }
            if (newPassword !== confirmPassword) {
                setChangePasswordError('New password and confirm password must match.');
                return;
            }

            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };

            const body = {
                oldPassword,
                newPassword
            };

            const response = await axios.put(`http://localhost:5000/api/users/${userId}/change-password`, body, config);
            console.log(response.data); // Handle success scenario here
            setShowChangePassword(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setChangePasswordError(null);
        } catch (error) {
            console.error('Error changing password:', error);
            setChangePasswordError('Failed to change password. Please try again.');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                }
            };

            await axios.delete(`http://localhost:5000/api/users/${userId}`, config);
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
            // Handle error as needed
        }
    };

    const toggleDeleteAccount = () => {
        setShowDeleteAccount(!showDeleteAccount);
        setShowChangePassword(false); // Close change password section if open
    };

    return (
        <div className="account-container">
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
            <div className="content-right">
                <div className="account-actions">
                    <hr className="hr" />
                    {showChangePassword && (
                        <div className="account-section">
                            <h3>Change Password</h3>
                            <form onSubmit={(e) => { e.preventDefault(); handlePasswordChange(); }}>
                                <div className="form-group">
                                    <label htmlFor="oldPassword">Old Password</label>
                                    <input
                                        type="password"
                                        id="oldPassword"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Change Password</button>
                                {changePasswordError && <p className="error-message">{changePasswordError}</p>}
                            </form>
                        </div>
                    )}
                    {showDeleteAccount && (
                        <div className="account-section">
                            <h3>Confirm Account Deletion</h3>
                            <p>Are you sure you want to delete your account?</p>
                            <button className="btn btn-danger" onClick={handleDeleteAccount}>
                                Confirm Delete
                            </button>
                        </div>
                    )}
                    <div className="account-links">
                        <button className="account-link" onClick={toggleChangePassword}>
                            Change Password
                        </button>
                        <button className="account-link" onClick={() => setShowDeleteAccount(true)}>
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountComponent;
