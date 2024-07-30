import Foo from "@/components/Foo";
import StateProvider from "./StateProvider";


export default function Home() {
  return (
    <StateProvider>
      <div>
        Hello World
        <br></br>
        <Foo />
      </div>
    </StateProvider>
  );
}
