import Menu from '@/components/menu'
// import { AppDispatch, RootState } from '@/store'
import { getUsers } from '@/store/apps/user'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Customer = () => {
  // ** Redux **
  // const dispatch = useDispatch<AppDispatch>();

  // ** Selector **
  // const usersLoading = useSelector((state: RootState) => state.user.usersLoading)
  // const users: any[] = useSelector((state: RootState) => state.user.users)

  // useEffect(() => {
  //   dispatch(getUsers())
  // }, [dispatch])
  

  return (
    <>
      <Menu />
      {/* {usersLoading ? "Yükleniyor" : users.map((k:any) =>{
        return <><div>{k.firstName} {k.lastName} {k.email} {k.role}</div></>
      })} */}
    </>
  )
}

export default Customer