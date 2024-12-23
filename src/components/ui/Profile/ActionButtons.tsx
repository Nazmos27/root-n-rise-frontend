"use client";

import { useUser } from "@/src/context/user.provider";
import { TUser } from "@/src/types";
import { useDisclosure } from "@nextui-org/modal";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@nextui-org/button";
import { FaEdit } from "react-icons/fa";
import { Tooltip } from "@nextui-org/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserSchema } from "@/src/schema";
import { useRouter } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import {
  useFollowUser,
  useUnfollowUser,
  useUpdateUserData,
} from "@/src/hooks/user.hook";
import { getFormateTime } from "@/src/utils/getFormatTime";
import RnRModal from "../../modal/RnRModal";
import RnRForm from "../../form/RnRForm";
import RnRInput from "../../form/RnRInput";

export interface IActionButtonsProps {
  userData: { user: TUser; followers: TUser[]; following: TUser[] };
}
export default function ActionButtons({ userData }: IActionButtonsProps) {
  const router = useRouter();
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenForVerify,
    onOpen: onOpenForVerify,
    onClose: onCloseForVerify,
  } = useDisclosure();

  const {
    mutate: updateUserData,
    isPending,
    isSuccess,
  } = useUpdateUserData(user?._id);

  const { mutate: followUser, isPending: followIsPending } = useFollowUser();

  const { mutate: unfollowUser, isPending: unfollowIsPending } =
    useUnfollowUser();

  const defaultValues = {
    name: {
      firstName: userData.user.name.firstName,
      middleName: userData.user.name.middleName,
      lastName: userData.user.name.lastName,
    },
    address: userData.user.address,
    bio: userData.user.bio,
    phone: userData.user.phone,
  };

  const handleOpen = () => {
    onOpen();
  };

  const handleGetPremium = () => {
    if (userData?.user.totalUpvoteGained > 0) {
      router.push("/checkout");
    } else {
      onOpenForVerify();
    }
  };

  const handleFollow = () => {
    const followData = {
      userId: user?._id,
      targetUserId: userData.user._id,
    };

    followUser(JSON.stringify(followData));
  };

  const handleUnFollow = () => {
    const followData = {
      userId: user?._id,
      targetUserId: userData.user._id,
    };

    unfollowUser(JSON.stringify(followData));
  };
  const handleSubmit = (values: FieldValues) => {
    // Send postData to the API
    updateUserData(JSON.stringify(values));
    if (!isPending && isSuccess) {
      toast.success("Cover photo updated Successfully");
    }
    onClose();
  };

  const isFollowingThisUser = userData?.followers.find(
    (follower) => follower._id === user?._id
  );

  return (
    <div className="flex gap-2 items-center">
      {user?._id === userData?.user._id && (
        <div>
          {user.role !== "admin" && userData?.user.plan === "basic" && (
            <div>
              <Button
                radius="sm"
                size="sm"
                color="primary"
                onClick={handleGetPremium}
              >
                Verify account
              </Button>
            </div>
          )}
          {userData?.user.plan === "premium" && (
            <div>
              <Tooltip
                content={` Your premium access will end 
                ${getFormateTime(userData.user.planValidity)}`}
              >
                <Button radius="sm" size="sm" color="primary">
                  Verified
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      )}

      {user?._id === userData.user._id ? (
        <div>
          {/* Modal for verify account */}
          <RnRModal
            isOpen={isOpenForVerify}
            onClose={onCloseForVerify}
            modalTitle="You are not eligible"
            footerCancelButtonText="Ok"
          >
            Sorry. Your are not eligible for verify your account. To verify your
            account you need to gain at least 1 upvote.
          </RnRModal>

          {/* Modal for update user  */}
          <RnRModal
            isOpen={isOpen}
            onClose={onClose}
            modalTitle="Update info"
            footerCancelButtonText="Cancel"
          >
            <RnRForm
              resolver={zodResolver(updateUserSchema)}
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            >
              <RnRInput required label="First Name" name="name.firstName" />
              <RnRInput label="Middle Name" name="name.middleName" />
              <RnRInput required label="Last Name" name="name.lastName" />
              <RnRInput required label="Phone" name="phone" />
              <RnRInput required label="Address" name="address" />
              <RnRInput required label="Bio" name="bio" />

              <Button
                className="mt-3"
                isDisabled={isPending}
                radius="sm"
                size="sm"
                color="primary"
                type="submit"
              >
                {isPending ? "Loading..." : "Update"}
              </Button>
            </RnRForm>
          </RnRModal>

          <Tooltip content="Edit Info">
            <button
              className="flex items-center text-gray-600 hover:text-blue-600"
              onClick={handleOpen}
            >
              <FaEdit className="text-3xl" />
            </button>
          </Tooltip>
        </div>
      ) : (
        <div className="mr-3">
          {isFollowingThisUser ? (
            <Button
              radius="sm"
              size="sm"
              color="primary"
              onClick={handleUnFollow}
              isDisabled={unfollowIsPending}
            >
              <FiPlus className="text-xl" />
              Unfollow
            </Button>
          ) : (
            <Button
              radius="sm"
              size="sm"
              color="primary"
              onClick={handleFollow}
              isDisabled={followIsPending}
            >
              <FiPlus className="text-xl" />
              Follow
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
