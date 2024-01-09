import Menu from "@/components/menu";
import { useGetUsersQuery } from "@/services/user";
// import { AppDispatch, RootState } from '@/store'
import { getUsers } from "@/store/apps/user";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Customer = () => {
  const { data, error, isLoading } = useGetUsersQuery("/users");

  return (
    <>
      <Menu />
      <div>Müşteriler Sayfası</div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Adı</th>
              <th>Soyadı</th>
              <th>E-Posta</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
          {isLoading
        ? "Yükleniyor"
        : data.data?.map((k: any) => {
            return (
              <>
              <tr>
                <td></td>
                <td>
                  {k.firstName}
                </td>
                <td>
                  {k.lastName}
                </td>
                <td>
                  {k.email}
                </td>
                <td>
                  {k.role}
                </td>
              </tr>
              </>
            );
          })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Customer;
