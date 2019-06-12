import React, { Component } from "react";
import Card from "../Articles/Card.jsx";
import { Grid, GridColumn } from "semantic-ui-react";
import { AutoSizer, List } from "react-virtualized";
import "./Results.css";

class Results extends Component {

  state = {
    width: null
  }

  componentDidMount() {
    this.setState({ width: window.innerWidth });
  }

  resizeHandler = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const dataObject = this.props;
    const dataArray = dataObject.articleData;
    const mobileDataArray = dataObject.mobileArticleData;
    console.log(dataObject);
    window.addEventListener("resize", this.resizeHandler)
    return (
      <AutoSizer style={{ height: "87.9vh"}}>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={dataArray.length}
            rowHeight={200}
            overscanRowCount={10}
            rowRenderer={({ index, key, style }) => {
              const data = dataArray[index];
              const mobileData = mobileDataArray[index];
              let left = data.left;
              let right = data.right;
              if (window.innerWidth > 1100) {
                if (data.right) {
                  return (
                    <>
                    <div style={{ marginTop: 15}}></div>
                    <Grid id="grid" style={style} key={data.key}>
                      <Grid.Row>
                        <GridColumn width={1} />
                        <Grid.Column width={7}>
                          <Card
                            tags={left.meta_tags}
                            imgUrl={
                              left.image_url ||
                              "https://images-na.ssl-images-amazon.com/images/I/71Y7JseBYYL._SX466_.jpg"
                            }
                            headline={left.headline}
                            body={left.body}
                            upvote={left.upvote}
                            downvote={left.downvote}
                            id={left._id}
                          />
                        </Grid.Column>
                        <Grid.Column width={7}>
                          <Card
                            tags={right.meta_tags}
                            imgUrl={
                              right.image_url ||
                              "https://images-na.ssl-images-amazon.com/images/I/71Y7JseBYYL._SX466_.jpg"
                            }
                            headline={right.headline}
                            body={right.body}
                            upvote={right.upvote}
                            downvote={right.downvote}
                            id={right._id}
                          />
                        </Grid.Column>
                        <GridColumn width={1} />
                      </Grid.Row>
                    </Grid>
                            </>
                  );
                } else {
                  return (
                    <Grid style={style} key={data.key}>
                      <Grid.Row>
                        <GridColumn width={1} />
                        <Grid.Column width={7}>
                          <Card
                            tags={left.meta_tags}
                            imgUrl={left.image_url}
                            headline={left.headline}
                            upvote={left.upvote}
                            downvote={left.downvote}
                            id={left._id}
                          />
                        </Grid.Column>
                        <GridColumn width={1} />
                      </Grid.Row>
                    </Grid>
                  );
                }
              } else {
                return (
                  <Grid id="grid" style={style} key={data.key}>
                    <Grid.Row>
                      <GridColumn width={2} />
                      <Grid.Column width={12}>
                        <Card
                          tags={mobileData.meta_tags}
                          imgUrl={
                            mobileData.image_url ||
                            "https://images-na.ssl-images-amazon.com/images/I/71Y7JseBYYL._SX466_.jpg"
                          }
                          headline={mobileData.headline}
                          body={mobileData.body}
                          upvote={mobileData.upvote}
                          downvote={mobileData.downvote}
                          id={mobileData._id}
                        />
                      </Grid.Column>
                      {/* <Grid.Column width={7}>
                        <Card
                          tags={right.meta_tags}
                          imgUrl={
                            right.image_url ||
                            "https://images-na.ssl-images-amazon.com/images/I/71Y7JseBYYL._SX466_.jpg"
                          }
                          headline={right.headline}
                          body={right.body}
                          upvote={right.upvote}
                          downvote={right.downvote}
                          id={right._id}
                        />
                      </Grid.Column> */}
                      <GridColumn width={2} />
                    </Grid.Row>
                  </Grid>
                );


                
              }
            }}
            width={width}
          />
        )}
      </AutoSizer>

    );
  }
}

export default Results;
