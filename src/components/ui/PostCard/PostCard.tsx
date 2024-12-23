"use client";

import { TPost } from "@/src/types";
import { useRouter } from "next/navigation";
import PostCardContent from "./PostCardContent";
import PostCardButtons from "./PostCardButtons";

export interface IPostCardProps {
  postData: TPost;
}
export default function PostCard({ postData }: IPostCardProps) {
  const router = useRouter();

  const handleComment = () => {
    router.push(`/post/${postData._id}`);
  };

  return (
    <div
      className="shadow-lg shadow-blue-700/30 rounded-lg overflow-hidden mb-6 px-8 py-8 "
      id={postData._id}
    >
      <PostCardContent postData={postData} />

      {/* Post Footer with Interactions */}
      <PostCardButtons post={postData} commentHandler={handleComment} />
    </div>
  );
}
