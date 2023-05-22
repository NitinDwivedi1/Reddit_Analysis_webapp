import { Navigate } from "react-router-dom";
import React, { useState } from "react";
import Bigrams from "./images/bigrams.png";
// import Tags from "./images/tags.png";
import keyword from "./images/keyword.png";
import subreddit from "./images/subreddits.png";
import WordCloud from "./images/wordcloud.png";
import words from "./images/words.png";
import sentiment_score from "./images/sentiment_score.png";

export default function About() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [images, setImages] = useState([
    keyword,
    sentiment_score,
    words,
    Bigrams,
    WordCloud,
    subreddit,
    // tags,
  ]);

  if (token == null) return <Navigate to="/register" replace />;
  return (
    <>
      <div className="container h-50 mx-9">
        <div class="p-6 mx-6 shadow-lg rounded-lg bg-gray-100 text-gray-700">
          <h2 class="font-semibold text-3xl mb-5">About Reddit Analysis!</h2>

          <pre>{`
        REDDIT ANALYSIS analyzes any hot topic trending on reddit to get insights of it!
        To get analysis report about any topic on reddit:
        Enter keyword for that topic and we will fetch most recent posts containing that keyword and perform analysis report on it with following points: 
        1. Sentiment Score i.e. positive, negative or neutral.
            2. WordCloud Image
            3. Most common Tags on posts  with visualization
            4. Most common subreddits under which topics containing this keyword have been discussed with visualization
            5. Most occuring words with visualization
            6. Most occuring bigrams (i.e. set of two words) with visualization `}</pre>
          {images.map((item) => (
            <div>
              <img src={item} />
            </div>
          ))}
        </div>
        <br />
        <br />
      </div>
    </>
  );
}
