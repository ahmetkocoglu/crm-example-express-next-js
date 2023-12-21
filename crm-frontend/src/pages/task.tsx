import Menu from "@/components/menu";
import { AppDispatch, RootState } from "@/store";
import { getEnum } from "@/store/apps/enums";
import { getUsers } from "@/store/apps/user";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@/components/input";
import Select from "react-select";
import { getTask, setNewTask } from "@/store/apps/tasks";

type FormValues = {
  type?: any;
  title: string;
  description: string;
  status?: any;
  user?: any;
  responsible?: any;
};

const formSchema = yup.object().shape({
  // type: yup.object({
  //   id: yup.number().required('giriniz')
  // }),
  title: yup.string().trim().required("giriniz"),
  description: yup.string().trim().required("giriniz"),
  // status: yup.object({
  //   id: yup.number().required('giriniz')
  // }),
  // user: yup.object({
  //   id: yup.number().required('giriniz')
  // }),
});

const defaultValues: FormValues = {
  type: {
    id: 0,
    name: ""
  },
  title: "",
  description: "",
  status: {
    id: 1,
    name: "appointed"
  },
  user: {
    id: "",
    name: ""
  },
  responsible: {
    id: "",
    name: ""
  }
};

const NewMeeting = () => {
  // ** Redux **
  const dispatch = useDispatch<AppDispatch>();

  // ** Selector **
  const usersLoading = useSelector(
    (state: RootState) => state.user.usersLoading
  );
  const users: any[] = useSelector((state: RootState) => state.user.users);
  const enumsData = useSelector((state: RootState) => state.enums.data);

  const saveLoading = useSelector((state: RootState) => state.tasks.loading)
  const tasks: any[] = useSelector((state: RootState) => state.tasks.data)

  // ** State **
  const [task, setTask] = useState<any[]>([])
  const [taskStatus, setTaskStatus] = useState<any[]>([])

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getEnum("/enum/task"));
    dispatch(getEnum("/enum/task-status"));
    dispatch(getTask())
  }, [dispatch]);

  useEffect(() => {
    setTask(Object.values(enumsData.task).map((item: string, index: number) => {
      return {id: index + 1, name: item}
    }))
    setTaskStatus(Object.values(enumsData.taskStatus).map((item: string, index: number) => {
      return {id: index + 1, name: item}
    }))
  }, [enumsData])
  

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (payload: FormValues) => {
    console.log(payload);
    dispatch(setNewTask({
      type: payload.type.name,
      title: payload.title,
      description: payload.description,
      status: payload.status.name,
      userId: payload.user.id,
      responsibleId: payload.responsible.id
    }))
    reset(defaultValues)
  };

  return (
    <>
      <Menu />
      <div className="container mx-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-y-2">
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Title"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("title", { required: true })}
              />
              {errors.title && <>{errors.title.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Input
                type="text"
                placeholder="Description"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("description", { required: true })}
              />
              {errors.description && <>{errors.description.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                name={"type"} 
                control={control} 
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <Select
                    className="text-black"
                      value={value}
                      onBlur={onBlur}
                      onChange={(e: any) => {
                        onChange(e);
                      }}
                      options={[...task]}
                      placeholder={"Type"}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                    />
                  );
                }}
              />
              {errors.type && <>{errors.type.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                name={"status"} 
                control={control} 
                disabled={true}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <Select
                    className="text-black"
                      value={value}
                      isDisabled={true}
                      onBlur={onBlur}
                      onChange={(e: any) => {
                        onChange(e);
                      }}
                      options={[...taskStatus]}
                      placeholder={"Task Status"}
                      getOptionLabel={(option: any) => option.name}
                      getOptionValue={(option: any) => option.id}
                    />
                  );
                }}
              />
              {errors.status && <>{errors.status.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                name={"user"} 
                control={control} 
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <Select
                    className="text-black"
                      value={value}
                      onBlur={onBlur}
                      onChange={(e: any) => {
                        onChange(e);
                      }}
                      options={[...users]}
                      placeholder={"Users"}
                      getOptionLabel={(option: any) => option.firstName + ' ' + option.lastName}
                      getOptionValue={(option: any) => option.id}
                    />
                  );
                }}
              />
              {errors.type && <>{errors.type.message}</>}
            </div>
            <div className="w-full md:w-1/2 px-1">
              <Controller
                name={"responsible"} 
                control={control} 
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <Select
                    className="text-black"
                      value={value}
                      onBlur={onBlur}
                      onChange={(e: any) => {
                        onChange(e);
                      }}
                      options={[...users]}
                      placeholder={"Responsible"}
                      getOptionLabel={(option: any) => option.firstName + ' ' + option.lastName}
                      getOptionValue={(option: any) => option.id}
                    />
                  );
                }}
              />
              {errors.responsible && <>{errors.responsible.message}</>}
            </div>
            <div className="w-full md:w-2/2 px-1">
              {saveLoading ? <>işleminiz yapılıyor</> : <><button type="submit">Gönder</button></>}
            </div>
          </div>
        </form>
      </div>
      <table>
        <tbody>
          {tasks.map((task: any, index: number) => {
            return (<tr key={index}><td>{task.title}</td><td>{task.description}</td></tr>)
          })}
        </tbody>
      </table>

      {/* <select className="text-black">
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
      </select> */}
    </>
  );
};

export default NewMeeting;
