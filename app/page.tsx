import { APITool } from "./api-tool/page";
import { GetContextProvider } from "./api-tool/context/GetContext";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      <main className="flex flex-1 w-full  flex-col items-center justify-between py-32 px-16  ">
        <GetContextProvider>
          <APITool />
        </GetContextProvider>
      </main>
    </div>
  );
}
