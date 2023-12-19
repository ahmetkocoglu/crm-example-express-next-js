import Menu from "@/components/menu";
import { AppDispatch, RootState } from "@/store";
import { getUsers } from "@/store/apps/user";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Customer = () => {
  // redux hooks
  const dispatch = useDispatch<AppDispatch>();

  // Selectors
  const usersLoading = useSelector(
    (state: RootState) => state.user.usersLoading
  );
  const users: any[] = useSelector((state: RootState) => state.user.users); //initialstate e gidecek oradan users alacak.

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Menu />
      {usersLoading ? <p>Loading...</p> : "loaded"}
      {users.map((k: any) => {
        return (
          <>
            {k.firstName} {k.email} {k.role}
          </>
        );
      })}
    </>
  );
};

export default Customer;
