import React, { Component } from "react";
import Results from "../components/Results/Results.jsx"
import API from "../utils/API"
import "./styles.css"



class Main extends Component {

    state = {
        articleData: [],
        mobileArticleData: []
    }

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = tag => {
        if (!tag) {
            API.getArticles()
                .then(res => {
                    const dataToBeMapped = [];
                    const mobileDataToBeMapped = [];
                    for (let i = 0; i < res.data.length; i += 2) {
                        let tempObject = { left: res.data[i], right: res.data[i + 1], key: i };
                        dataToBeMapped.push(tempObject);
                    }
                    for (let i = 0; i < res.data.length; i++) {
                        mobileDataToBeMapped.push(res.data[i]);
                    }
                    this.setState({ articleData: dataToBeMapped, mobileArticleData: mobileDataToBeMapped });
                })
                .catch(err => console.log(err))
        } else {
            API.getFilteredArticles(tag)
            .then(res => {
                const dataToBeMapped = [];
                const mobileDataToBeMapped = [];

                for (let i = 0; i < res.data.length; i += 2) {
                    let tempObject = { left: res.data[i], right: res.data[i + 1], key: i };
                    dataToBeMapped.push(tempObject);
                }
                for (let i = 0; i < res.data.length; i++) {
                    mobileDataToBeMapped.push(res.data[i]);
                }
                this.setState({ articleData: dataToBeMapped, mobileArticleData: mobileDataToBeMapped });

            }).catch(err => console.log(err))
        };
    };

    componentDidUpdate(prevProps){
        if (prevProps.category !== this.props.category) {
        this.loadArticles(this.props.category)
        }
    };

    render() {
        return (
            
            <Results username={this.props.username} articleData={this.state.articleData} mobileArticleData={this.state.mobileArticleData} key={this.props.category} />
        );
    }
};

export default Main;