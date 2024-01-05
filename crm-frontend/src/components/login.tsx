import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store";
import { useForm } from "react-hook-form";
import { login } from "@/store/apps/login";
import Input from "./input";
import { useRouter } from "next/router";
import { useLoginMutation } from "@/services/login";

type FormValues = {
  email: string;
  password: string;
};

const loginFormSchema = yup.object().shape({
  email: yup.string().required("Lütfen email giriniz"),
  password: yup.string().required("Lütfen password giriniz"),
});

const defaultValues: FormValues = {
  email: "test@xyz.com",
  password: "123456",
};

const Login = () => {
  const [login] = useLoginMutation()
  // ** Redux
  // const dispatch = useDispatch<AppDispatch>();

  // ** Selector
  // const isLogin: any = useSelector((state: RootState) => state.login.isLogin);

  // ** State
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [isOnSubmit, setIsOnSubmit] = useState(false);

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

  const router = useRouter();

  const onSubmit = (payload: FormValues) => {
    // dispatch(login(payload));
    login(payload)
            .unwrap()
            .then((data) => {
               console.log('login başarılı', data);
            })
            .catch(() =>{
              console.log('Failed to login');
            });
    reset(defaultValues);
    setIsOnSubmit(true);
  };

  // useEffect(() => {
  //   if (isLogin) {
  //     router.push("/");
  //   } else {
  //     if (isOnSubmit) setLoginErrorMessage("email ve/veya şifre geçersiz");
  //   }
  // }, [isLogin, isOnSubmit, router]);

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
            {loginErrorMessage}
            <button type="submit">Gönder</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
