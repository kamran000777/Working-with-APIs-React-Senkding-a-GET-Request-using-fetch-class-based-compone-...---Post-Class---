import React, { useEffect, useState } from "react";

const News = () => {
  const [lang, setLang] = useState("en");
  const [articles, setArticles] = useState([]);
  const API__KEY = "b8e8db9f5abac45e8523cd77241c13da";

  useEffect(() => {
    fetch(
      `https://gnews.io/api/v4/search?q=example&token=${API__KEY}&lang=${lang}`
    )
      .then((res) => res.json())
      .then((response) => setArticles(response.articles));
  }, [lang]);
  return (
    <div>
      <h2>News-Info</h2>
      <button
        data-testid="lang-en"
        onClick={(e) => setLang(e.target.getAttribute("data-testid").slice(5))}
      >
        English
      </button>
      <button
        data-testid="lang-hi"
        onClick={(e) => setLang(e.target.getAttribute("data-testid").slice(5))}
      >
        Hindi
      </button>
      {articles.length > 0 ? (
        articles.map((item, index) => (
          <div key={index}>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </div>
        ))
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default News;
