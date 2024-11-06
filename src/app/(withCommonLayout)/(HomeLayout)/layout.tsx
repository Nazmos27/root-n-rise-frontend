import RnRDrawer from "@/src/components/drawer/RnRDrawer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex gap-2  flex-col md:flex-row">
      <div className="md:fixed">
        <RnRDrawer />
      </div>
      <div className="md:ml-64 w-full">{children}</div>
    </div>
  );
}
