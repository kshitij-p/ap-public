import { Toaster } from "~/components/ui/sonner";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div>
        <main className="flex-1 md:p-8 pt-2 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <Toaster richColors />
    </main>
  );
}
