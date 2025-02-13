import React, { useState, useEffect, useCallback, useMemo } from 'react';
import NewItem from "./NewItem";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from "./Spinner";

const News = ({ country = 'in', pageSize = 20, category = 'general', setProgress, apikey }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);

    const capitalize = useCallback((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }, []);

    useEffect(() => {
        document.title = `${capitalize(category)} - News`;
    }, [category, capitalize]);

    const fetchArticles = useCallback(async (currentPage, isPagination = false) => {
        if (!isPagination) {
            setLoading(true);
            setProgress(10);
        }

        try {
            const apiUrl = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apikey}&page=${currentPage}&pageSize=${pageSize}`;
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.status === 'error') {
                throw new Error(data.message || 'Failed to fetch news');
            }

            if (isPagination) {
                setArticles(prev => [...prev, ...data.articles]);
            } else {
                setArticles(data.articles || []);
            }

            setTotalResults(data.totalResults);
            setError(null);

            if (!isPagination) {
                setProgress(100);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [category, apikey, pageSize, setProgress]);

    useEffect(() => {
        fetchArticles(1);
    }, [fetchArticles]);

    const fetchMoreData = useCallback(() => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchArticles(nextPage, true);
    }, [page, fetchArticles]);

    const hasMore = useMemo(() => {
        return articles.length < totalResults;
    }, [articles.length, totalResults]);

    if (error) {
        return (
            <div className="container text-center my-5">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="container my-3">
            <h2 className="text-center" style={{ margin: '25px 0px', marginTop: "90px" }}>
                News - Top {capitalize(category)} Headlines
            </h2>

            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner />}
                endMessage={
                    <p className="text-center my-4">
                        <b>You have seen all the news!</b>
                    </p>
                }
            >
                <div className="container">
                    <div className="row">
                        {articles.map((article, index) => (
                            <div className="col-md-3" key={`${article.url}-${index}`}>
                                <NewItem
                                    title={article.title}
                                    description={article.description}
                                    image={article.urlToImage}
                                    newsUrl={article.url}
                                    publishedAt={article.publishedAt}
                                    author={article.author}
                                    source={article.source.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
    );
};

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
    apikey: PropTypes.string.isRequired
};

export default React.memo(News);
