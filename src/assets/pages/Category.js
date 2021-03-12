import React, { useState, useEffect } from "react";
import JokeContent from "../components/jokeContent";
import Button from "../components/Button";
import ErrorBoundary from "../components/errorBoundary";

function Category(props) {
  const [isLoadinng, setLoading] = useState(true);
  const [CategoryData, setCategoryData] = useState({});

  useEffect(() => {
    firstLoad(props.computedMatch.params.categoryId);
    // eslint-disable-next-line
  }, []);

  const firstLoad = (category) => {
    setLoading(false);

    fetch(
      "https://v2.jokeapi.dev/joke/" +
        category +
        "?blacklistFlags=nsfw,religious,racist,sexist"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCategoryData(data);
        setLoading(true);
      });
  };

  return (
    <div>
      {/* {JSON.stringify(CategoryData)}  */}
      <ErrorBoundary>
        <p>{CategoryData.type}</p>
        <p>
            { CategoryData.type === "single"
            ? CategoryData.joke
            : CategoryData.setup }
        </p>
        <p>{CategoryData.type === "twopart" && CategoryData.delivery}</p>

        {/* {CategoryData.type === 'single' &&(
            <JokeContent
                type={CategoryData.type}
                joke={CategoryData.joke}
            />
        )}

        {CategoryData.type === 'twopart' &&(
            <JokeContent
                type={CategoryData.type}
                setup={CategoryData.setup}
                delivery={CategoryData.delivery}
            />
        )} */}

        <div className="w-25">
          <Button
            title="Randomize"
            handleClick={() => {
              firstLoad(props.computedMatch.params.categoryId);
            }}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
}

export default Category;
