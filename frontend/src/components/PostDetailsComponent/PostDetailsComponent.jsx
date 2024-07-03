import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instagram_logo from '../../assets/instagramlogo.png';
import whatsapp_logo from '../../assets/whatsapplogo.png';
import './PostDetailsComponent.css'; // Import CSS

function PostDetailsComponent() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [selectedShareMethod, setSelectedShareMethod] = useState(null);

    useEffect(() => {
        fetchPostDetails();
    }, [postId]);

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/posts/${postId}`);
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    const handleShareButtonClick = () => {
        setShowSharePopup(true);
    };

    const handleCloseSharePopup = () => {
        setShowSharePopup(false);
        setSelectedShareMethod(null);
    };

    const handleShareInstagram = () => {
        setSelectedShareMethod('instagram');
        const url = `https://www.instagram.com/direct/inbox/`;
        window.open(url, '_blank');
    };

    const handleShareWhatsApp = () => {
        setSelectedShareMethod('whatsapp');
        const url = `whatsapp://send?text=${encodeURIComponent(post.title)}%0A${encodeURIComponent(post.content)}`;
        window.location.href = url;
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-container">
            <div className="post-card">
                <div className="post-header">
                    <h2>{post.title}</h2>
                    {/* <p className="author">Posted by {post.username ? post.author.username : 'Unknown'}</p> */}
                    <p className="date">Published on {new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="post-content">
                    <p>{post.content}</p>
                    {/* Render media */}
                    {/* <div className="media-container">
                        <p className="media-title">Media:</p>
                        {post.media.map((mediaItem, index) => (
                            <img key={index} src={`http://localhost:5000/api/media/${mediaItem}`} alt={`Media ${index + 1}`} className="media-item" />
                        ))}
                    </div> */}
                </div>
                {/* Likes and comments */}
                <div className="post-actions">
                    <div className="shares">
                        <button className="share-button" onClick={handleShareButtonClick}>Share</button>
                        {showSharePopup && (
                            <div className="share-popup">
                                <button className="close-button" onClick={handleCloseSharePopup}>Close</button>
                                <div className="share-icons">
                                    <a href="#" className="social-icon instagram" onClick={handleShareInstagram}>
                                        <img src={instagram_logo} alt="Instagram" />
                                    </a>
                                    <a href="#" className="social-icon whatsapp" onClick={handleShareWhatsApp}>
                                        <img src={whatsapp_logo} alt="WhatsApp" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="likes-comments">
                        <div className="likes">
                            <span role="img" aria-label="Likes">👍</span> {post.likes}
                        </div>
                        <div className="comments">
                            <span role="img" aria-label="Comments">💬</span> {post.comments}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetailsComponent;
