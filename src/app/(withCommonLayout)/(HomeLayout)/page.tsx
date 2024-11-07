import RnRDrawer from "@/src/components/drawer/RnRDrawer";
import DisplayPosts from "@/src/components/ui/Home/DisplayPosts";
import Quotes from "@/src/components/ui/Quotes/Quotes";

export default async function Home() {
  return (
    <section className="md:flex md:gap-4">
      <RnRDrawer />
      <div className="w-full">
        <Quotes />
        <DisplayPosts />
      </div>
    </section>
  );
}
