import React, { useState, useEffect } from "react";
import "./card.css";

function TwitterPost({ postId }) {
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [users, setUsers] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  function handleLike() {
    setIsLiked(true);
  }
  function handleUnlike() {
    setIsLiked(false);
  }

  function toggleComments() {
    if (showComments) {
      setShowComments(false);
    } else {
      getComment();
      setShowComments(true);
    }
  }

  const getPost = async (id) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();
    return data;
  };

  const getComment = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    const data = await res.json();
    return data;
  };

  const getPhoto = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?id=${id}`
    );
    const data = await res.json();
    return data;
  };

  const getUser = async (id) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?id=${id}`
    );
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const fetchFullPost = async (id) => {
      const newPost = await getPost(id);
      const newPhoto = await getPhoto(newPost.id);
      const newUser = await getUser(newPost.userId);
      const newComment = await getComment(newPost.id);
      setPosts(newPost);
      setUsers(newUser);
      setComments(newComment);
      setPhotos(newPhoto);
    };

    fetchFullPost(postId);
  }, []);

  const userInfo = users && users[0];

  return (
    posts &&
    users &&
    comments &&
    photos && (
      <div className="container">
        <div>
          <div className="left">
            <div className="profile-photo">
              <div className="firstLetter">
                {userInfo.name && userInfo.name.charAt(0)}
              </div>
            </div>

            <div>
              <h3>{userInfo.name && userInfo.name}</h3>
            </div>
            <div>
              <p>@{userInfo.username && userInfo.username}</p>
            </div>
          </div>

          <div className="posts">{posts.title}</div>

          <div className="post-content">
            <p className="post-text">{posts.body}</p>
            <img src={photos[0].url} alt="" className="post-img" />
          </div>

          <div className="footer">
            <img
              onClick={isLiked ? handleUnlike : handleLike}
              id="heart"
              className="icons"
              src={
                isLiked
                  ? "https://i.pinimg.com/736x/b9/3a/1b/b93a1bd3736a4a471b08c1f57606381f.jpg"
                  : "https://www.freeiconspng.com/thumbs/heart-icon/heart-outline-19.png"
              }
              alt="heart-icon"
            ></img>

            <img
              onClick={toggleComments}
              id="comment"
              className="icons"
              src="https://static.thenounproject.com/png/638755-200.png"
              alt="comment-icon"
            ></img>
          </div>

          {showComments && (
            <div className="show-comments">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <li>{comment.body}</li>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="right">
          <h1>...</h1>
        </div>
      </div>
    )
  );
}

export default TwitterPost;
