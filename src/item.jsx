import React, { Component } from 'react';


export class Item extends Component {
  render() {
    const { data } = this.props;
    return (
      <div key={data.id} style={{ border: "1px solid black", marginBottom: "10px", padding: "5px" }}>
        {data.thumbnail && <img src={data.thumbnail} alt="" />}

        <p>{data.title}</p>
        <p>Number of comments: {data.num_comments}</p>
        <a href={`https://www.reddit.com/${data.permalink}`} target="_blank" rel="noopener noreferrer">link</a>
      </div>)
  }
}

export default Item;