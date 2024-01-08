import { Inter } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/store";
import Login from "@/components/login";
import { useEffect } from "react";
import { handleToken } from "@/store/apps/login";
import Link from "next/link";
import Menu from "@/components/menu";
import { useGetIsLoginQuery } from "@/services/login";
import { RootState } from "@/store";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

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
            <Link href="task">Yeni Görev</Link>
          </div>
          <div className="w-full md:w-1/4 px-3">
            <Link href="/calender">Takvim</Link>
            </div>
        </div>
      </main>
    </>
  );
}
