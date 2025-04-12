function Box({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center items-center p-2 border-2 rounded-lg border-amber-400 bg-black/75 text-white shadow-[1px_1px_19px_0px] shadow-amber-400">
      {children}
    </div>
  );
}

export default Box;
