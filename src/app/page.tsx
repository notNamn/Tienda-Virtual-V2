import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login")
  return (
    <main>
      <h1 className="text-center font-bold text-2xl" >
        HOME 
      </h1>

    </main>
  )
}