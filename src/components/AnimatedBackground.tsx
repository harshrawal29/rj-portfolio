function AnimatedBackground() {


  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.10),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06),transparent_28%),linear-gradient(180deg,#070707_0%,#050505_45%,#020202_100%)]" />
      <div className="animated-background-orb animated-background-orb--one" />
      <div className="animated-background-orb animated-background-orb--two" />
      <div className="animated-background-noise" />
      <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(255,255,255,0.015)_50%,transparent_100%)] bg-[length:100%_4px] opacity-20" />
    </div>
  )
}

export default AnimatedBackground
