import React, { useState, useEffect } from "react";
import { MdFavoriteBorder, MdFavorite, MdComment } from "react-icons/md";
import SelectList from "./SelectList";
import "./card.css";

function TwitterPost({ postId }) {
  const [posts, setPosts] = useState(null);
  const [comments, setComments] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [users, setUsers] = useState(null);

  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showList, setShowList] = useState(false);

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
            <div className="like-div" onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? (
                <MdFavorite style={{ color: "red" }} />
              ) : (
                <MdFavoriteBorder />
              )}
            </div>

            <div className="comment-div" onClick={toggleComments} id="comment">
              <MdComment />
            </div>
          </div>

          {showComments && (
            <div className="show-comments">
              {comments.map((comment) => (
                <div key={comment.id}>
                  <div className="comments">{comment.body}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="right">
          <h1 onClick={() => setShowList(!showList)}>...</h1>
        </div>
        <div>{showList ? <SelectList liked={isLiked} /> : ""}</div>
      </div>
    )
  );
}

export default TwitterPost;
