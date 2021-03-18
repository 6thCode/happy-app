import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Main() {
  const [error, setError] = useState(null);
  const [isLoadinng, setLoading] = useState(false);
  const [CategoryData, setCategoryData] = useState({ categories: [] });

  const apiUrl = "https://v2.jokeapi.dev/categories"

  // Fetching categories begins here 
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    fetch(`${apiUrl}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setLoading(false);
          setCategoryData({ ...data });
        },
        (error) => {
          setLoading(true);
          setError(error);
        }
      );
  };

  if (error) {
    toast.error("Failed to load Content");
  } else {
    return (
      <div className="container main-sectiion">
        <h2 className="text-center pb-5">Happy App</h2>
        {/* Fetching categories begins here */}
        {isLoadinng ? (
          <Loader type="ThreeDots" color="#595ecd" height={50} width={50} />
        ) : (
          CategoryData.categories.map((item, i) => {
            return (
              <Link key={i} to={"/category/" + item}>
                <Button title={item} />
              </Link>
            );
          })
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default Main;
