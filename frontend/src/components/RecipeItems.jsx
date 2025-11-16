// import React, { useEffect, useState } from "react";
// import { Link, useLoaderData, useNavigate } from "react-router-dom";
// import foodImg from "../assets/foodRecipe.png";
// import { BsStopwatchFill } from "react-icons/bs";
// import { FaHeart } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete, MdClose } from "react-icons/md";
// import { IoEyeSharp } from "react-icons/io5";
// import axios from "axios";

// export default function RecipeItems() {
//   const recipes = useLoaderData();
//   const [allRecipes, setAllRecipes] = useState([]);
//   const [selectedRecipe, setSelectedRecipe] = useState(null);
//   let path = window.location.pathname === "/myRecipe" ? true : false;
//   const navigate = useNavigate();

//   // Get current user ID once
//   const getCurrentUserId = () => {
//     try {
//       const user = JSON.parse(localStorage.getItem("user") || "{}");
//       return user._id || null;
//     } catch {
//       return null;
//     }
//   };

//   useEffect(() => {
//     console.log("Loaded recipes:", recipes);
//     setAllRecipes(recipes);
//   }, [recipes]);

//   const onDelete = async (id) => {
//     await axios
//       .delete(`http://localhost:5000/recipe/${id}`)
//       .then((res) => console.log(res));
//     setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
//   };

//   // Toggle like/unlike functionality
//   const toggleLike = async (recipeId) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please login to like recipes!");
//         return;
//       }

//       const currentUserId = getCurrentUserId();
//       if (!currentUserId) {
//         alert("User information not found. Please login again.");
//         return;
//       }

//       const response = await axios.post(
//         `http://localhost:5000/recipe/${recipeId}/favorite`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         setAllRecipes((prevRecipes) =>
//           prevRecipes.map((recipe) =>
//             recipe._id === recipeId
//               ? {
//                   ...recipe,
//                   likeCount: response.data.likeCount,
//                   likes: response.data.liked
//                     ? [...(recipe.likes || []), currentUserId]
//                     : (recipe.likes || []).filter((id) => id !== currentUserId),
//                 }
//               : recipe
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Error toggling like:", error);
//       if (error.response?.status === 401) {
//         alert("Please login to like recipes!");
//       }
//     }
//   };

//   // Check if current user liked this recipe
//   const isLikedByCurrentUser = (recipe) => {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     const currentUserId = getCurrentUserId();
//     if (!currentUserId) return false;

//     return recipe.likes && recipe.likes.includes(currentUserId);
//   };

//   // Helper function to truncate text
//   const truncateText = (text, maxLength) => {
//     if (!text) return "No details available";
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   };

//   // Helper function to format ingredients array
//   const formatIngredients = (ingredients) => {
//     if (!ingredients || ingredients.length === 0)
//       return "No ingredients listed";

//     if (typeof ingredients === "string") {
//       return truncateText(ingredients, 100);
//     }

//     if (Array.isArray(ingredients)) {
//       if (ingredients.length <= 3) {
//         return ingredients.join(", ");
//       }
//       return `${ingredients.slice(0, 3).join(", ")}... (+${
//         ingredients.length - 3
//       } more)`;
//     }

//     return "No ingredients listed";
//   };

//   // Format full ingredients for modal
//   const formatFullIngredients = (ingredients) => {
//     if (!ingredients || ingredients.length === 0)
//       return "No ingredients listed";

//     if (typeof ingredients === "string") {
//       return ingredients;
//     }

//     if (Array.isArray(ingredients)) {
//       return ingredients.join(", ");
//     }

//     return "No ingredients listed";
//   };

//   return (
//     <>
//       <div className="card-container">
//         {allRecipes && allRecipes.length > 0 ? (
//           allRecipes.map((item, index) => {
//             return (
//               <div key={index} className="card">
//                 <img
//                   src={`http://localhost:5000/images/${item.coverImage}`}
//                   width="120px"
//                   height="100px"
//                   alt={item.title}
//                   onError={(e) => {
//                     e.target.src = foodImg;
//                   }}
//                 />
//                 <div className="card-body">
//                   <div className="title">{item.title || "Untitled Recipe"}</div>

//                   {/* Ingredients display */}
//                   <div
//                     className="ingredients-section"
//                     style={{
//                       fontSize: "0.85rem",
//                       color: "#555",
//                       marginTop: "8px",
//                       marginBottom: "8px",
//                       padding: "8px",
//                       backgroundColor: "#f9f9f9",
//                       borderRadius: "4px",
//                       border: "1px solid #eee",
//                     }}
//                   >
//                     <strong style={{ color: "#ff6b35" }}>
//                       🥘 Ingredients:
//                     </strong>
//                     <br />
//                     <span style={{ fontSize: "0.8rem" }}>
//                       {formatIngredients(item.ingredients)}
//                     </span>
//                   </div>

//                   {/* Instructions display */}
//                   <div
//                     className="instructions-section"
//                     style={{
//                       fontSize: "0.85rem",
//                       color: "#555",
//                       marginBottom: "10px",
//                       padding: "8px",
//                       backgroundColor: "#f9f9f9",
//                       borderRadius: "4px",
//                       lineHeight: "1.4",
//                       border: "1px solid #eee",
//                     }}
//                   >
//                     <strong style={{ color: "#ff6b35" }}>
//                       📝 Instructions:
//                     </strong>
//                     <br />
//                     <span style={{ fontSize: "0.8rem" }}>
//                       {truncateText(item.instructions, 80)}
//                     </span>
//                   </div>

//                   {/* View Details Button */}
//                   <button
//                     onClick={() => setSelectedRecipe(item)}
//                     style={{
//                       width: "100%",
//                       padding: "0.6rem",
//                       background: "linear-gradient(135deg, #ff6b35, #f7931e)",
//                       color: "white",
//                       border: "none",
//                       borderRadius: "8px",
//                       cursor: "pointer",
//                       fontWeight: "600",
//                       fontSize: "0.85rem",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       gap: "0.5rem",
//                       transition: "all 0.3s ease",
//                       marginBottom: "0.5rem",
//                     }}
//                     onMouseOver={(e) => {
//                       e.currentTarget.style.transform = "translateY(-2px)";
//                       e.currentTarget.style.boxShadow =
//                         "0 4px 12px rgba(255, 107, 53, 0.4)";
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.transform = "translateY(0)";
//                       e.currentTarget.style.boxShadow = "none";
//                     }}
//                   >
//                     <IoEyeSharp /> View Full Recipe
//                   </button>

//                   <div className="icons">
//                     <div className="timer">
//                       <BsStopwatchFill /> {item.time || "N/A"}
//                     </div>
//                     {!path ? (
//                       <div
//                         style={{
//                           display: "flex",
//                           alignItems: "center",
//                           gap: "8px",
//                         }}
//                       >
//                         <FaHeart
//                           onClick={() => toggleLike(item._id)}
//                           style={{
//                             color: isLikedByCurrentUser(item) ? "red" : "#ccc",
//                             cursor: "pointer",
//                             transition: "all 0.2s ease",
//                             fontSize: "20px",
//                           }}
//                           title={isLikedByCurrentUser(item) ? "Unlike" : "Like"}
//                         />
//                         <span
//                           style={{
//                             fontSize: "0.85rem",
//                             color: "#666",
//                             fontWeight: "500",
//                           }}
//                         >
//                           {item.likeCount || 0}
//                         </span>
//                       </div>
//                     ) : (
//                       <div className="action">
//                         <Link
//                           to={`/editRecipe/${item._id}`}
//                           className="editIcon"
//                         >
//                           <FaEdit />
//                         </Link>
//                         <MdDelete
//                           onClick={() => onDelete(item._id)}
//                           className="deleteIcon"
//                         />
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <div
//             style={{
//               gridColumn: "1 / -1",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               minHeight: "270px",
//               width: "100%",
//             }}
//           >
//             <div
//               style={{
//                 textAlign: "center",
//                 color: "#666",
//                 fontSize: "18px",
//               }}
//             >
//               No recipes found. Add your first recipe!
//             </div>
//           </div>
//         )}
//       </div>
//       {/* Recipe Details Modal */}
//       {selectedRecipe && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//             padding: "1rem",
//           }}
//           onClick={() => setSelectedRecipe(null)}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               borderRadius: "20px",
//               maxWidth: "800px",
//               width: "100%",
//               maxHeight: "85vh",
//               display: "flex",
//               flexDirection: "column",
//               position: "relative",
//               boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
//               overflow: "hidden",
//             }}
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close Button - Fixed Position */}
//             <button
//               onClick={() => setSelectedRecipe(null)}
//               style={{
//                 position: "absolute",
//                 top: "15px",
//                 right: "15px",
//                 background: "#f44336",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "50%",
//                 width: "40px",
//                 height: "40px",
//                 minWidth: "40px",
//                 minHeight: "40px",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 cursor: "pointer",
//                 fontSize: "1.5rem",
//                 fontWeight: "bold",
//                 lineHeight: "1",
//                 zIndex: 10,
//                 boxShadow: "0 4px 12px rgba(244, 67, 54, 0.4)",
//                 transition: "all 0.3s ease",
//                 padding: "0",
//               }}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.background = "#d32f2f";
//                 e.currentTarget.style.transform = "scale(1.1)";
//                 e.currentTarget.style.boxShadow =
//                   "0 6px 16px rgba(211, 47, 47, 0.5)";
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.background = "#f44336";
//                 e.currentTarget.style.transform = "scale(1)";
//                 e.currentTarget.style.boxShadow =
//                   "0 4px 12px rgba(244, 67, 54, 0.4)";
//               }}
//             >
//               ×
//             </button>
//             {/* Recipe Image - Fixed Height */}
//             <div
//               style={{
//                 flexShrink: 0,
//                 height: "290px",
//                 overflow: "hidden",
//                 backgroundColor: "#f5f5f5",
//               }}
//             >
//               <img
//                 src={`http://localhost:5000/images/${selectedRecipe.coverImage}`}
//                 alt={selectedRecipe.title}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "contain",
//                   display: "block",
//                 }}
//                 onError={(e) => {
//                   e.target.src = foodImg;
//                 }}
//               />
//             </div>
//             {/* Scrollable Content */}
//             <div
//               style={{
//                 overflowY: "auto",
//                 flex: 1,
//                 padding: "1.5rem 2rem 2rem 2rem",
//                 scrollbarWidth: "none", // Firefox
//                 msOverflowStyle: "none", // IE and Edge
//               }}
//               className="hide-scrollbar"
//             >
//               <h2
//                 style={{
//                   fontSize: "1.8rem",
//                   fontWeight: "800",
//                   color: "#2c3639",
//                   marginBottom: "1rem",
//                   background: "linear-gradient(135deg, #ff6b35, #f7931e)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   paddingRight: "2rem",
//                 }}
//               >
//                 {selectedRecipe.title}
//               </h2>

//               {/* Time Badge */}
//               <div
//                 style={{
//                   display: "inline-flex",
//                   alignItems: "center",
//                   gap: "0.5rem",
//                   padding: "0.5rem 1rem",
//                   background: "linear-gradient(135deg, #ff6b35, #f7931e)",
//                   color: "white",
//                   borderRadius: "50px",
//                   fontSize: "0.9rem",
//                   fontWeight: "600",
//                   marginBottom: "1.5rem",
//                 }}
//               >
//                 <BsStopwatchFill /> {selectedRecipe.time || "N/A"}
//               </div>

//               {/* Ingredients Section */}
//               <div
//                 style={{
//                   marginBottom: "1.5rem",
//                   padding: "1.25rem",
//                   background: "#fff8f3",
//                   borderRadius: "12px",
//                   border: "2px solid #ffe8d6",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.2rem",
//                     fontWeight: "700",
//                     color: "#ff6b35",
//                     marginBottom: "0.8rem",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                   }}
//                 >
//                   🥘 Ingredients
//                 </h3>
//                 <p
//                   style={{
//                     fontSize: "0.95rem",
//                     color: "#555",
//                     lineHeight: "1.7",
//                     whiteSpace: "pre-wrap",
//                   }}
//                 >
//                   {formatFullIngredients(selectedRecipe.ingredients)}
//                 </p>
//               </div>

//               {/* Instructions Section */}
//               <div
//                 style={{
//                   padding: "1.25rem",
//                   background: "#f9f9f9",
//                   borderRadius: "12px",
//                   border: "2px solid #eee",
//                   marginBottom: "1rem",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontSize: "1.2rem",
//                     fontWeight: "700",
//                     color: "#ff6b35",
//                     marginBottom: "0.8rem",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "0.5rem",
//                   }}
//                 >
//                   📝 Instructions
//                 </h3>
//                 <p
//                   style={{
//                     fontSize: "0.95rem",
//                     color: "#555",
//                     lineHeight: "1.7",
//                     whiteSpace: "pre-wrap",
//                   }}
//                 >
//                   {selectedRecipe.instructions || "No instructions provided"}
//                 </p>
//               </div>

//               {/* Like Section in Modal */}
//               {!path && (
//                 <div
//                   style={{
//                     marginTop: "1rem",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     gap: "1rem",
//                     padding: "1rem",
//                     background: "#fff8f3",
//                     borderRadius: "12px",
//                   }}
//                 >
//                   <FaHeart
//                     onClick={() => toggleLike(selectedRecipe._id)}
//                     style={{
//                       color: isLikedByCurrentUser(selectedRecipe)
//                         ? "red"
//                         : "#ccc",
//                       cursor: "pointer",
//                       fontSize: "1.8rem",
//                       transition: "all 0.2s ease",
//                     }}
//                   />
//                   <span
//                     style={{
//                       fontSize: "1.1rem",
//                       fontWeight: "600",
//                       color: "#666",
//                     }}
//                   >
//                     {selectedRecipe.likeCount || 0} likes
//                   </span>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import foodImg from "../assets/foodRecipe.png";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdClose } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import axios from "axios";

// ✅ UPDATED: Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  let path = window.location.pathname === "/myRecipe" ? true : false;
  const navigate = useNavigate();

  // Get current user ID once
  const getCurrentUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user._id || null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    console.log("Loaded recipes:", recipes);
    setAllRecipes(recipes);
  }, [recipes]);

  const onDelete = async (id) => {
    // ✅ UPDATED: Use API_URL variable
    await axios
      .delete(`${API_URL}/recipe/${id}`)
      .then((res) => console.log(res));
    setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
  };

  // Toggle like/unlike functionality
  const toggleLike = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login to like recipes!");
        return;
      }

      const currentUserId = getCurrentUserId();
      if (!currentUserId) {
        alert("User information not found. Please login again.");
        return;
      }

      // ✅ UPDATED: Use API_URL variable
      const response = await axios.post(
        `${API_URL}/recipe/${recipeId}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setAllRecipes((prevRecipes) =>
          prevRecipes.map((recipe) =>
            recipe._id === recipeId
              ? {
                  ...recipe,
                  likeCount: response.data.likeCount,
                  likes: response.data.liked
                    ? [...(recipe.likes || []), currentUserId]
                    : (recipe.likes || []).filter((id) => id !== currentUserId),
                }
              : recipe
          )
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      if (error.response?.status === 401) {
        alert("Please login to like recipes!");
      }
    }
  };

  // Check if current user liked this recipe
  const isLikedByCurrentUser = (recipe) => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const currentUserId = getCurrentUserId();
    if (!currentUserId) return false;

    return recipe.likes && recipe.likes.includes(currentUserId);
  };

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {
    if (!text) return "No details available";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Helper function to format ingredients array
  const formatIngredients = (ingredients) => {
    if (!ingredients || ingredients.length === 0)
      return "No ingredients listed";

    if (typeof ingredients === "string") {
      return truncateText(ingredients, 100);
    }

    if (Array.isArray(ingredients)) {
      if (ingredients.length <= 3) {
        return ingredients.join(", ");
      }
      return `${ingredients.slice(0, 3).join(", ")}... (+${
        ingredients.length - 3
      } more)`;
    }

    return "No ingredients listed";
  };

  // Format full ingredients for modal
  const formatFullIngredients = (ingredients) => {
    if (!ingredients || ingredients.length === 0)
      return "No ingredients listed";

    if (typeof ingredients === "string") {
      return ingredients;
    }

    if (Array.isArray(ingredients)) {
      return ingredients.join(", ");
    }

    return "No ingredients listed";
  };

  return (
    <>
      <div className="card-container">
        {allRecipes && allRecipes.length > 0 ? (
          allRecipes.map((item, index) => {
            return (
              <div key={index} className="card">
                {/* ✅ UPDATED: Use API_URL for images */}
                <img
                  src={`${API_URL}/images/${item.coverImage}`}
                  width="120px"
                  height="100px"
                  alt={item.title}
                  onError={(e) => {
                    e.target.src = foodImg;
                  }}
                />
                <div className="card-body">
                  <div className="title">{item.title || "Untitled Recipe"}</div>

                  {/* Ingredients display */}
                  <div
                    className="ingredients-section"
                    style={{
                      fontSize: "0.85rem",
                      color: "#555",
                      marginTop: "8px",
                      marginBottom: "8px",
                      padding: "8px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "4px",
                      border: "1px solid #eee",
                    }}
                  >
                    <strong style={{ color: "#ff6b35" }}>
                      🥘 Ingredients:
                    </strong>
                    <br />
                    <span style={{ fontSize: "0.8rem" }}>
                      {formatIngredients(item.ingredients)}
                    </span>
                  </div>

                  {/* Instructions display */}
                  <div
                    className="instructions-section"
                    style={{
                      fontSize: "0.85rem",
                      color: "#555",
                      marginBottom: "10px",
                      padding: "8px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "4px",
                      lineHeight: "1.4",
                      border: "1px solid #eee",
                    }}
                  >
                    <strong style={{ color: "#ff6b35" }}>
                      📝 Instructions:
                    </strong>
                    <br />
                    <span style={{ fontSize: "0.8rem" }}>
                      {truncateText(item.instructions, 80)}
                    </span>
                  </div>

                  {/* View Details Button */}
                  <button
                    onClick={() => setSelectedRecipe(item)}
                    style={{
                      width: "100%",
                      padding: "0.6rem",
                      background: "linear-gradient(135deg, #ff6b35, #f7931e)",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      transition: "all 0.3s ease",
                      marginBottom: "0.5rem",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 12px rgba(255, 107, 53, 0.4)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <IoEyeSharp /> View Full Recipe
                  </button>

                  <div className="icons">
                    <div className="timer">
                      <BsStopwatchFill /> {item.time || "N/A"}
                    </div>
                    {!path ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <FaHeart
                          onClick={() => toggleLike(item._id)}
                          style={{
                            color: isLikedByCurrentUser(item) ? "red" : "#ccc",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            fontSize: "20px",
                          }}
                          title={isLikedByCurrentUser(item) ? "Unlike" : "Like"}
                        />
                        <span
                          style={{
                            fontSize: "0.85rem",
                            color: "#666",
                            fontWeight: "500",
                          }}
                        >
                          {item.likeCount || 0}
                        </span>
                      </div>
                    ) : (
                      <div className="action">
                        <Link
                          to={`/editRecipe/${item._id}`}
                          className="editIcon"
                        >
                          <FaEdit />
                        </Link>
                        <MdDelete
                          onClick={() => onDelete(item._id)}
                          className="deleteIcon"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "270px",
              width: "100%",
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: "#666",
                fontSize: "18px",
              }}
            >
              No recipes found. Add your first recipe!
            </div>
          </div>
        )}
      </div>
      {/* Recipe Details Modal */}
      {selectedRecipe && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "1rem",
          }}
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "20px",
              maxWidth: "800px",
              width: "100%",
              maxHeight: "85vh",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedRecipe(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                minWidth: "40px",
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "1.5rem",
                fontWeight: "bold",
                lineHeight: "1",
                zIndex: 10,
                boxShadow: "0 4px 12px rgba(244, 67, 54, 0.4)",
                transition: "all 0.3s ease",
                padding: "0",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "#d32f2f";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "#f44336";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ×
            </button>
            {/* Recipe Image */}
            <div
              style={{
                flexShrink: 0,
                height: "290px",
                overflow: "hidden",
                backgroundColor: "#f5f5f5",
              }}
            >
              {/* ✅ UPDATED: Use API_URL for images */}
              <img
                src={`${API_URL}/images/${selectedRecipe.coverImage}`}
                alt={selectedRecipe.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  display: "block",
                }}
                onError={(e) => {
                  e.target.src = foodImg;
                }}
              />
            </div>
            {/* Scrollable Content */}
            <div
              style={{
                overflowY: "auto",
                flex: 1,
                padding: "1.5rem 2rem 2rem 2rem",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
              className="hide-scrollbar"
            >
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontWeight: "800",
                  color: "#2c3639",
                  marginBottom: "1rem",
                  background: "linear-gradient(135deg, #ff6b35, #f7931e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  paddingRight: "2rem",
                }}
              >
                {selectedRecipe.title}
              </h2>

              {/* Time Badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  background: "linear-gradient(135deg, #ff6b35, #f7931e)",
                  color: "white",
                  borderRadius: "50px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  marginBottom: "1.5rem",
                }}
              >
                <BsStopwatchFill /> {selectedRecipe.time || "N/A"}
              </div>

              {/* Ingredients Section */}
              <div
                style={{
                  marginBottom: "1.5rem",
                  padding: "1.25rem",
                  background: "#fff8f3",
                  borderRadius: "12px",
                  border: "2px solid #ffe8d6",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: "#ff6b35",
                    marginBottom: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  🥘 Ingredients
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "#555",
                    lineHeight: "1.7",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {formatFullIngredients(selectedRecipe.ingredients)}
                </p>
              </div>

              {/* Instructions Section */}
              <div
                style={{
                  padding: "1.25rem",
                  background: "#f9f9f9",
                  borderRadius: "12px",
                  border: "2px solid #eee",
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: "#ff6b35",
                    marginBottom: "0.8rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  📝 Instructions
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "#555",
                    lineHeight: "1.7",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {selectedRecipe.instructions || "No instructions provided"}
                </p>
              </div>

              {/* Like Section in Modal */}
              {!path && (
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "1rem",
                    padding: "1rem",
                    background: "#fff8f3",
                    borderRadius: "12px",
                  }}
                >
                  <FaHeart
                    onClick={() => toggleLike(selectedRecipe._id)}
                    style={{
                      color: isLikedByCurrentUser(selectedRecipe)
                        ? "red"
                        : "#ccc",
                      cursor: "pointer",
                      fontSize: "1.8rem",
                      transition: "all 0.2s ease",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: "600",
                      color: "#666",
                    }}
                  >
                    {selectedRecipe.likeCount || 0} likes
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
