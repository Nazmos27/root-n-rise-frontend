"use client";

import { TPost } from "@/src/types";
import PostCardButtons from "../PostCard/PostCardButtons";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@nextui-org/modal";
import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import GBForm from "../../form/RnRForm";
import { FieldValues } from "react-hook-form";
import GBInput from "../../form/RnRInput";
import { IoIosSend } from "react-icons/io";
import { CommentSchema } from "@/src/schema";
import { useCreateCommentOnPost } from "@/src/hooks/post.hook";
import { toast } from "sonner";
import RnRModal from "../../modal/RnRModal";

export interface IPostDetailsCardProps {
  postData: TPost;
}
export default function PostDetailsCard({ postData }: IPostDetailsCardProps) {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentFocus, setCommentFocus] = useState(false);
  const {
    mutate: handleCommentOnPost,
    isPending: isCommentOnPostPending,
    isSuccess: isCommentOnPostSuccess,
    isError,
  } = useCreateCommentOnPost();

  const handleModalOpen = () => {
    onOpen();
  };
  const handleRedirect = () => {
    router.push("/login");
  };

  const handleComment = () => {
    if (user) {
      setCommentFocus(true);
    } else {
      handleModalOpen();
    }
  };
  const handleCommentPost = (value: FieldValues) => {
    const commentData = {
      user: user?._id,
      post: postData._id,
      comment: value.comment,
    };

    handleCommentOnPost(JSON.stringify(commentData));
    if (isCommentOnPostSuccess) {
      toast.success("Comment added");
      setCommentFocus(false);
    }
    if (isError) {
      toast.error("Failed to add comment");
    }
  };

  return (
    <div>
      <RnRModal
        isOpen={isOpen}
        onClose={onClose}
        modalTitle="Need to sign in"
        footerCancelButtonText="Not now"
        footerExtraButton={
          <Button color="primary" onClick={handleRedirect}>
            Sign in
          </Button>
        }
      >
        To interact with post you need to sign in first
      </RnRModal>

      {/* Post Footer with Interactions */}
      <PostCardButtons post={postData} commentHandler={handleComment} />
      {commentFocus && (
        <div className="mb-10 relative">
          <GBForm
            onSubmit={handleCommentPost}
            resolver={zodResolver(CommentSchema)}
          >
            <GBInput label="" name="comment" />
            <button
              type="submit"
              className="absolute right-2 top-1"
              disabled={isCommentOnPostPending}
            >
              <IoIosSend
                className={`${isCommentOnPostPending ? "text-gray-500" : "text-blue-500"} text-2xl`}
              />
            </button>
          </GBForm>
        </div>
      )}
    </div>
  );
}
