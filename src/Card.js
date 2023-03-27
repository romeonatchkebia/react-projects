import React, { useState, useEffect } from "react";
import "./card.css";

function Card({ title, uName, uEmail, idofPosts }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const [comments, setComments] = useState([]);
  const [photos, setPhotos] = useState([]);

  const firstLetter = uName.charAt(0);

  function handleLike() {
    setIsLiked(true);
  }
  function handleUnlike() {
    setIsLiked(false);
  }

  async function fetchComments() {
    const resCom = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${idofPosts}`
    );
    const dataCom = await resCom.json();
    setComments(dataCom);
  }
  async function fetchPhotos() {
    const resPhoto = await fetch(
      `https://jsonplaceholder.typicode.com/photos?id=${idofPosts}`
    );
    const dataPhoto = await resPhoto.json();
    setPhotos(dataPhoto);
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  function toggleComments() {
    if (showComments) {
      setShowComments(false);
    } else {
      fetchComments();
      setShowComments(true);
    }
  }

  return (
    <div className="container">
      <div>
        <div className="left">
          <div className="profile-photo" data-initial={firstLetter}>
            <img
              id="picture"
              src={photos.map((p) => p.url)}
              alt="profile-foto"
            ></img>
          </div>

          <div>
            <h3>{uName}</h3>
          </div>
          <div>
            <p>{uEmail}</p>
          </div>
        </div>

        <div className="posts">{title}</div>

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
  );
}

export default Card;
