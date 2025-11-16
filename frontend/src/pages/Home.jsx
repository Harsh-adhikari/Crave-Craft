import React, { useState, useEffect } from "react";
import banner from "../assets/banner.png";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RecipeItems from "../components/RecipeItems";
import ImageCarousel from "../components/ImageCarousel";
import Modal from "../components/Modal";
import TypingEffect from '../components/TypingEffect';
import InputForm from "../components/InputForm";
import { useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Scroll to recipe section when on /myRecipe
  useEffect(() => {
    if (location.pathname === "/myRecipe") {
      // Wait for component to render, then scroll to recipes
      setTimeout(() => {
        const recipeSection = document.querySelector(".recipe");
        if (recipeSection) {
          recipeSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    } else {
      // Scroll to top for home page
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const addRecipe = () => {
    const token = localStorage.getItem("token");
    console.log("Share Recipe clicked, token:", token); // Debug

    if (token) {
      navigate("/addRecipe");
    } else {
      console.log("No token, opening modal"); // Debug
      setIsOpen(true);
    }
  };

  return (
    <>
      <section className="home">
        <div className="left">
          <h1>Share Something Delicious</h1>
          <TypingEffect />
          <button onClick={addRecipe}>Share your Recipe</button>
        </div>

        <div className="right">
          <img src={banner} width="320px" height="300px" alt="Food Recipe" />
        </div>
      </section>

      {/* Image Carousel - Only show on home page */}
      {location.pathname === "/" && <ImageCarousel />}

      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={setIsOpen} />
        </Modal>
      )}

      <div className="recipe">
        {/* Heading for Recipe Section */}
        <h2 className="section-heading">
          {location.pathname === "/myRecipe"
            ? "👨‍🍳 My Creations"
            : "🔥 Explore Recipes"}
        </h2>
        <RecipeItems />
      </div>
    </>
  );
}
