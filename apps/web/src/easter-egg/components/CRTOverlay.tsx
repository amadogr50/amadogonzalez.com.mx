'use client'

export function CRTOverlay() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          animation: 'crt-flicker 0.07s infinite alternate',
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 3px)',
          boxShadow: 'inset 0 0 150px rgba(0,0,0,0.7)',
        }}
      />
      <style>{`
        @keyframes crt-flicker {
          0% { opacity: 0.97; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  )
}
