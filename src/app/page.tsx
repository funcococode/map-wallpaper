import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import GoogleMaps from "./_components/GoogleMaps";

export default async function Home() {
  return (
    <GoogleMaps />
  ); 
}

