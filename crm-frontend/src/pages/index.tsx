import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import Login from "@/components/login";
import { useEffect } from "react";
import { handleToken } from "@/store/apps/login";
import Link from "next/link";
import Menu from "@/components/menu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // ** Redux
  const dispatch = useDispatch<AppDispatch>();

  // ** Selector
  const data: any = useSelector((state: RootState) => state.login.data);
  const loading: boolean = useSelector(
    (state: RootState) => state.login.loading
  );
  const isToken: boolean = useSelector(
    (state: RootState) => state.login.isToken
  );

  useEffect(() => {
    dispatch(handleToken("payload"));
  }, [dispatch]);

  return (
    <>
      <Menu/>
      <main
        className={`flex flex-col items-center justify-between p-10 ${inter.className}`}
      >
        <hr />
        {loading ? "Yükleniyor" : ""}
        {data.user?.firstName} {data.user?.lastName}
      </main>
    </>
  );
}
