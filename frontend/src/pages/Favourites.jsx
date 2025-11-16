import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import foodImg from '../assets/foodRecipe.png';

export default function Favourites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        navigate("/");
        return;
      }

      const response = await axios.get('http://localhost:5000/recipe/user/favorites', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setFavorites(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading favorites:', error);
      if (error.response?.status === 401) {
        alert("Please login to view favorites!");
        localStorage.removeItem("token");
        navigate("/");
      }
      setLoading(false);
    }
  };

  const removeFavorite = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.post(
        `http://localhost:5000/recipe/${recipeId}/favorite`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Remove from local state
        setFavorites(prevFavorites => 
          prevFavorites.filter(recipe => recipe._id !== recipeId)
        );
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return 'No details available';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const formatIngredients = (ingredients) => {
    if (!ingredients || ingredients.length === 0) return 'No ingredients listed';
    
    if (typeof ingredients === 'string') {
      return truncateText(ingredients, 100);
    }
    
    if (Array.isArray(ingredients)) {
      if (ingredients.length <= 3) {
        return ingredients.join(', ');
      }
      return `${ingredients.slice(0, 3).join(', ')}... (+${ingredients.length - 3} more)`;
    }
    
    return 'No ingredients listed';
  };

  if (loading) {
    return (
      <div style={{
        width: '100%',
        textAlign: 'center',
        padding: '40px',
        fontSize: '18px'
      }}>
        Loading your favorites...
      </div>
    );
  }

  return (
    <div className="recipe">
      <h2 className="section-heading">❤️ My Favourite Recipes</h2>
      
      <div className='card-container'>
        {
          favorites && favorites.length > 0 ? (
            favorites.map((item, index) => (
              <div key={index} className='card'>
                <img 
                  src={`http://localhost:5000/images/${item.coverImage}`} 
                  width="120px" 
                  height="100px" 
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = foodImg;
                  }}
                />
                <div className='card-body'>
                  <div className='title'>{item.title || 'Untitled Recipe'}</div>
                  
                  <div className='ingredients-section' style={{
                    fontSize: '0.85rem',
                    color: '#555',
                    marginTop: '8px',
                    marginBottom: '8px',
                    padding: '8px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '4px',
                    border: '1px solid #eee'
                  }}>
                    <strong style={{ color: '#ff6b35' }}>🥘 Ingredients:</strong><br/>
                    <span style={{ fontSize: '0.8rem' }}>
                      {formatIngredients(item.ingredients)}
                    </span>
                  </div>
                  
                  <div className='instructions-section' style={{
                    fontSize: '0.85rem',
                    color: '#555',
                    marginBottom: '10px',
                    padding: '8px',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '4px',
                    lineHeight: '1.4',
                    border: '1px solid #eee'
                  }}>
                    <strong style={{ color: '#ff6b35' }}>📝 Instructions:</strong><br/>
                    <span style={{ fontSize: '0.8rem' }}>
                      {truncateText(item.instructions, 100)}
                    </span>
                  </div>
                  
                  <div className='icons'>
                    <div className='timer'>
                      <BsStopwatchFill /> {item.time || 'N/A'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FaHeart 
                        onClick={() => removeFavorite(item._id)}
                        style={{ 
                          color: "red",
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '20px'
                        }} 
                        title="Remove from favorites"
                      />
                      <span style={{
                        fontSize: '0.85rem',
                        color: '#666',
                        fontWeight: '500'
                      }}>
                        {item.likeCount || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '270px',
    width: '100%'
  }}>
    <div style={{
      textAlign: 'center',
      color: '#666',
      fontSize: '18px'
    }}>
      <p style={{ margin: '0 0 10px 0' }}>No favorite recipes yet!</p>
      <p style={{ fontSize: '14px', margin: '0' }}>
        Click the ❤️ icon on any recipe to add it to your favorites.
      </p>
    </div>
  </div>
          )
        }
      </div>
    </div>
  );
}