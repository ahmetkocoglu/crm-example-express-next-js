import React from 'react'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '@/store';
import { useForm } from 'react-hook-form';
import Input from './input';
import { addUser } from '@/store/apps/user';

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
  // ** Redux
  // const dispatch = useDispatch<AppDispatch>();

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
    // dispatch(addUser(payload));
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
            <button type="submit">Gönder</button>
          </div>
        </div>
      </form>
      </main>
    </>
  )
}

export default AddCustomer