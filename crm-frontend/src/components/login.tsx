import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { useForm } from "react-hook-form";
import { login } from "@/store/apps/login";
import Input from "./input";

type FormValues = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().required("Lütfen email giriniz"),
  password: yup.string().required("Lütfen password giriniz"),
});

const defaultValues: FormValues = {
  email: "abc@xyz.com",
  password: "123",
};

const Login = () => {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(loginFormSchema),
  });

  const onSubmit = (payload: FormValues) => {
    dispatch(login(payload));
    reset(defaultValues);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-wrap -mx-4 py-28 gap-y-2">
          <div className="w-full md:w-1/2 px-1">
            <Input
              type="text"
              placeholder="Email"
              className="mt-1"
              rounded="rounded-2xl"
              {...register("email", { required: true })}
            />
            {errors.email && <>{errors.email.message}</>}
          </div>
          <div className="w-full md:w-1/2 px-1">
            <Input
              type="text"
              placeholder="Password"
              className="mt-1"
              rounded="rounded-2xl"
              {...register("password", { required: true })}
            />
            {errors.password && <>{errors.password.message}</>}
          </div>
          <div className="w-full md:w-2/2 px-1">
            <button type="submit">Gönder</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
