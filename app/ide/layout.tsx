export default function IdeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fade-in max-w-7xl mx-auto px-4">
      {/* <IdeHeader /> */}
      {children}
    </div>
  );
}
