export default function ErrorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="min-h-screen grid  place-items-center">{children}</div>
    </>
  );
}
