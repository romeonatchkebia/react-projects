import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

function Project() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchEverything = async () => {
    const [postResponse, userResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts"),
      fetch("https://jsonplaceholder.typicode.com/users"),
    ]);

    const postData = await postResponse.json();
    const userData = await userResponse.json();

    setPosts(postData);
    setUsers(userData);
  };

  useEffect(() => {
    fetchEverything();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);

        return (
          <Card
            key={post.id}
            idofPosts={post.id}
            title={post.title}
            uName={user.name}
            uEmail={user.email}
          />
        );
      })}
    </div>
  );
}

export default Project;
