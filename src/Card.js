import React, { useState } from "react";
import "./card.css";

function Card({ title, photo, uName, uEmail, postCom }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  function handleLike() {
    setIsLiked(true);
  }

  function handleUnlike() {
    setIsLiked(false);
  }

  async function fetchComments() {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postCom.postId}/comments`
    );
    const data = await response.json();
    setComments(data);
  }

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
          <div>
            <img id="picture" src={photo}></img>
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
          ></img>

          <img
            onClick={toggleComments}
            id="comment"
            className="icons"
            src="https://static.thenounproject.com/png/638755-200.png"
          ></img>
        </div>

        {showComments && (
          <div className="show-comments">
            {comments.map((comment) => (
              <div key={comment.id}>
                <p>{comment.body}</p>
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
