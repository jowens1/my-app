import { APITool } from "./api-tool/page";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center ">
      <main className="flex flex-1 w-full  flex-col items-center justify-between py-32 px-16  ">
        <APITool />
      </main>
    </div>
  );
}
