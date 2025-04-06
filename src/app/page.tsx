import { headers } from "next/headers";
import Image from "next/image";

export default async function HomePage() {
  const headerList = await headers();
  const host = headerList.get("host") || "";
  const subdomain = host.split(".")[0];

  const baseUrl = process.env.NEXT_PUBLIC_API_URL|| "https://multi-tenet-school-profile-app.vercel.app";

  const res = await fetch(`${baseUrl}/api/school-info?school=${subdomain}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className=" mx-auto text-center container">
        <h2 className=" text-2xl font-bold text-red-500  absolute  left-1/2 transform -translate-x-1/2 top-1/5 ">
          School not found
        </h2>

        <div className="w-full ">
          <Image
            src={"/notfound.jpg"}
            alt="not-found"
            width={300}
            height={300}
            className="w-full"
          />
        </div>
      </div>
    );
  }

  const schoolData = await res.json();

  if (!schoolData) return <p className="block mx-auto">Loading...</p>;
  if (schoolData.error === "School not found")
    return <div className=" mx-auto w-fit text-center">School not found</div>;

  return (
    <div className="p-6 container">
      <h1 className="text-3xl font-bold">{schoolData.name}</h1>
      <p>{schoolData.description}</p>
      <p>📞 {schoolData.contact}</p>
    </div>
  );
}
