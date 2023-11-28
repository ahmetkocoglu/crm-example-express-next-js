import { Inter } from "next/font/google";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import Login from "@/components/login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // ** Selector
  const data: any = useSelector((state: RootState) => state.login.data);
  const loading: boolean = useSelector(
    (state: RootState) => state.login.loading
  );

  return (
    <main
      className={`flex flex-col items-center justify-between p-10 ${inter.className}`}
    >
      <Login/>
      <hr />
      {loading ? "Yükleniyor" : ""}
      {data.user?.firstName} {data.user?.lastName}
    </main>
  );
}
