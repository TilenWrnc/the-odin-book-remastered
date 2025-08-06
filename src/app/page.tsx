import { Medal } from "lucide-react";
import NavBarMarketing from "./(components)/nav-bar-marketing";

export default function Home() {
  return (
    <div>
        <NavBarMarketing/> 
        <div className="p-10 flex flex-col">
          <h1 className="font-bold md:text-5xl text-3xl flex border p-3 rounded-md shadow-lg bg-amber-500 w-fit m-auto my-15 "><Medal size={50}/>The Odin Book</h1>
          <p className="text-neutral-500 text-sm text-center md:text-xl">The Odin Book is a fully functional Facebook clone, handcrafted as part of The Odin Project curriculum. Designed to replicate the social media experience we all know,<br /> 
            it lets you connect with friends, post updates, like and comment, and explore a modern, responsive interface — all built using the latest web technologies. <br />
            Whether you're showcasing your development skills or exploring how real-world apps work under the hood, The Odin Book is a powerful demonstration of full-stack engineering in action.
          </p>
          <p className="font-semibold md:text-xl text-medium text-center mt-10">2025 @ TilenWrnc</p>
        </div>
    </div>
  );
}
