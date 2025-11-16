// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Home from "./pages/Home";
// import AddFoodRecipe from "./pages/AddFoodRecipe";
// import EditRecipe from "./pages/EditRecipe";
// import Favourites from "./pages/Favourites";
// import MainNavigation from "./components/MainNavigation";
// import axios from "axios";
// import './App.css';

// // Loader function to fetch all recipes (for home page)
// export const recipesLoader = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/recipe/");
//     return response.data;
//   } catch (error) {
//     console.error("Error loading recipes:", error);
//     return [];
//   }
// };

// // Loader function for user's own recipes (for My Recipe page)
// export const myRecipesLoader = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       console.log("No token found, returning empty array");
//       return [];
//     }
    
//     // Call the NEW endpoint with authentication
//     const response = await axios.get("http://localhost:5000/recipe/my", {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
    
//     console.log("My recipes loaded:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error loading my recipes:", error);
//     return [];
//   }
// };

// // Loader function for a specific recipe
// export const recipeLoader = async ({ params }) => {
//   try {
//     const response = await axios.get(`http://localhost:5000/recipe/${params.id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error loading recipe:", error);
//     throw new Response("Recipe not found", { status: 404 });
//   }
// };

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <MainNavigation />,
//     children: [
//       { 
//         index: true, 
//         element: <Home />, 
//         loader: recipesLoader 
//       },
//       { 
//         path: "myRecipe", 
//         element: <Home />, 
//         loader: myRecipesLoader 
//       },
//       { 
//         path: "addRecipe", 
//         element: <AddFoodRecipe /> 
//       },
//       { 
//         path: "favourites", 
//         element: <Favourites /> 
//       },
//       { 
//         path: "editRecipe/:id", 
//         element: <EditRecipe />, 
//         loader: recipeLoader 
//       }
//     ]
//   }
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;



import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";
import Favourites from "./pages/Favourites";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import './App.css';

// Loader function to fetch all recipes (for home page)
export const recipesLoader = async () => {
  try {
    const response = await axios.get("http://localhost:5000/recipe/");
    return response.data;
  } catch (error) {
    console.error("Error loading recipes:", error);
    return [];
  }
};

// Loader function for user's own recipes (for My Recipe page)
export const myRecipesLoader = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token found, returning empty array");
      return [];
    }
    
    // Call the NEW endpoint with authentication
    const response = await axios.get("http://localhost:5000/recipe/my", {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log("My recipes loaded:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error loading my recipes:", error);
    return [];
  }
};

// Loader function for a specific recipe
export const recipeLoader = async ({ params }) => {
  try {
    const response = await axios.get(`http://localhost:5000/recipe/${params.id}`);
    return response.data;
  } catch (error) {
    console.error("Error loading recipe:", error);
    throw new Response("Recipe not found", { status: 404 });
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { 
        index: true, 
        element: <Home />, 
        loader: recipesLoader 
      },
      { 
        path: "myRecipe", 
        element: <Home />, 
        loader: myRecipesLoader 
      },
      { 
        path: "addRecipe", 
        element: <AddFoodRecipe /> 
      },
      { 
        path: "favourites", 
        element: <Favourites /> 
      },
      { 
        path: "editRecipe/:id", 
        element: <EditRecipe />, 
        loader: recipeLoader 
      }
    ]
  }
]);

// Loader Component
function Loader() {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="food-loader">
          <div className="plate">
            <div className="food-item food-1"></div>
            <div className="food-item food-2"></div>
            <div className="food-item food-3"></div>
          </div>
          <div className="steam steam-1"></div>
          <div className="steam steam-2"></div>
          <div className="steam steam-3"></div>
        </div>
        <p className="loader-text">Loading delicious recipes...</p>
      </div>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <RouterProvider router={router} />;
}

export default App;