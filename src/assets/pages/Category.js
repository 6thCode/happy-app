import React, { useState, useEffect } from "react";
import Button from "../components/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import backArrow from "../imgs/arrow-back.png";

function Category(props) {
  const [error, setError] = useState(null);
  const [isLoadinng, setLoading] = useState(false);
  const [CategoryData, setCategoryData] = useState({});

  const history = useHistory();

  function handleClick() {
    history.push("/");
  }

  useEffect(() => {
    fetchJokeContent(props.computedMatch.params.categoryId);
    // eslint-disable-next-line
  }, []);

  const fetchJokeContent = (category) => {
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
        <button className="back-button" type="button" onClick={handleClick}>
          <img src={backArrow} width="25" height="25" alt="arrow" />
        </button>
        {/* Fetching jokes begins here */}
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
            {/* button to fetch random jokes */}
            <div className="">
              <Button
                title="Randomize"
                handleClick={() => {
                  fetchJokeContent(props.computedMatch.params.categoryId);
                }}
              />
            </div>
          </div>
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default Category;
