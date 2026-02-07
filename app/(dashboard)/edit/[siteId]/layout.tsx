export default function EditLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        header { display: none !important; }
        main { 
          max-width: none !important; 
          padding: 0 !important; 
          margin: 0 !important;
        }
      `}</style>
      <div className="fixed inset-0 z-50 bg-slate-100">
        {children}
      </div>
    </>
  );
}