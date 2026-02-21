"use client";

const SITE_URL = "https://wedding-photo-app-one.vercel.app";
const QR_API = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(SITE_URL)}`;

export default function QRPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Screen layout */}
      <section className="bg-ink text-paper print:hidden">
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
          <div className="flex items-start gap-6">
            <div className="hidden sm:block w-1 bg-pop self-stretch" />
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper/50">
                Share the moment
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.9] tracking-tight mt-2 animate-fade-up">
                QR Code
              </h1>
              <p className="font-body text-paper/60 text-lg mt-4 max-w-md animate-fade-up-delay">
                Print this page and place it on tables so guests can easily share photos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16 print:hidden">
        <div className="flex flex-col items-center">
          {/* QR Card Preview */}
          <div className="border-2 border-ink p-10 sm:p-14 flex flex-col items-center max-w-sm w-full">
            <div className="w-8 h-8 bg-ink flex items-center justify-center mb-6">
              <span className="text-paper font-display font-bold text-xs">TM</span>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mid">
              The wedding of
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight mt-2 text-center leading-[0.95]">
              Logan <span className="text-pop">&</span> Rachel
            </h2>

            <div className="w-12 h-px bg-rule my-6" />

            <div className="bg-paper p-3 border border-rule">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={QR_API}
                alt="QR code linking to the wedding photo sharing site"
                width={220}
                height={220}
                className="block"
              />
            </div>

            <p className="font-display text-sm font-semibold uppercase tracking-[0.15em] mt-6 text-ink">
              Scan to share photos
            </p>

            <p className="font-mono text-[10px] text-mid mt-2 text-center break-all">
              {SITE_URL}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-10">
            <button onClick={handlePrint} className="btn-primary">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Card
            </button>
          </div>

          <p className="font-mono text-xs text-mid mt-6 text-center max-w-xs">
            Tip: Print multiple copies and place one on each table at the reception.
          </p>
        </div>
      </section>

      {/* Print-only layout: clean card optimized for paper */}
      <div className="hidden print:flex print:items-center print:justify-center print:min-h-screen">
        <div className="flex flex-col items-center p-10">
          <div className="w-8 h-8 bg-ink flex items-center justify-center mb-6">
            <span className="text-paper font-display font-bold text-xs">TM</span>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mid">
            The wedding of
          </span>

          <h2 className="font-display text-4xl font-bold uppercase tracking-tight mt-2 text-center leading-[0.95]">
            Logan & Rachel
          </h2>

          <div className="w-12 h-px bg-rule my-6" />

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={QR_API}
            alt="QR code linking to the wedding photo sharing site"
            width={260}
            height={260}
            className="block"
          />

          <p className="font-display text-base font-semibold uppercase tracking-[0.15em] mt-8 text-ink">
            Scan to share photos
          </p>

          <p className="font-mono text-[10px] text-mid mt-2 text-center">
            {SITE_URL}
          </p>
        </div>
      </div>
    </>
  );
}
