import DisplayPosts from "@/src/components/ui/Home/DisplayPosts";
import Quotes from "@/src/components/ui/Quotes/Quotes";

export default async function Home() {
  return (
    <section className="flex gap-4">
      {/* <GBDrawer /> */}
      <div className="w-full">
        <Quotes />
        <DisplayPosts />
      </div>
    </section>
  );
}
