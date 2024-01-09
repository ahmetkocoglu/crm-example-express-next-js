import React, { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/store';
import { useForm } from "react-hook-form";
import Input from "./input";
import { useSetUserMutation } from "@/services/user";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
};

const loginFormSchema = yup.object().shape({
  firstName: yup.string().required("Lütfen adınızı giriniz"),
  lastName: yup.string().required("Lütfen soyadınız giriniz"),
  email: yup.string().required("Lütfen email giriniz"),
});

const defaultValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const AddCustomer = () => {
  const [setUser] = useSetUserMutation();
  // ** State
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    setUser(payload)
      .unwrap()
      .then(() => {
        console.log("User added");
        setLoading(false)
      })
      .catch((error) => {
        console.log("Failed to add user");
        setLoading(false)
      });
    reset(defaultValues);
  };

  return (
    <>
      <main className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap -mx-4 py-28 gap-y-2">
            <div className="w-full md:w-1/1 px-1">
              <Input
                type="text"
                placeholder="First Name"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && <>{errors.firstName.message}</>}
            </div>
            <div className="w-full md:w-1/1 px-1">
              <Input
                type="text"
                placeholder="Last Name"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && <>{errors.lastName.message}</>}
            </div>
            <div className="w-full md:w-1/1 px-1">
              <Input
                type="text"
                placeholder="Email"
                className="mt-1"
                rounded="rounded-2xl"
                {...register("email", { required: true })}
              />
              {errors.email && <>{errors.email.message}</>}
            </div>
            <div className="w-full md:w-1/1 px-5 text-end">
              <button type="submit" disabled={loading}>{loading ? 'işleminiz yapılıyor' : 'Gönder'}</button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default AddCustomer;
