import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store";
import { useEffect, useState } from "react";
import { getUsers } from "@/store/apps/user";
import { getEnum } from "@/store/apps/enums";
import { getTasks, setNewTask, setUpdateTask } from "@/store/apps/tasks";
import { Controller, useForm } from "react-hook-form";
import Input from "@/components/input";
import Select from "react-select";

type FormValues = {
  id?: number | 0;
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
  id: 0,
  type: {
    id: 0,
    name: "",
  },
  title: "",
  description: "",
  status: {
    id: 1,
    name: "appointed",
  },
  user: {
    id: "",
    name: "",
  },
  responsible: {
    id: "",
    name: "",
  },
};

type Props = {
  data?: FormValues;
  id?: number;
};

// const FormTask: React.FC<Props> = ({data}) => {
const FormTask = ({ data, id }: Props) => {
  // ** Redux **
  // const dispatch = useDispatch<AppDispatch>();

  // ** Selector **
  // const usersLoading = useSelector(
  //   (state: RootState) => state.user.usersLoading
  // );
  // const users: any[] = useSelector((state: RootState) => state.user.users);
  // const enumsData = useSelector((state: RootState) => state.enums.data);
  // const saveLoading = useSelector((state: RootState) => state.tasks.loading);

  // ** State **
  const [task, setTask] = useState<any[]>([]);
  const [taskStatus, setTaskStatus] = useState<any[]>([]);
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    console.log("useEffect >> ", data);
    console.log("useEffect ID >> ", id);

    setValue("id", data?.id ?? 0);

    setValue("title", data?.title ?? "");
    setValue("description", data?.description ?? "");

    setValue(
      "type",
      task.find((k: any) => k.name === data?.type?.name)
    );
    setValue(
      "status",
      taskStatus.find((k: any) => k.name === data?.status?.name)
    );

    console.log(
      "Fine User >> ",
      users.find((k: any) => k.id === data?.user?.id)
    );

    setValue("user", data?.user);
    setValue("responsible", data?.responsible);
  }, [data]);

  // useEffect(() => {
  //   dispatch(getUsers());
  //   dispatch(getEnum("/enum/task"));
  //   dispatch(getEnum("/enum/task-status"));
  // }, [dispatch]);

  // useEffect(() => {
  //   setTask(
  //     Object.values(enumsData.task).map((item: string, index: number) => {
  //       return { id: index + 1, name: item };
  //     })
  //   );
  //   setTaskStatus(
  //     Object.values(enumsData.taskStatus).map((item: string, index: number) => {
  //       return { id: index + 1, name: item };
  //     })
  //   );
  // }, [enumsData]);

  const abc = () => {
    return data?.title ?? "test";
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: data,
    resolver: yupResolver(formSchema),
  });

  const onSubmit = (payload: FormValues) => {
    console.log("onSubmit >> ", payload);

    const sendPayload = {
      id: payload.id,
      type: payload.type.name,
      title: payload.title,
      description: payload.description,
      status: payload.status?.name ?? "appointed",
      userId: payload.user.id,
      responsibleId: payload.responsible.id,
    };
    // if (payload.id === 0) {
    //   dispatch(setNewTask(sendPayload));
    // } else {
    //   dispatch(setUpdateTask(sendPayload));
    // }
    reset(defaultValues);
    setIsSave(true);
  };

  // useEffect(() => {
  //   if (isSave && !saveLoading) dispatch(getTasks());
  // }, [dispatch, isSave, saveLoading]);

  return (
    <>
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
                    // options={[...users]}
                    placeholder={"Users"}
                    getOptionLabel={(option: any) =>
                      option.firstName + " " + option.lastName
                    }
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
                    // options={[...users]}
                    placeholder={"Responsible"}
                    getOptionLabel={(option: any) =>
                      option.firstName + " " + option.lastName
                    }
                    getOptionValue={(option: any) => option.id}
                  />
                );
              }}
            />
            {errors.responsible && <>{errors.responsible.message}</>}
          </div>
          <div className="w-full md:w-2/2 px-1">
            {/* {saveLoading ? (
              <>işleminiz yapılıyor</>
            ) : (
              <>
                <button type="submit">Gönder</button>
              </>
            )} */}
          </div>
        </div>
      </form>
    </>
  );
};

export default FormTask;
