import Posts from "@/src/components/posts/posts";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <h1 className="font-bold text-center text-rose-400 text-3xl">
        Welcome to Root n Rise
      </h1>

      {/* @ts-ignore */}
      <Posts />
    </section>
  );
}
