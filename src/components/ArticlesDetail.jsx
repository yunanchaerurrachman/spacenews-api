import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function ArticlesDetail() {
  const params = useParams();
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(function () {
    async function getArticle() {
      const request = await fetch(
        `https://api.spaceflightnewsapi.net/v3/articles/${params.id}`
      );

      if (!request.ok) {
        setLoading(false);
        return setNotFound(true);
      }

      const response = await request.json();
      setArticle(response);
      setLoading(false);
    }
    getArticle();
  }, [params]);

  if (notFound) {
    return <section className="not-found p-2 min-[320px]:p-4 md:px-0 md:py-0 grid content-center w-full md:h-screen min-h-screen bg-[url('./assets/background.jpg')] bg-cover bg-center bg-no-repeat bg-fixed box-border">
      <Helmet>
        <title>Article Not Found!!!</title>
        <meta name="Article Not Found!!!" content="Article Not Found!!!" />
      </Helmet>

      <div className="container-not-found-content py-2 mb-3 min-[360px]:mb-4 text-center">
        <h1 className="text-4xl min-[320px]:text-7xl min-[360px]:text-8xl min-[400px]:text-[7rem] xl:text-9xl text-[#fbd236] mb-4">ARTICLE NOT FOUND!!!</h1>
        <div className="btn-home bg-[#068076] p-4 rounded-xl w-1/2 m-auto">
          <p className="text-xl min-[320px]:text-2xl min-[360px]:text-3xl min-[400px]:text-4xl font-semibold text-[#fbd236] text-center">
            <Link to={`/spacenews`}>Home</Link>
          </p>
        </div>
      </div>
    </section>
  }

  return (
    <>
      <Helmet>
        <title>{article.title}</title>
        <meta name={article.title} content={article.summary} />
      </Helmet>

      <section className="article-detail p-2 min-[320px]:p-4 md:px-0 md:py-0 w-full bg-[url('./assets/background.jpg')] bg-cover bg-center bg-no-repeat bg-fixed box-border md:h-screen min-h-screen">
        {loading ? (
          <section className="loading grid items-center h-screen">
            <div className="container-loading-content py-2 mb-3 min-[360px]:mb-4 text-center">
              <h1 className="text-4xl min-[320px]:text-7xl min-[360px]:text-8xl min-[400px]:text-[7rem] xl:text-9xl text-[#fbd236] mb-4">LOADING...</h1>
            </div>
          </section>
        ) : (
          <article className="md:grid md:grid-cols-2 items-center">
            <div className="container-article-img py-2 mb-2 md:px-5">
              <div className="article-img bg-[#fbd236] p-1 min-[320px]:p-2 rounded-xl overflow-hidden group">
                <img src={article.imageUrl} alt={article.title} className="rounded-xl  group-hover:scale-150 group-hover:rotate-12 transition-all duration-500" />
              </div>
            </div>

            <div className="container-article-content py-2 md:overflow-scroll md:py-10 md:px-5 md:scrollbar-thin md:scrollbar-thumb-[#fbd236]  md:scrollbar-thumb-rounded md:h-screen">
              <div className="article-content mb-3 min-[320px]:mb-4 bg-[#068076] p-4 rounded-xl">
                <h1 className="text-xl min-[320px]:text-5xl min-[360px]:text-6xl font-semibold text-[#fbd236]">{article.title}</h1>
                <time className="text-xl min-[320px]:text-2xl min-[360px]:text-3xl min-[400px]:text-4xl font-semibold text-[#fbd236]">{new Date(article.publishedAt).toLocaleDateString()}</time>
                <p className="text-xl min-[320px]:text-2xl min-[360px]:text-3xl min-[400px]:text-4xl font-semibold text-[#fbd236] my-4 min-[320px]:my-5">{article.summary}</p>
                <p className="text-xl min-[320px]:text-2xl min-[360px]:text-3xl min-[400px]:text-4xl font-semibold text-[#fbd236]">Source: <a href={article.url} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:underline-offset-0">{article.newsSite}</a>
                </p>
              </div>

              <div className="btn-home bg-[#068076] p-4 rounded-xl">
                <p className="text-xl min-[320px]:text-2xl min-[360px]:text-3xl min-[400px]:text-4xl font-semibold text-[#fbd236] text-center">
                  <Link to={`/spacenews/`}>Home</Link>
                </p>
              </div>
            </div>
          </article>
        )}
      </section>
    </>
  )
}