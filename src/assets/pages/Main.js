import React, { useState, useEffect } from "react";
import ErrorBoundary from "../components/errorBoundary";
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

  useEffect(() => {
    firstLoad();
  }, []);

  const firstLoad = () => {
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
        <ErrorBoundary>
        <h2 className="text-center pb-5">Happy App</h2>
          {isLoadinng ? (
            <Loader
              type="ThreeDots"
              color="#595ecd"
              height={50}
              width={50}
              timeout={3000}
            />
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
        </ErrorBoundary>
      </div>
    );
  }
}

export default Main;
