import NavbarAdmin from "@/components/layout/NavbarAdmin";

type Props = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  return (
    <div className="max-h-screen flex flex-col">
      <NavbarAdmin />
      <main className="h-[calc(100vh-65px)]">{children}</main>
    </div>
  );
}
