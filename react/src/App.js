// Importing modules
import React, { useState, useEffect } from "react";
import "./App.css";
import Analysis from "./Analysis";
import { accordion, Button } from "@material-tailwind/react";
import Navbar1 from "./Navbar1";
import { Input } from "@material-tailwind/react";
import { MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import useToken from "./useToken";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import label from "./images/label.jpeg";

function App() {
  // usestate for setting a javascript
  // object for storing and using data
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [data, setdata] = useState({
    keyword: "",
    sentiment_score: "",
    sentiment_score_image: "",
    wordcloud_image: "",
    most_tags: {},
    most_subreddit: {},
    subreddit_image: "",
    tags_image: "",
    words: {},
    words_image: "",
    bigrams: {},
    bigrams_image: "",
  });

  // console.log(data);

  const [sentiment_score_updated, setsentiment_score_updated] = useState([]);
  const [most_tags, setmost_tags] = useState([]);
  const [bigrams_updated, setbigrams_updated] = useState([]);
  const [most_subreddit, setmost_subreddit] = useState([]);
  const [words_updated, setwords_updated] = useState([]);
  const [accordion, setAccordian] = useState(false);

  // useEffect(() => {
  //   const data1 = Object.keys(data.sentiment_score).map(function (key) {
  //     return [String(key), data.sentiment_score[key]];
  //   });

  //   console.log(data1);
  //   setsentiment_score_updated(data1);
  // }, [data]);

  useEffect(() => {
    const data1 = data.sentiment_score;

    // console.log(data1);
    setsentiment_score_updated(data1);
  }, [data]);

  // useEffect(() => {
  //   const data2 = Object.keys(data.locs).map(function (key) {
  //     return [String(key), data.locs[key]];
  //   });

  //   console.log(data2);
  //   setlocs_updated(data2);
  // }, [data]);

  useEffect(() => {
    const data3 = Object.keys(data.most_tags).map(function (key) {
      return [String(key), data.most_tags[key]];
    });

    // console.log(data3);
    setmost_tags(data3);
  }, [data]);

  useEffect(() => {
    const data4 = Object.keys(data.most_subreddit).map(function (key) {
      return [String(key), data.most_subreddit[key]];
    });

    // console.log(data4);
    setmost_subreddit(data4);
  }, [data]);

  useEffect(() => {
    const data5 = Object.keys(data.words).map(function (key) {
      return [String(key), data.words[key]];
    });

    // console.log(data5);
    setwords_updated(data5);
  }, [data]);

  useEffect(() => {
    const data6 = Object.keys(data.bigrams).map(function (key) {
      return [String(key), data.bigrams[key]];
    });

    // console.log(data6);
    setbigrams_updated(data6);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    if (data.keyword == "") {
      toast.error("Please enter keyword");
      return;
    }
    setLoading(true);
    const response = await fetch("/plot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyword: data.keyword,
      }),
    });
    console.log("res==", response);
    const json = await response.json();
    // console.log("json " + JSON.stringify(json));
    console.log(response.ok);
    if (response.ok) {
      // const responseData = {
      //   bigrams: JSON.parse(json.bigrams),
      //   bigrams_image: json.bigrams_image,
      //   keyword: json.keyword,
      //   most_subreddit: JSON.parse(json.most_subreddit),
      //   most_tags: JSON.parse(json.most_tags),
      //   sentiment_score: json.sentiment_score,
      //   subreddit_image: json.subreddit_image,
      //   tags_image: json.tags_image,
      //   wordcloud_image: json.wordcloud_image,
      //   words: JSON.parse(json.words),
      //   words_image: json.words_image,
      // };
      console.log(json);
      setdata(json);
      setLoading(false);
    } else {
      setLoading(false);
    }
    // fetchProducts()
  };
  // console.log("dataaaaaaaaaa" + data);
  const Print = () => {
    // console.log("print");
    let printContents = document.getElementById("printablediv").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  if (token == null) return <Navigate to="/register" />;
  return (
    <>
      <MDBContainer>
        <ToastContainer />
        {/* <header><Navigationbar/></header>    */}
        <div className="flex justify-center ">
          <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
            <form onSubmit={handleSubmit}>
              <div class="form-group mb-2">
                <label
                  for="exampleInputEmail1"
                  class="form-label inline-block mb-2 text-gray-700"
                >
                  Keyword
                </label>
                <input
                  class="form-control
        block
        w-full
        px-3
      
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  type="text"
                  name="keyword"
                  // className="w-3"
                  value={data.keyword}
                  onChange={handleChange}
                />
              </div>

              <button
                // style={{ color: "white", background: "red" }}
                type="submit"
                class="
      px-6
      py-2.5
      bg-red-500
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-red-800 hover:shadow-lg
      focus:bg-red-800 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-red-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
              >
                Analyse
              </button>
            </form>
          </div>
        </div>
        {/* <h3>{data?.keyword}</h3> */}
        <br></br>
        <div class="my-3 accordion" id="accordionExample">
          <div class="accordion-item bg-white  border border-gray-200">
            <h2
              class="accordion-header mb-0"
              style={{ color: "red" }}
              id="headingOne"
            >
              <button
                onClick={() => setAccordian(!accordion)}
                class="
        
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-sm
        border-0
        
        rounded-none
        transition
        focus:outline-none
      "
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                <span>Description</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </h2>
            <div
              id="collapseOne"
              class={`accordion-collapse  ${
                accordion ? `show` : `collapse hide`
              }`}
              aria-labelledby="headigOne"
              data-bs-parent="#accorionExample"
            >
              <div class="accordion-bod py-4 px-5">
                <pre
                  style={{ zIndex: 100 }}
                >{`Description: To get analysis report about any topic on reddit:
          Enter keyword for that topic and we will fetch most recent posts containing that keyword and perform analysis report on it with following points: 
          1. Sentiment Score i.e. positive, negative or neutral.
          2. WordCloud Image
          3. Top Tags in posts with visualization
          4. Top Subreddits with visualization
          5. Most occuring words with visualization
          6. Most occuring bigrams (i.e. set of two words) with visualization 
          Go to "About" section for more!`}</pre>
              </div>
            </div>
          </div>
        </div>
        <div style={{ width: "15%" }}>
          <img src={label} />
        </div>
        {loading ? (
          <div>
            <Loader />
          </div>
        ) : (
          ""
        )}
        <div id="printablediv">
          <Analysis
            data1={data}
            words_updated1={words_updated}
            bigrams_updated1={bigrams_updated}
            most_subreddit1={most_subreddit}
            sentiment_score_updated1={sentiment_score_updated}
            most_tags1={most_tags}
          />
        </div>
        {/* <h3>{data?.sentiment_score}</h3> */}
        <div className="flex justify-center">
          <MDBBtn
            class="text-white bg-red-700 opacity-1  rounded-md px-3 py-2"
            onClick={Print}
          >
            Print Analysis
          </MDBBtn>
        </div>
      </MDBContainer>
    </>
  );
}

export default App;
