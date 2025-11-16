import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: '',
        time: '',
        ingredients: '',
        instructions: '',
        file: null
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const { name, value, files } = e.target;
        
        if (name === 'file') {
            setRecipeData(prev => ({ ...prev, file: files[0] }));
        } else {
            setRecipeData(prev => ({ ...prev, [name]: value }));
        }
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Check if user is logged in
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Please login to add recipes');
                setLoading(false);
                return;
            }

            // Create FormData object
            const formData = new FormData();
            formData.append('title', recipeData.title);
            formData.append('time', recipeData.time);
            formData.append('ingredients', recipeData.ingredients); // Will be split on backend
            formData.append('instructions', recipeData.instructions);
            
            if (recipeData.file) {
                formData.append('file', recipeData.file);
            }

            // Log for debugging
            console.log('Sending recipe data...');
            console.log('Token:', token);

            // Send request
            const response = await axios.post(
                'http://localhost:5000/recipe',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}` // Capital B in Bearer
                    }
                }
            );

            console.log('Recipe added:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error adding recipe:', error);
            setError(
                error.response?.data?.message || 
                'Failed to add recipe. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <form className='form' onSubmit={onHandleSubmit}>
                {error && (
                    <div className="alert alert-error" style={{ 
                        background: '#fee', 
                        color: '#c00', 
                        padding: '10px', 
                        marginBottom: '15px',
                        borderRadius: '4px'
                    }}>
                        {error}
                    </div>
                )}

                <div className='form-control'>
                    <label>Title *</label>
                    <input 
                        type="text" 
                        className='input' 
                        name="title" 
                        value={recipeData.title}
                        onChange={onHandleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className='form-control'>
                    <label>Time *</label>
                    <input 
                        type="text" 
                        className='input' 
                        name="time" 
                        value={recipeData.time}
                        onChange={onHandleChange}
                        placeholder="e.g., 30 mins"
                        required
                        disabled={loading}
                    />
                </div>

                <div className='form-control'>
                    <label>Ingredients * (comma-separated)</label>
                    <textarea 
                        className='input-textarea' 
                        name="ingredients" 
                        rows="2" 
                        value={recipeData.ingredients}
                        onChange={onHandleChange}
                        placeholder="e.g., 2 cups flour, 1 cup sugar, 3 eggs"
                        required
                        disabled={loading}
                    />
                </div>

                <div className='form-control'>
                    <label>Instructions *</label>
                    <textarea 
                        className='input-textarea' 
                        name="instructions" 
                        rows="3" 
                        value={recipeData.instructions}
                        onChange={onHandleChange}
                        required
                        disabled={loading}
                    />
                </div>

                <div className='form-control'>
                    <label>Recipe Image *</label>
                    <input 
                        type="file" 
                        className='input' 
                        name="file" 
                        onChange={onHandleChange}
                        accept="image/*"
                        required
                        disabled={loading}
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Adding Recipe...' : 'Add Recipe'}
                </button>
            </form>
        </div>
    );
}