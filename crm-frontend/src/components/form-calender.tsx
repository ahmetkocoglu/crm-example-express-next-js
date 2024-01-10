import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "./input";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useSetCalenderMutation } from "@/services/calender";
import { useGetTaskQuery } from "@/services/enums";
import { useGetUsersQuery } from "@/services/user";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

type FormValues = {
  id?: number | 0;
  type?: any;
  title: string;
  description: string;
  traits?: Object;
  user?: any;
  participants?: Number[];
};

const formSchema = yup.object().shape({
  title: yup.string().trim().required("giriniz"),
  description: yup.string().trim().required("giriniz"),
});

const defaultValues: FormValues = {
  id: 0,
  type: {
    id: 0,
    name: "",
  },
  title: "",
  description: "",
  user: {
    id: "",
    name: "",
  },
};

type Props = {
  data?: FormValues;
  id?: number;
};

const FormCalender = ({ data, id }: Props) => {
  const [setTask] = useSetCalenderMutation();

  const {} = useGetUsersQuery("/users");
  const { data: calender } = useGetTaskQuery("/enum/calender");

  // ** Selector **
  const users = useSelector((state: RootState) => state.usersState.users);

  // ** State **
  const [isSaveLoading, setIsSaveLoading] = useState(false);

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

    // const sendPayload = {
    //   id: payload.id,
    //   type: payload.type.name,
    //   title: payload.title,
    //   description: payload.description,
    //   status: payload.status?.name ?? "appointed",
    //   userId: payload.user.id,
    //   responsibleId: payload.responsible.id,
    // };

    // setIsSaveLoading(true);

    // setTask(sendPayload)
    //   .unwrap()
    //   .then(() => {
    //     setIsSaveLoading(false);
    //     reset(defaultValues);
    //   })
    //   .catch(() => {
    //     setIsSaveLoading(false);
    //   });
  };

  return (
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
                  options={[...(calender?.data ?? [])]}
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
        <div className="w-full md:w-2/2 px-1">
          {isSaveLoading ? (
            <>işleminiz yapılıyor</>
          ) : (
            <>
              <button type="submit">Gönder</button>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default FormCalender;
