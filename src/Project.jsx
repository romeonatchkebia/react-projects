import React from "react";
import { useState, useEffect } from "react";
import { Circles } from "react-loader-spinner";
import TwitterPost from "./TwitterPost";

const postUrl = "https://jsonplaceholder.typicode.com/postss";

function Project() {
  const [isLoading, setisLoading] = useState(true);
  const [isError, setisError] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(postUrl)
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          setisError(true);
          setisLoading(false);
          setPosts(res.status);
        }
      })
      .then((post) => {
        setPosts(post);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <h1>
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </h1>
    );
  }

  if (isError) {
    return <h1>{`error - ${posts}`}</h1>;
  }

  return (
    <div>
      {posts.map((post) => {
        return (
          <div className="body" key={post.id}>
            <TwitterPost postId={post.id} />
          </div>
        );
      })}
    </div>
  );
}

export default Project;
