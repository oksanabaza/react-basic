// import React from 'react';

// const Main = () => {
//   const [posts, setPosts] = React.useState([]);
//   React.useEffect(() => { fetchPosts() }, [])

//   const fetchPosts = async () => {
//     try {
//       const response = await fetch('https://www.reddit.com/r/reactjs.json?limit=100');
//       const posts = await response.json();
//       console.log(posts.data.children)
//       setPosts(posts.data.children)
//     }
//     catch (error) {
//       console.warn(error);
//     }
//   };
//   return (
//     <div>
//       <h1>Top commented</h1>
//       {posts.map(item => (
//         <div key={item.data.id} style={{ border: "1px solid black", marginBottom: "10px", padding: "15px" }}>
//           {item.data.thumbnail !== "self" && <img src={item.data.thumbnail} alt="" />}
//           <p>{item.data.title}</p>
//           <p>Number of comments: {item.data.num_comments}</p>
//           <a href={`https://www.reddit.com/${item.data.permalink}`} target="_blank" rel="noopener noreferrer">link</a>
//         </div>
//       ))}
//     </div>

//   )
// }

// export default Main;




import React from "react";
import { Item } from './item';

export class Main extends React.Component {

  constructor() {
    super();

    this.state = {
      items: [],
      isLoading: false,
      enableAutoRefresh: false,
      minComments: 0
    };
  }
  componentDidMount() {
    this.getItems();
  }

  getItems = () => {
    this.setState({ isLoading: true });
    fetch("https://www.reddit.com/r/reactjs.json?limit=100")
      .then(response => { return response.json(); })
      .then(({ data }) => {
        this.setState({ items: data.children, isLoading: false });
      });
  };


  updateAutoRefresh = () => {
    if (this.state.enableAutoRefresh) {
      this.setState({ enableAutoRefresh: false });
      clearInterval(this.autoRefresh);
    } else {
      this.setState({ enableAutoRefresh: true });
      this.autoRefresh = setInterval(this.getItems, 3000);
    }
  };

  updateMinComments = event => {
    this.setState({
      minComments: Number(event.target.value)
    })
  }

  render() {
    const { items, isLoading, enableAutoRefresh, minComments } = this.state;
    const sortItemsByComments = items.sort(
      (a, b) => b.data.num_comments - a.data.num_comments).filter(item => item.data.num_comments >= minComments);
    return (
      <div>
        <h1>Top commented</h1>
        <p>Current filter: {minComments}</p>
        <div>
          <button type="button" style={{ marginBottom: "15px" }} onClick={this.updateAutoRefresh} >{enableAutoRefresh ? "Stop" : "Start"} auto-refresh</button>
        </div>

        <input type="range" value={minComments}
          onChange={this.updateMinComments}
          min={0} max={500} style={{ width: "100%" }} />
        {isLoading ? (
          <p>...Loading</p>
        ) : (
            sortItemsByComments.length > 0 ? (sortItemsByComments.map(item =>
              <Item key={item.data.id} data={item.data} />
            )) : <p>No results found matching your criteria</p>
          )}
      </div>

    )
  }
}

export default Main;