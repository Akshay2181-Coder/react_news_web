import React, { Component } from 'react';
import NewItem from "./NewItem";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from "./Spinner";

export class News extends Component {

    static  defaultProps = {
        country :'in',
        pageSize : 20,
        category :'general',
    }

    static  propTypes = {
        country :PropTypes.string,
        pageSize : PropTypes.number,
        category :PropTypes.string,
    }

    Capitalize = (str)=>{
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
        document.title = `${this.Capitalize(this.props.category)} - News`;
    }

    async componentDidMount() {
        this.props.setProgress(10);
        await this.fetchArticles(this.state.page);
    }

    fetchArticles = async (page,isPagination = false) => {
        if(isPagination === false){
            this.setState({ loading: true }); // Set loading state
        }
        const apiUrl = `https://newsapi.org/v2/everything?q=${this.props.category}&apiKey=${this.props.apikey}&page=${page}&pageSize=${this.props.pageSize}`;
        try {
            let data = await fetch(apiUrl);
            let parsedData = await data.json();
if(isPagination === true) {
    this.setState({
        articles: this.state.articles.concat(parsedData.articles),
        totalResults: parsedData.totalResults,
        page,
        loading: false
    });
}else{
    this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults,
        page,
        loading: false
    });
    this.props.setProgress(100);

}


        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
        }
    };

    fetchData = async ()=>{
        this.setState({
            page: this.state.page + 1
        });
        await this.fetchArticles(this.state.page,true);
    }

    handlePrevClick = async () => {
        if (this.state.page > 1) {
            await this.fetchArticles(this.state.page - 1);
        }
    };

    handleNextClick = async () => {
        if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
           await this.fetchArticles(this.state.page + 1);
        }
    };

    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center" style={{margin:'25px 0px'}}>News - Top {this.Capitalize(this.props.category)} Headlines</h2>

                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}>
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((article) => (
                            <div className="col-md-3" key={article.url}>
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

                {/*     <div className="container d-flex justify-content-between my-3">
                    <button
                        disabled={this.state.page <= 1}
                        className="btn btn-sm btn-dark mx-2"
                        onClick={this.handlePrevClick}>
                        &larr; Previous
                    </button>
                    <button
                        disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}
                        className="btn btn-sm btn-dark mx-2"
                        onClick={this.handleNextClick}>
                        Next &rarr;
                    </button>
                </div>*/}
            </div>
        );
    }
}

export default News;
