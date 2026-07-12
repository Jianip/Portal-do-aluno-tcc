import { getSession } from "@/lib/auth";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <div>
      <Sidebar />
      <div className="lg:pl-64">
        <Header name={session?.name.split(" ")[0]} userId={session?.id} />
        <main className="mx-auto max-w-7xl p-4 pb-24 md:p-8">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
