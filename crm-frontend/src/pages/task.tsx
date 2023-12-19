import Menu from "@/components/menu";
import { AppDispatch, RootState } from "@/store";
import { getUsers } from "@/store/apps/user";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const NewMeeting = () => {
  // ** Redux **
  const dispatch = useDispatch<AppDispatch>();

  // ** Selector **
  const usersLoading = useSelector(
    (state: RootState) => state.user.usersLoading
  );
  const users: any[] = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    if (!usersLoading) dispatch(getUsers());
  }, [dispatch, usersLoading]);

  return (
    <>
      <Menu />
    </>
  );
};

export default NewMeeting;
