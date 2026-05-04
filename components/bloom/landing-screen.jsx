export default function LandingScreen({ name, onNameChange, onStart }) {
  return (
    <main className="screen active">
      <div className="landing-orb orb-a" />
      <div className="landing-orb orb-b" />
      <div className="landing-orb orb-c" />
      <div className="landing-shell">
        <section className="landing-card glass fade-up shadow-[0_24px_60px_rgba(145,83,118,0.18)]">
          <div className="landing-chip fade-up-delay-1">Bloom mode for Islem</div>
          <div className="landing-profile fade-up-delay-1">
            <div className="landing-avatar float-soft glow-slow ring-4 ring-white/40" aria-hidden="true" />
            <div className="landing-profile-copy">
              <div className="landing-eyebrow">lets start</div>
              <h1 className="landing-name">
                Hi <span>Islem</span>, your 30-day meal game is ready.
              </h1>
            </div>
          </div>
          <p className="landing-sub fade-up-delay-2">
            ahla sousou haw site sghayer nmotivi fikk bech takel hee
            hay koull w asma leklem bch tji tetrena😭
          </p>

          <div className="landing-promise fade-up-delay-2">
            <div className="promise-pill transition-transform duration-300 hover:-translate-y-1">Breakfast + lunch + snack</div>
            <div className="promise-pill transition-transform duration-300 hover:-translate-y-1">Dinner + smoothie bonus</div>
            <div className="promise-pill transition-transform duration-300 hover:-translate-y-1">tasma leklem zeda</div>
            <div className="promise-pill transition-transform duration-300 hover:-translate-y-1">Weight goal: 65 kg</div>
          </div>

          <div className="input-wrap fade-up-delay-2">
            <label className="input-label" htmlFor="name-input">
              Display name
            </label>
            <input
              id="name-input"
              className="name-input"
              maxLength={20}
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              placeholder="Islem"
            />
          </div>

          <button
            className="landing-cta fade-up-delay-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(225,106,144,0.38)] active:scale-[0.98]"
            onClick={onStart}
          >
            Start Islem
          </button>
          <p className="landing-foot fade-up-delay-2">
            Repeatable structure beats random motivation. Food first, then confidence, then gym.
          </p>
        </section>
      </div>
    </main>
  );
}
