import NavbarAdmin from "@/components/layout/NavbarAdmin";

type Props = {
  children: React.ReactNode;
};

export default async function AdminLayout({ children }: Props) {
  return (
    <>
      <NavbarAdmin />
      <main className="min-h-screen">{children}</main>
    </>
  );
}
