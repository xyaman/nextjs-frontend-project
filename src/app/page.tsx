import Card from "@/components/Card";
import StateProvider from "./StateProvider";


export default function Home() {
  return (
    <StateProvider>
      <div>
        Hello World
        <br></br>
        <Card />
      </div>
    </StateProvider>
  );
}
