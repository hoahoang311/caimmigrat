import NavbarAdmin from "@/components/layout/NavbarAdmin";

type Props = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  return (
    <div className="max-h-screen flex flex-col">
      <NavbarAdmin />
      <main className="h-[calc(100vh-65px)] overflow-auto md:overflow-hidden">{children}</main>
    </div>
  );
}
