import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    async function getArticles() {
      const request = await fetch('https://api.spaceflightnewsapi.net/v3/articles');
      const response = await request.json();

      setArticles(response);
      setLoading(false);
    }

    getArticles();
  }, []);

  return (
    <>
      <Helmet>
        <title>Space News Articles</title>
        <meta name="Space News Articles" content="Articles from Space News Api" />
      </Helmet>

      <section className="articles p-2 min-[320px]:p-4 md:px-0 md:py-0 md:grid md:grid-cols-2 w-full max-h-screen md:h-screen bg-[url('./assets/background.jpg')] bg-cover bg-center bg-no-repeat bg-fixed box-border items-center">
        <div className="tittle py-2 mb-3 min-[360px]:mb-4 text-center">
          <h1 className="text-4xl min-[320px]:text-7xl min-[360px]:text-8xl min-[400px]:text-[7rem] xl:text-9xl text-[#fbd236]">SPACE NEWS</h1>
        </div>


        {loading ? (
          <section className="loading grid items-center h-screen">
            <div className="container-loading-content py-2 mb-3 min-[360px]:mb-4 text-center">
              <h1 className="text-4xl min-[320px]:text-7xl min-[360px]:text-8xl min-[400px]:text-[7rem] xl:text-9xl text-[#fbd236] mb-4">LOADING...</h1>
            </div>
          </section>
        ) : (
          <div className="container-content py-2 md:overflow-scroll md:px-5 md:scrollbar-thin md:scrollbar-thumb-[#fbd236]  md:scrollbar-thumb-rounded md:h-screen">
            {articles.map(function (article) {
              return <article key={article.id} className="article-content my-3 min-[320px]:my-4 bg-[#068076] p-4 rounded-xl">
                <h2 className="text-xl min-[320px]:text-2xl min-[360px]:text-3xl min-[400px]:text-4xl font-semibold text-[#fbd236]">
                  <Link to={`/${article.id}`}>{article.title}</Link></h2>
                <time className="text-xl min-[320px]:text-2xl min-[360px]:text-3xl min-[400px]:text-4xl font-semibold text-[#fbd236]">{new Date(article.publishedAt).toLocaleDateString()}</time>
              </article>
            })}
          </div>
        )}
      </section>
    </>
  );
}