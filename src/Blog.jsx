import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getPosts } from "./api/posts";

import { CreatePost } from "./components/CreatePost";
import { PostFilter } from "./components/PostFilter";
import { PostList } from "./components/PostList";
import { PostSorting } from "./components/PostSorting";

export function Blog() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");

  const postQuery = useQuery({
    queryKey: ["posts", { author, sortBy, sortOrder }],
    queryFn: () => getPosts({ author, sortBy, sortOrder }),
  });

  const posts = postQuery.data ?? [];

  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter
        field="author"
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <PostSorting
        fields={["createdAt", "updatedAt"]}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <PostList posts={posts} />
    </div>
  );
}
