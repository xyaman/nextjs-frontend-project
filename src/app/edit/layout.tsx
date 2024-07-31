export const metadata = {
  title: "User | NextJS Frontend",
  description: "Add and edit users.",
};

export default function EditLayout({
  children }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <>
      {children}
    </>
  );
}
