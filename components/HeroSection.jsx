import Orb from "./Orb"
import GradientText from "./GradientText"
import Image from "next/image"

const HeroSection = () => {
  return (
    <section
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      className="bg-white"
    >
      {/* Orb Background Component */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <Orb hoverIntensity={0.5} rotateOnHover={true} hue={0} forceHoverState={false} />
      </div>

      {/* Perfectly Centered Text Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="mb-8">
          <Image
            src="/images/aenfinite-logo.svg"
            alt="Aenfinite"
            width={300}
            height={80}
            className="mx-auto"
            priority
          />
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: "700",
            color: "#111827",
            margin: 0,
            marginBottom: "1rem",
            letterSpacing: "-0.025em",
            lineHeight: "1.1",
            textAlign: "center",
          }}
        >
          Welcome to Aenfinite
        </h1>
        <h2
          style={{
            fontSize: "clamp(1.25rem, 4vw, 2rem)",
            fontWeight: "300",
            margin: 0,
            letterSpacing: "0.025em",
            lineHeight: "1.2",
            textAlign: "center",
          }}
        >
          <GradientText
            colors={["#60a5fa", "#8b5cf6", "#ec4899", "#a855f7", "#3b82f6", "#60a5fa"]}
            animationSpeed={4}
            showBorder={false}
          >
            Redefine Infinite Possibilities
          </GradientText>
        </h2>
      </div>
    </section>
  )
}

export default HeroSection
