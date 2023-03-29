import React from "react";
import { useState, useEffect } from "react";
import TwitterPost from "./TwitterPost";

function Project() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const postData = await postResponse.json();
    setPosts(postData);
  };
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        return (
          <div className="body">
            <TwitterPost key={post.id} postId={post.id} />;
          </div>
        );
      })}
    </div>
  );
}

export default Project;
