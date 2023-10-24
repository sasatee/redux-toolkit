import { useState } from "react";

import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";


const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setuserId] = useState("");

  const users = useSelector(selectAllUsers)
  const dispatch = useDispatch();

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setuserId(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded(title, content,userId)
        );
      setTitle("")
      setContent('')
    }
  };

  const userOptions = users.map(user =>(
    <option key={user.id} value={user.id}>
        {user.name}
    </option>
  ));

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  return (
    <section>
      <h2>Add New Posts</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
          <label htmlFor="postAuthor">Author:</label>
       <select id ="postAuthor" value={userId} onChange={onAuthorChanged}>
        {userOptions}
       </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          type="postContent"
          id="postContent"
          name="postTitle"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked}
        disabled={!canSave}
        >
          Save posts
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
