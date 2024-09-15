import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";

import { deletePost } from "../api/posts";

export function Post({ _id, title, contents, author }) {
  const queryClient = useQueryClient();
  const deletePostMutation = useMutation({
    mutationFn: () => deletePost(_id),
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  const handleDeletePost = () => {
    deletePostMutation.mutate();
  };

  return (
    <article>
      <h3>{title}</h3>
      <div>{contents}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
      <button
        onClick={handleDeletePost}
        disabled={deletePostMutation.isPending}
      >
        delete
      </button>
    </article>
  );
}

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string,
  author: PropTypes.string,
};
