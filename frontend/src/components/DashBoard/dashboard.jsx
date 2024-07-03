

// After (MUI v5)
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import './Dashboard.css'; // Make sure to import your CSS file
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();


  const handleDestinationChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      navigate(`/destinations/${selectedValue}`);
    }
  };
  return (
    <div>
      <header>
        <h2 href="#">Travel Tale</h2>
        <nav className="home-link">
          <li><a href="#about" className="home-link">About</a></li>
          <li><a href="/search" className="home-link">Search</a></li>
      
          <li className="dropdown">
          <button className="dropbtn">Destination Guides</button>
          <div className="dropdown-content">
            <select onChange={handleDestinationChange} className="dropdown-select">
              <option value="">Select a Category</option>
              <option value="top-destinations">Top Destinations</option>
              <option value="trending-recommendations">Trending Recommendations</option>
              <option value="recommended-destinations">Recommended Destinations</option>
            </select>
          </div>
        </li>



          <li><a href="/login" className="home-link">Sign In</a></li>
          <li><a href="/profile" className="home-link">Profile</a></li>
        </nav>
      </header>

      <section className="hero" style={{backgroundImage: 'url(https://wallpapercave.com/wp/wp4069436.jpg)'}}>
        <div className="hero-content-area">
          <h1>Travel Tales</h1>
          <h3>Journey beyond the guidebooks and discover the world through fresh eyes with our travel blog. Your adventure starts here, where every destination is a story waiting to be told</h3>
          <a href="/blog" className="btn">Create Your Blog</a>
        </div>
      </section>

      <section id="about" className="about-us">
        <div className="about-content">
          <div className="about-image">
            <img src="https://klnow.com.my/wp-content/uploads/sites/2/2017/12/T_10-min-1024x688.jpg" alt="Travel Tale" />
          </div>
          <div className="about-text">
            <h3 className="title">About Us</h3>
            <p>At Travel Tales, we believe that every journey is an opportunity to discover new perspectives, cultures, and stories. Our mission is to inspire and guide travelers to explore the world with a fresh outlook, beyond the usual tourist trails.</p>
            <p>Founded in 2024, Travel Tales has been a platform for travel enthusiasts to share their unique experiences, tips, and insights. Whether you're looking for destination guides, travel tips, or inspiring stories, we've got you covered.</p>
            <blockquote>“The best journeys in life are those that answer questions you never thought to ask.”</blockquote>
          </div>
        </div>
      </section>


      <section className="discover">
        <h3 className="title">Discover</h3>
        <p>Explore more about our services, features, or upcoming events.</p>
        <div className="discover-grid">
          <div className="discover-item" style={{backgroundImage: 'url(https://klnow.com.my/wp-content/uploads/sites/2/2017/12/T_10-min-1024x688.jpg)'}}>
            <div className="discover-overlay">
              <p>“The best journeys in life are those that answer questions you never thought to ask.”</p>
            </div>
          </div>
          <div className="discover-item" style={{backgroundImage: 'url(https://static.boredpanda.com/blog/wp-content/uploads/2016/01/we-visited-over-50-countries-with-our-van-spending-only-8-a-day-25__880.jpg)'}}>
            <div className="discover-overlay">
              <p>“Travel is the only thing you buy that makes you richer.”</p>
            </div>
          </div>
          <div className="discover-item" style={{backgroundImage: 'url(https://www.planetware.com/photos-large/MAL/malacca-malacca-sunset-1.jpg)'}}>
            <div className="discover-overlay">
              <p>“A journey of a thousand miles begins with a single step.”</p>
            </div>
          </div>
        </div>
        <hr />
      </section>

      <footer id="profile">
        <ul>
          <li><a href="#"><i className="fa fa-twitter-square"></i></a></li>
          <li><a href="#"><i className="fa fa-facebook-square"></i></a></li>
          <li><a href="#"><i className="fa fa-snapchat-square"></i></a></li>
          <li><a href="#"><i className="fa fa-pinterest-square"></i></a></li>
          <li><a href="#"><i className="fa fa-github-square"></i></a></li>
        </ul>
        <div className="footer-content">
          <p>Made by <strong>ABC</strong></p>
          <p>No attribution required.</p>
        </div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a> |
          <a href="#">Terms of Service</a> |
          <a href="#">Contact Us</a>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 XYZ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
