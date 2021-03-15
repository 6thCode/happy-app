import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import ErrorBoundary from "../components/errorBoundary";
import { Link } from "react-router-dom";
import backArrow from '../imgs/arrow-back.png';

function Category(props) {
  const [error, setError] = useState(null);
  const [isLoadinng, setLoading] = useState(false);
  const [CategoryData, setCategoryData] = useState({});

  useEffect(() => {
    firstLoad(props.computedMatch.params.categoryId);
    // eslint-disable-next-line
  }, []);

  const firstLoad = (category) => {
    setLoading(true);
    const contentUrl =
      "https://v2.jokeapi.dev/joke/" +
      category +
      "?blacklistFlags=nsfw,religious,racist,sexist";

    fetch(`${contentUrl}`)
      .then((response) => response.json())
      .then(
        (data) => {
          setCategoryData({ ...data });
          setLoading(false);
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
      <div className="section">
        <Link className="back-button" to="">
          <img src={backArrow} width="25" height="25" alt="arrow" />
        </Link>
        <ErrorBoundary>
          {isLoadinng ? (
            <Loader
              className="center-loader"
              type="ThreeDots"
              color="#595ecd"
              height={50}
              width={50}
            />
          ) : (
            <div className="joke-section">
              {CategoryData.setup ? (
                <>
                  <p className="joke-type">
                    Type:- <span>{CategoryData.type}</span>
                  </p>
                  <p>
                    Setup<span>{CategoryData.setup}</span>
                  </p>
                  <p>
                    Delivery<span>{CategoryData.delivery}</span>
                  </p>
                </>
              ) : (
                <>
                  <p className="joke-type">
                    Type:- <span>{CategoryData.type}</span>
                  </p>
                  <p>
                    Joke<span>{CategoryData.joke}</span>
                  </p>
                </>
              )}

              <div className="">
                <Button
                  title="Randomize"
                  handleClick={() => {
                    firstLoad(props.computedMatch.params.categoryId);
                  }}
                />
              </div>
            </div>
          )}
          <ToastContainer />
        </ErrorBoundary>
      </div>
    );
  }
}

export default Category;
