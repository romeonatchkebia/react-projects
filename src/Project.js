import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";

function Project() {
  const [posts, setPosts] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setCom] = useState([]);

  const fetchEverything = async () => {
    const [postResponse, photoResponse, userResponse, comResponse] =
      await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/photos"),
        fetch("https://jsonplaceholder.typicode.com/users"),
        fetch("https://jsonplaceholder.typicode.com/comments"),
      ]);
    const postData = await postResponse.json();
    const photoData = await photoResponse.json();
    const userData = await userResponse.json();
    const comData = await comResponse.json();
    setPosts(postData);
    setPhotos(photoData);
    setUsers(userData);
    setCom(comData);
  };

  useEffect(() => {
    fetchEverything();
  }, []);

  return (
    <div>
      {posts.map((post) => {
        const user = users.find((u) => u.id === post.userId);

        const userPhoto = photos.find((p) => p.id === post.userId);

        const postCom = comments.find((c) => c.postId === post.id);

        return (
          <Card
            key={post.id}
            title={post.title}
            photo={userPhoto.url}
            uName={user.name}
            uEmail={user.email}
            postCom={postCom}
          />
        );
      })}
    </div>
  );
}

export default Project;
