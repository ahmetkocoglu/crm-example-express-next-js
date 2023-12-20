import Menu from "@/components/menu";
import { AppDispatch, RootState } from "@/store";
import { getEnum } from "@/store/apps/enums";
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
  const enumsData = useSelector((state: RootState) => state.enums.data);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getEnum("/enum/task"));
    dispatch(getEnum("/enum/task-status"));
  }, [dispatch]);

  return (
    <>
      <Menu />
      <select className="text-black">
        <option>Seçiniz</option>
        {users.map((item: any) => {
          return (
            <>
              <option key={item.email}>{item.firstName}</option>
            </>
          );
        })}
      </select>
      <select className="text-black">
        <option>Seçiniz</option>
        {Object.values(enumsData.task).map((item: string) => {
          return (
            <>
              <option key={item}>{item}</option>
            </>
          );
        })}
      </select>
      <select className="text-black">
        <option>Seçiniz</option>
        {Object.values(enumsData.taskStatus).map((item: string) => {
          return (
            <>
              <option key={item}>{item}</option>
            </>
          );
        })}
      </select>
    </>
  );
};

export default NewMeeting;
