export default function Footer() {
  return (
    <footer className="bg-ink text-paper mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-pop flex items-center justify-center">
            <span className="text-ink font-display font-bold text-[10px]">TM</span>
          </div>
          <span className="font-display text-xs uppercase tracking-[0.2em] text-paper/60">
            The Moment
          </span>
        </div>
        <p className="font-mono text-xs text-paper/40">
          Logan & Rachel
        </p>
      </div>
    </footer>
  );
}
