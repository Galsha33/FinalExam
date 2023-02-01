import './App.css';
import { useState } from "react";
import axios from "axios";
function App() {
  const [posts, setPosts] = useState("");
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(false);
  const getPost = () => {
    axios
      .get("http://127.0.0.1:3500/api/posts")
      .then((res) => {
        if (res.data) {
          setStatus(true);
        }
      })
      .catch((er) => {
        alert("An error was occured!");
      });
  };
  const getUserPosts = () => {
    axios
      .get(`http://127.0.0.1:3500/api/posts/${input}`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        setPosts("");
        alert(err.message);
      });
  };
  return (
    <div className='back'>

    <div className='title'>
      Final Exam 
    </div>
    
    <div className="App">
      {status ? (
        <div class="alert alert-success" role="alert">
          the posts was loaded!
        </div>) 
        : (
        <div class="d-grid gap-2">
          <button onClick={getPost} class="btn downladButton " type="button">
            download posts!
          </button>
        </div>
      )}

      <br />
      <div>
        <label for="inputBlock" class="form-label">
          Insert a User ID
        </label>
        <input onChange={(e) => setInput(e.target.value)} type="text" id="inputBlock" class="form-control" aria-describedby="passwordHelpBlock"></input>
        <div  class="form-text">Press the button to get the user Posts</div>
        <div class="d-grid gap-2">
          <button onClick={getUserPosts} class="btn downladButton" type="button">get user posts</button>
        </div>
      </div>
      <div>
        {posts ? (
          <table class="table">
            <thead>
              <tr>
                <th className="col">Post Number</th>
                <th className="col">Title</th>
                <th className="col">Body</th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post, index) => {
                  return (
                    <tr key={index}>
                      <th className="row">{index + 1}</th>
                      <td>{post.title}</td>
                      <td>{post.body}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <div className="alert" role="alert">
            The user posts will be displayed down belowe!
          </div>
        )}
      </div>
    </div>
    </div>
  );
}

export default App;