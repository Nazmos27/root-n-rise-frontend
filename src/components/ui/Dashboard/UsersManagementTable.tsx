"use client";
import { TUser } from "@/src/types";
import { Chip } from "@nextui-org/chip";
import { FaAngleDoubleUp, FaEye } from "react-icons/fa";
import { GoBlocked } from "react-icons/go";
import { MdDeleteForever } from "react-icons/md";
import { FaAngleDoubleDown } from "react-icons/fa";
import { VscVmActive } from "react-icons/vsc";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteUser, useUpdateUserData } from "@/src/hooks/user.hook";
import RnRModal from "../../modal/RnRModal";

export default function UserManagementTable({ users }: { users: TUser[] }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [statusToChange, setStatusToChange] = useState("");
  const [roleToChange, setRoleToChange] = useState("");

  const {
    isOpen: isOpenForDelete,
    onOpen: onOpenForDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenForBlock,
    onOpen: onOpenForBlock,
    onClose: onCloseBlock,
  } = useDisclosure();
  const {
    isOpen: isOpenForPromote,
    onOpen: onOpenForPromote,
    onClose: onClosePromote,
  } = useDisclosure();

  // Hook
  const {
    mutate: handleUserUpdate,
    isPending: isUserUpdatePending,
    isSuccess: isUserUpdateSuccess,
  } = useUpdateUserData(selectedUser);

  const { mutate: handleDeleteUser, isPending: isDeleteUserPending } =
    useDeleteUser();

  //Delete Functions
  const handleDeleteModal = (userId: string) => {
    setSelectedUser(userId);
    onOpenForDelete();
  };
  const handleDelete = () => {
    handleDeleteUser(selectedUser);
    onCloseDelete();
  };

  // Promote Functions
  const handlePromoteModal = (userId: string, role: string) => {
    setSelectedUser(userId);
    setRoleToChange(role);
    onOpenForPromote();
  };
  const handlePromote = () => {
    const updateData = {
      role: roleToChange,
    };

    handleUserUpdate(JSON.stringify(updateData));
    if (isUserUpdateSuccess) {
      toast.success("User Role updated");
    }
    onClosePromote();
  };

  // Block user functions
  const handleBlockModal = (userId: string, status: string) => {
    setSelectedUser(userId);
    setStatusToChange(status);
    onOpenForBlock();
  };

  const handleBlock = () => {
    const updateData = {
      status: statusToChange,
    };

    handleUserUpdate(JSON.stringify(updateData));
    if (isUserUpdateSuccess) {
      toast.success("User status updated");
    }
    onCloseBlock();
  };

  return (
    <div>
      {/* Modal for delete */}
      <RnRModal
        isOpen={isOpenForDelete}
        onClose={onCloseDelete}
        modalTitle="Are you sure?"
        footerCancelButtonText="No"
        footerExtraButton={
          <Button
            color="danger"
            onClick={handleDelete}
            isDisabled={isDeleteUserPending}
          >
            Delete
          </Button>
        }
      >
        You want to delete this user? You cannot undone this.
      </RnRModal>

      {/* Modal for Promote demote */}
      <RnRModal
        isOpen={isOpenForPromote}
        onClose={onClosePromote}
        modalTitle="Are you sure?"
        footerCancelButtonText="Cancel"
        footerExtraButton={
          <Button onClick={handlePromote} isDisabled={isUserUpdatePending}>
            {roleToChange === "user" ? "Make User" : "Make Admin"}
          </Button>
        }
      >
        Are you sure? You want to make this user admin?
      </RnRModal>

      {/* Modal for Block */}
      <RnRModal
        isOpen={isOpenForBlock}
        onClose={onCloseBlock}
        modalTitle="Are you sure?"
        footerCancelButtonText="No"
        footerExtraButton={
          <Button
            color="danger"
            onClick={handleBlock}
            isDisabled={isUserUpdatePending}
          >
            {statusToChange === "blocked" ? "Block" : "Activate"}
          </Button>
        }
      >
        Are you sure? You want to block this user?
      </RnRModal>

      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>USER</TableColumn>
          <TableColumn>ROLE</TableColumn>
          <TableColumn>STATUS</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {users?.map((user: TUser) => (
            <TableRow key={user?._id}>
              <TableCell>
                <div className="flex gap-2 items-center">
                  <div>
                    <Avatar src={user.profilePhoto} size="sm" />
                  </div>
                  <div>
                    <p className="font-semibold">
                      {user?.name?.firstName} {user?.name?.middleName}{" "}
                      {user?.name?.lastName}
                    </p>
                    <p className="text-xs">{user.email}</p>
                  </div>
                </div>{" "}
              </TableCell>
              <TableCell>
                <p
                  className={`uppercase font-semibold text-xs ${user.role === "admin" ? "text-red-500" : "text-blue-600"}`}
                >
                  {user.role}
                </p>
              </TableCell>

              <TableCell>
                <Chip
                  className="capitalize"
                  color={user.status === "active" ? "success" : "danger"}
                  size="sm"
                  variant="flat"
                >
                  {user.status}
                </Chip>
              </TableCell>

              <TableCell>
                <div className="relative flex items-center gap-4">
                  <Tooltip content="Details">
                    <Link
                      href={`/profile/${user._id}`}
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      <FaEye className="text-2xl" />
                    </Link>
                  </Tooltip>
                  <Tooltip
                    content={
                      user.status === "active" ? "Block user" : "Activate user"
                    }
                  >
                    <button
                      onClick={() =>
                        handleBlockModal(
                          user._id,
                          user.status === "active" ? "blocked" : "active"
                        )
                      }
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      {user.status === "active" ? (
                        <GoBlocked className="text-red-600 text-2xl" />
                      ) : (
                        <VscVmActive className="text-green-600 text-2xl" />
                      )}
                    </button>
                  </Tooltip>
                  <Tooltip
                    content={`${user.role === "admin" ? "Make user" : "Make Admin"}`}
                  >
                    <button
                      onClick={() =>
                        handlePromoteModal(
                          user._id,
                          user.role === "admin" ? "user" : "admin"
                        )
                      }
                      className="text-lg text-default-400 cursor-pointer active:opacity-50"
                    >
                      {user.role === "admin" ? (
                        <FaAngleDoubleDown className="text-2xl" />
                      ) : (
                        <FaAngleDoubleUp className="text-2xl" />
                      )}
                    </button>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete user">
                    <button
                      onClick={() => handleDeleteModal(user._id)}
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                    >
                      <MdDeleteForever className="text-3xl" />
                    </button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
