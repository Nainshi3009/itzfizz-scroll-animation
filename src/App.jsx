import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const animationProgress = Math.min(scrollY / window.innerHeight, 1);
  const easedProgress = animationProgress * animationProgress * (3 - 2 * animationProgress);
  const approachEntranceStyle = {
    opacity: easedProgress,
    transform: `translateY(${(1 - easedProgress) * 40}px)`,
  };
  const approachHeadingStyle = {
    opacity: easedProgress,
    transform: `translateY(${(1 - easedProgress) * 40}px) scale(${0.96 + easedProgress * 0.04})`,
    letterSpacing: `${1 - easedProgress}px`,
  };
  const getStatStyle = (index) => {
    const statProgress = Math.min(
      Math.max((easedProgress - index * 0.08) / (1 - index * 0.08), 0),
      1
    );

    return {
      animation: "none",
      opacity: 0.6 + statProgress * 0.4,
      transform: `translateY(${-statProgress * 30}px)`,
      transition: "opacity 0.12s linear, transform 0.12s linear",
    };
  };

  const nextContentProgress = Math.min(Math.max((easedProgress - 0.2) / 0.8, 0), 1);
  const nextContentStyle = {
    opacity: 0.5 + nextContentProgress * 0.5,
    transform: `translateY(${(1 - nextContentProgress) * 35}px) scale(${0.98 + nextContentProgress * 0.02})`,
    transition: "opacity 0.12s linear, transform 0.12s linear",
  };

  return (
    <main>

      {/* =========================
          HERO SECTION
      ========================= */}

      <section className="hero-section">

        <div
          className="hero-content"
          style={{
            opacity: 1 - easedProgress * 0.25,
            transform: `translateY(${-easedProgress * 60}px)`,
          }}
        >

          <p className="eyebrow">
            DIGITAL • TECHNOLOGY • INNOVATION
          </p>

          <h1 className="hero-title">
            WELCOME
            <span>ITZFIZZ</span>
          </h1>

          <p className="hero-description">
            We build digital experiences that transform ideas into meaningful
            technology solutions.
          </p>

          <div className="stats">

            <div className="stat" style={getStatStyle(0)}>
              <h2>95%</h2>
              <p>Client Satisfaction</p>
            </div>

            <div className="stat" style={getStatStyle(1)}>
              <h2>80%</h2>
              <p>Faster Digital Growth</p>
            </div>

            <div className="stat" style={getStatStyle(2)}>
              <h2>90%</h2>
              <p>Project Success</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE VISUAL */}

        <div className="visual-wrapper">

          <div
            className="visual-object"
            style={{
              transform: `translate(${easedProgress * 24}px, ${-easedProgress * 140}px) rotate(${easedProgress * 8}deg) scale(${1 + easedProgress * 0.08})`,
            }}
          >

            <div className="visual-circle"></div>

            <div className="visual-card">
              <span>ITZFIZZ</span>
              <strong>01</strong>
            </div>

          </div>

        </div>

        {/* SCROLL INDICATOR */}

        <div
          className="scroll-indicator"
          style={{
            opacity: 1 - easedProgress,
            transform: `translate(-50%, ${easedProgress * 20}px)`,
            transition: "opacity 0.12s linear, transform 0.12s linear",
          }}
        >
          <span>SCROLL</span>
          <div className="scroll-line"></div>
        </div>

      </section>


      {/* =========================
          SECOND SECTION
      ========================= */}

      <section
        className="content-section"
        style={{ "--approach-progress": easedProgress }}
      >

        <p className="section-label" style={approachEntranceStyle}>
          OUR APPROACH
        </p>

        <h2 style={approachHeadingStyle}>
          Turning ideas into
          <br />
          digital experiences.
        </h2>

        <p
          style={{
            ...approachEntranceStyle,
            opacity: 0.45 + easedProgress * 0.55,
            transform: `translateY(${(1 - easedProgress) * 25}px)`,
          }}
        >
          We combine technology, creativity and innovation to create digital
          solutions that make an impact.
        </p>

      </section>

      <section className="next-section">
        <div
          className="next-panel next-content"
          style={{
            ...nextContentStyle,
            "--panel-progress": nextContentProgress,
          }}
        >
          <p className="section-label">OUR PROCESS</p>
          <h3>Build with clarity, momentum, and measurable impact.</h3>
        </div>
      </section>

    </main>
  );
}

export default App;
