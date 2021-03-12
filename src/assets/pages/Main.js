import React, { useState, useEffect } from "react";
import ErrorBoundary from "../components/errorBoundary";
import Button from "../components/Button";
import { Link } from "react-router-dom";

function Main(props) {
  const [isLoadinng, setLoading] = useState(true);
  const [CategoryData, setCategoryData] = useState({ categories: [] });

  useEffect(() => {
    firstLoad();
  });

  const firstLoad = () => {
    setLoading(false);

    fetch("https://v2.jokeapi.dev/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategoryData({ ...data });
        setLoading(true);
      });
  };

  return (
    <div className="container main-sectiion">
      <ErrorBoundary>
        {isLoadinng
          ? "loading..."
          : Object.keys(CategoryData).length > 0
          ? CategoryData.categories.map((item, i) => {
              return (
                <Link key={i} className="w-25" to={"/category/" + item}>
                  <Button title={item} />
                </Link>
              );
            })
          : null}
      </ErrorBoundary>
    </div>
  );
}

export default Main;
