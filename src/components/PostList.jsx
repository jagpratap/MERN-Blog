import React from "react";
import PropTypes from "prop-types";

import { Post } from "./Post";

export function PostList({ posts = [] }) {
  return (
    <div>
      {posts.map((post) => (
        <React.Fragment key={post._id}>
          <Post {...post} />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape(Post.propTypes)).isRequired,
};
