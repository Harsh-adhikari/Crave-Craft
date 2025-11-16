// import React, { useEffect, useState } from "react";
// import { Link, useLoaderData, useNavigate } from "react-router-dom";
// import foodImg from "../assets/foodRecipe.png";
// import { BsStopwatchFill } from "react-icons/bs";
// import { FaHeart } from "react-icons/fa6";
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";
// import axios from "axios";

// export default function RecipeItems() {
//   const recipes = useLoaderData();
//   const [allRecipes, setAllRecipes] = useState([]);
//   let path = window.location.pathname === "/myRecipe" ? true : false;
//   const navigate = useNavigate();

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

//   // New: Toggle like/unlike functionality
//   const toggleLike = async (recipeId) => {
//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         alert("Please login to like recipes!");
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
//         // Update the like count in the local state
//         setAllRecipes((prevRecipes) =>
//           prevRecipes.map((recipe) =>
//             recipe._id === recipeId
//               ? {
//                   ...recipe,
//                   likeCount: response.data.likeCount,
//                   likes: response.data.liked
//                     ? [...(recipe.likes || []), "current-user"]
//                     : (recipe.likes || []).filter(
//                         (id) => id !== "current-user"
//                       ),
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

//   // Helper: Check if current user liked this recipe
//   const isLikedByCurrentUser = (recipe) => {
//     const token = localStorage.getItem("token");
//     if (!token) return false;

//     const user = JSON.parse(localStorage.getItem("user") || "{}");
//     return recipe.likes && recipe.likes.includes(user._id);
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
//                       {truncateText(item.instructions, 100)}
//                     </span>
//                   </div>

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
//     </>
//   );
// }




import React, { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import foodImg from "../assets/foodRecipe.png";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export default function RecipeItems() {
  const recipes = useLoaderData();
  const [allRecipes, setAllRecipes] = useState([]);
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
    await axios
      .delete(`http://localhost:5000/recipe/${id}`)
      .then((res) => console.log(res));
    setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
  };

  // Fixed: Toggle like/unlike functionality
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

      const response = await axios.post(
        `http://localhost:5000/recipe/${recipeId}/favorite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Update the like count and likes array in the local state
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

  // Fixed: Check if current user liked this recipe
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

  return (
    <>
      <div className="card-container">
        {allRecipes && allRecipes.length > 0 ? (
          allRecipes.map((item, index) => {
            return (
              <div key={index} className="card">
                <img
                  src={`http://localhost:5000/images/${item.coverImage}`}
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
                      {truncateText(item.instructions, 100)}
                    </span>
                  </div>

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
    </>
  );
}