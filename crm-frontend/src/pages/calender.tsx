import FormCalender from '@/components/form-calender'
import Menu from '@/components/menu'
import { calender } from '@/configs/calender';
import { useGetCalendersQuery } from '@/services/calender';
import React from 'react'

const Calender = () => {
  const { data: calenders, error, isLoading } = useGetCalendersQuery(calender.allCalender);

  function handleEdit(calender: any) {
    console.log(calender);
  }

  return (
    <>
      <Menu />
      <FormCalender />
      <div className="overflow-x-auto">
          <table className="table">
            <thead>
            <tr>
                    <th>title</th>
                    <th>description</th>
                    <th>type</th>
                    <th>User</th>
                    <th>Participants</th>
                    <th>Edit</th>
                  </tr>
            </thead>
            <tbody>
              {calenders?.data.map((calender: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{calender.title}</td>
                    <td>{calender.description}</td>
                    <td>{calender.calenderType}</td>
                    <td>{calender.user?.firstName} {calender.user?.lastName}</td>
                    <td>
                    {calender.participants?.map((k: any) => {
                      return (<>
                      <div>{k.name}</div>
                      </>)
                    })}
                    </td>
                    <td>
                      <button onClick={() => handleEdit(calender)}>Edit</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </>
  )
}

export default Calender