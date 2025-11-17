// // import { createBrowserRouter, RouterProvider } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import Home from "./pages/Home";
// // import AddFoodRecipe from "./pages/AddFoodRecipe";
// // import EditRecipe from "./pages/EditRecipe";
// // import Favourites from "./pages/Favourites";
// // import MainNavigation from "./components/MainNavigation";
// // import api from './config/api';
// // import './App.css';

// // // Loader function to fetch all recipes (for home page)
// // export const recipesLoader = async () => {
// //   try {
// //     const response = await api.get("/recipe/");
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error loading recipes:", error);
// //     return [];
// //   }
// // };

// // // Loader function for user's own recipes (for My Recipe page)
// // export const myRecipesLoader = async () => {
// //   try {
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       console.log("No token found, returning empty array");
// //       return [];
// //     }
    
// //     const response = await api.get("/recipe/my");
    
// //     console.log("My recipes loaded:", response.data);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error loading my recipes:", error);
// //     return [];
// //   }
// // };

// // // Loader function for a specific recipe
// // export const recipeLoader = async ({ params }) => {
// //   try {
// //     const response = await api.get(`/recipe/${params.id}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error("Error loading recipe:", error);
// //     throw new Response("Recipe not found", { status: 404 });
// //   }
// // };

// // const router = createBrowserRouter([
// //   {
// //     path: "/",
// //     element: <MainNavigation />,
// //     children: [
// //       { 
// //         index: true, 
// //         element: <Home />, 
// //         loader: recipesLoader 
// //       },
// //       { 
// //         path: "myRecipe", 
// //         element: <Home />, 
// //         loader: myRecipesLoader 
// //       },
// //       { 
// //         path: "addRecipe", 
// //         element: <AddFoodRecipe /> 
// //       },
// //       { 
// //         path: "favourites", 
// //         element: <Favourites /> 
// //       },
// //       { 
// //         path: "editRecipe/:id", 
// //         element: <EditRecipe />, 
// //         loader: recipeLoader 
// //       }
// //     ]
// //   }
// // ]);

// // // Loader Component
// // function Loader() {
// //   return (
// //     <div className="loader-overlay">
// //       <div className="loader-container">
// //         <div className="food-loader">
// //           <div className="plate">
// //             <div className="food-item food-1"></div>
// //             <div className="food-item food-2"></div>
// //             <div className="food-item food-3"></div>
// //           </div>
// //           <div className="steam steam-1"></div>
// //           <div className="steam steam-2"></div>
// //           <div className="steam steam-3"></div>
// //         </div>
// //         <p className="loader-text">Loading delicious recipes...</p>
// //       </div>
// //     </div>
// //   );
// // }

// // function App() {
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Simulate initial app loading
// //     const timer = setTimeout(() => {
// //       setLoading(false);
// //     }, 1500);

// //     return () => clearTimeout(timer);
// //   }, []);

// //   if (loading) {
// //     return <Loader />;
// //   }

// //   return <RouterProvider router={router} />;
// // }

// // export default App;



// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { useState, useEffect } from "react";
// import Home from "./pages/Home";
// import AddFoodRecipe from "./pages/AddFoodRecipe";
// import EditRecipe from "./pages/EditRecipe";
// import Favourites from "./pages/Favourites";
// import MainNavigation from "./components/MainNavigation";
// import InitialLoader from "./components/InitialLoader"; // Import your loader
// import api from './config/api';
// import './App.css';

// // Loader function to fetch all recipes (for home page)
// export const recipesLoader = async () => {
//   try {
//     const response = await api.get("/recipe/");
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
    
//     const response = await api.get("/recipe/my");
    
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
//     const response = await api.get(`/recipe/${params.id}`);
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
//   const [isInitialLoading, setIsInitialLoading] = useState(true);

//   useEffect(() => {
//     let isComponentMounted = true;

//     const checkBackendAndLoad = async () => {
//       const startTime = Date.now();
//       const MINIMUM_LOADING_TIME = 2500; // Show loader for at least 2.5 seconds

//       try {
//         // Check backend health by pinging the recipe endpoint
//         const response = await fetch('https://crave-craftv2.onrender.com/api/recipe/', {
//           method: 'GET',
//           signal: AbortSignal.timeout(90000), // 90 second timeout
//         });

//         if (response.ok) {
//           // Calculate remaining time to meet minimum display
//           const elapsedTime = Date.now() - startTime;
//           const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

//           // Wait for remaining time, then hide loader
//           await new Promise(resolve => setTimeout(resolve, remainingTime));
          
//           if (isComponentMounted) {
//             setIsInitialLoading(false);
//           }
//         } else {
//           throw new Error('Backend not ready');
//         }
//       } catch (error) {
//         console.error('Health check failed:', error);
//         // Retry after 3 seconds
//         if (isComponentMounted) {
//           setTimeout(checkBackendAndLoad, 3000);
//         }
//       }
//     };

//     checkBackendAndLoad();

//     // Cleanup function
//     return () => {
//       isComponentMounted = false;
//     };
//   }, []);

//   if (isInitialLoading) {
//     return <InitialLoader />;
//   }

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
import InitialLoader from "./components/InitialLoader";
import api from './config/api';
import './App.css';

// Loader function to fetch all recipes (for home page)
export const recipesLoader = async () => {
  try {
    const response = await api.get("/recipe/");
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
    
    const response = await api.get("/recipe/my");
    
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
    const response = await api.get(`/recipe/${params.id}`);
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

function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    let isComponentMounted = true;

    const checkBackendAndLoad = async () => {
      const startTime = Date.now();
      const MINIMUM_LOADING_TIME = 2000; // Show loader for at least 2 seconds

      try {
        // Ping your existing recipe endpoint to wake up the backend
        const response = await fetch('https://crave-craftv2.onrender.com/api/recipe', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: AbortSignal.timeout(90000), // 90 second timeout
        });

        if (response.ok || response.status === 200) {
          // Calculate remaining time to meet minimum display
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

          // Wait for remaining time, then hide loader
          await new Promise(resolve => setTimeout(resolve, remainingTime));
          
          if (isComponentMounted) {
            setIsInitialLoading(false);
          }
        } else {
          throw new Error('Backend not ready');
        }
      } catch (error) {
        console.error('Backend check failed, retrying...', error.message);
        // Retry after 3 seconds
        if (isComponentMounted) {
          setTimeout(checkBackendAndLoad, 3000);
        }
      }
    };

    checkBackendAndLoad();

    // Cleanup function
    return () => {
      isComponentMounted = false;
    };
  }, []);

  if (isInitialLoading) {
    return <InitialLoader />;
  }

  return <RouterProvider router={router} />;
}

export default App;