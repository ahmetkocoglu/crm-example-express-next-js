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
      <Menu />
      <main className={`max-w-7xl mx-auto ${inter.className}`}>
        <div className="flex flex-wrap py-28 text-center">
          <div className="w-full md:w-1/4 px-3">
            <Link href="/new-customer">Yeni Müşteri</Link>
          </div>
          <div className="w-full md:w-1/4 px-3">
            <Link href="/customer">Müşteriler</Link></div>
          <div className="w-full md:w-1/4 px-3 whitespace-nowrap">
            <Link href="new-meeting">Yeni Toplatı / Görüşme</Link>
          </div>
          <div className="w-full md:w-1/4 px-3">
            <Link href="/calender">Takvim</Link>
            </div>
        </div>
      </main>
    </>
  );
}
