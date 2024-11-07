"use client";

import { TComment } from "@/src/types";
import { getTimeFromNow } from "@/src/utils/getTimeFromNow";
import Link from "next/link";
import GBForm from "../../form/RnRForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentSchema } from "@/src/schema";
import { IoIosSend } from "react-icons/io";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { useUpdateComment } from "@/src/hooks/post.hook";
import { Tooltip } from "@nextui-org/tooltip";
import { VerifyBadgeIcon } from "../../icons";
import RnRForm from "../../form/RnRForm";
import RnRTextArea from "../../form/RnRTextArea";
import CommentActionButtons from "./CommentActionButtons";

export interface IDisplayCommentsProps {
  comment: TComment;
}
export default function DisplayComments({ comment }: IDisplayCommentsProps) {
  const [commentFocus, setCommentFocus] = useState(false);
  const { mutate: handleUpdateComment, isPending: isUpdatePending } =
    useUpdateComment(comment?._id);

  const handleCommentPost = (value: FieldValues) => {
    const commentData = {
      comment: value.comment,
    };

    handleUpdateComment(JSON.stringify(commentData));
    setCommentFocus(false);
  };

  return (
    <div key={comment._id} className="flex items-start space-x-3">
      {/* User Avatar */}
      <Link href={`/profile/${comment.user?._id}`}>
        <img
          src={comment.user.profilePhoto}
          alt={`${comment.user?.name?.firstName} ${comment.user?.name?.middleName} ${comment.user?.name?.lastName}`}
          className="w-10 h-10 rounded-full"
        />
      </Link>
      {/* Comment Content */}
      <div className="flex flex-col rounded-xl relative w-full max-w-[600px]">
        <div className="">
          <div className="flex gap-2 items-center justify-start">
            <Link href={`/profile/${comment.user?._id}`}>
              <h4 className="text-lg font-semibold cursor-pointer">
                {`${comment.user?.name.firstName} ${comment.user?.name?.middleName} ${comment.user?.name.lastName}`}
              </h4>
            </Link>
            {comment.user?.plan === "premium" && (
              <span>
                <Tooltip content="Verified premium user">
                  <button>
                    <VerifyBadgeIcon size={18} />
                  </button>
                </Tooltip>
              </span>
            )}
          </div>

          <div>
            {/* Update comment field */}
            {commentFocus ? (
              <div className="my-2 relative w-full">
                <RnRForm
                  onSubmit={handleCommentPost}
                  resolver={zodResolver(CommentSchema)}
                  defaultValues={comment}
                >
                  <RnRTextArea name="comment" label="" />

                  <button
                    type="submit"
                    className="absolute right-2 bottom-7 z-20"
                    disabled={isUpdatePending}
                  >
                    <IoIosSend
                      className={`${isUpdatePending ? "text-gray-500" : "text-blue-500"} text-2xl`}
                    />
                  </button>
                </RnRForm>
                <button
                  className="text-xs text-rose-500"
                  onClick={() => setCommentFocus(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p className="text-sm mt-2">{comment.comment}</p>
            )}
          </div>
        </div>
        {/* Comment actions */}
        <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
          <span className="mr-2">{getTimeFromNow(comment.createdAt)}</span>

          <button className="hover:underline">
            Like ({comment.upVoters.length})
          </button>

          <button className="hover:underline">
            Dislike ({comment.downVoters.length})
          </button>
        </div>
      </div>
      {/* Extra options (e.g., ellipsis) */}
      <CommentActionButtons
        comment={comment}
        setCommentFocus={setCommentFocus}
      />
    </div>
  );
}