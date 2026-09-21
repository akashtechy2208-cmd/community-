import { useState } from "react";
import { ArrowDown, ArrowUpRight, Award, Crown, Linkedin, Shield, Target, X, Zap, Eye, Lock } from "lucide-react";
import DecryptedText from "@/components/reactbits/DecryptedText";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import TiltedCard from "@/components/reactbits/TiltedCard";
import ShinyText from "@/components/reactbits/ShinyText";
import Magnet from "@/components/reactbits/Magnet";
import CountUp from "@/components/reactbits/CountUp";
import SplitText from "@/components/reactbits/SplitText";
import Squares from "@/components/reactbits/Squares";
import BlurIn from "@/components/reactbits/BlurIn";
import GrainOverlay from "@/components/reactbits/GrainOverlay";
import InfiniteMarquee from "@/components/reactbits/InfiniteMarquee";
import GlitchText from "@/components/reactbits/GlitchText";
import AnimatedBorder from "@/components/reactbits/AnimatedBorder";
import FlipCard from "@/components/reactbits/FlipCard";
import LetterSwap from "@/components/reactbits/LetterSwap";
import CircularText from "@/components/reactbits/CircularText";

const navItems = [
  ["Community", "community"],
  ["Focus Areas", "focus"],
  ["Inquire", "inquire"],
] as const;

const team = [
  {
    initials: "AK",
    image: "/akash-profile.jpg",
    name: "Akash",
    title: "Founder · Junior Penetration Tester",
    eyebrow: "Founder / 001",
    intro:
      "Cybersecurity enthusiast focused on Active Directory security, penetration testing, and Capture The Flag challenges.",
    bio: "I enjoy learning how systems work, identifying security weaknesses, and understanding how attackers move through networks—especially in Windows and Active Directory environments. My hands-on experience includes enumeration, authentication attacks, privilege escalation, network security testing, and security monitoring.",
    focus: [
      "Active Directory Pentesting",
      "Network & Web Security",
      "CTF & Vulnerability Research",
      "Wazuh / IDS & Security Monitoring",
      "Linux & Windows Security",
      "IoT & Embedded Security",
    ],
    linkedin: "https://www.linkedin.com/in/akash2201",
    tryhackme: "https://tryhackme.com/p/akashtechy",
  },
];

const marqueeItems = [
  "Active Directory",
  "Penetration Testing",
  "CTF Challenges",
  "Network Security",
  "Privilege Escalation",
  "DFIR",
  "IoT Security",
  "Wazuh / SIEM",
  "Red Team",
  "Blue Team",
  "CVE Research",
  "Malware Analysis",
];

const focusAreas = [
  {
    area: "Active Directory Pentesting",
    icon: Lock,
    description:
      "Deep enumeration, Kerberoasting, Pass-the-Hash, and full domain compromise techniques.",
  },
  {
    area: "Network & Web Security",
    icon: Eye,
    description:
      "Network scanning, web app vulnerabilities, OWASP Top 10, and exploitation of services.",
  },
  {
    area: "CTF & Vulnerability Research",
    icon: Zap,
    description:
      "Solving Capture The Flag challenges and finding novel security vulnerabilities in real systems.",
  },
  {
    area: "Wazuh / IDS Monitoring",
    icon: Shield,
    description:
      "Building SIEM pipelines, intrusion detection rules, and real-time security alerting.",
  },
  {
    area: "Linux, Windows & IoT Security",
    icon: Target,
    description:
      "OS-level hardening, privilege escalation paths, and embedded system security testing.",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="bg-black font-inter text-white selection:bg-[#ff2b2b] selection:text-white">
      {/* ─────────── HERO SECTION — VIDEO BACKGROUND UNTOUCHED ─────────── */}
      <section className="relative flex min-h-screen overflow-hidden bg-black">
        {/* === UNTOUCHED VIDEO BACKGROUND === */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/manus-storage/hackspire-hero_e4ed3d03.jpg"
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/10 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        {/* === END UNTOUCHED VIDEO BACKGROUND === */}

        {/* Header */}
        <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
          <button
            onClick={() => scrollToId("top")}
            className="font-podium text-2xl font-bold uppercase tracking-wider sm:text-3xl"
          >
            <GlitchText text="HACKSPIRE" speed="slow" />
          </button>
          <nav className="hidden items-center gap-10 md:flex">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollToId(id)}
                className="group relative font-inter text-xs uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white"
              >
                <LetterSwap text={label} className="text-xs uppercase tracking-[0.2em]" />
                <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-[#ff2b2b] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>
          <Magnet magnetStrength={3}>
            <AnimatedBorder borderWidth={1} speed={2.5}>
              <button
                onClick={() => scrollToId("inquire")}
                className="hidden items-center gap-2 bg-black/50 px-6 py-3 text-xs uppercase tracking-[0.18em] backdrop-blur-sm transition-all hover:bg-[#ff2b2b]/15 md:flex"
              >
                <ShinyText text="Get in touch" speed={3} />
                <ArrowUpRight className="h-4 w-4 text-[#ff2b2b]" />
              </button>
            </AnimatedBorder>
          </Magnet>
          <button
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Open menu"
          >
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-6 bg-white" />
            <span className="h-0.5 w-4 bg-white" />
          </button>
        </header>

        {/* Mobile menu */}
        <div
          className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 md:hidden ${
            menuOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5 sm:px-10">
            <span className="font-podium text-2xl font-bold uppercase tracking-wider">
              HACKSPIRE
            </span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X className="h-7 w-7" />
            </button>
          </div>
          <div className="flex h-[75vh] flex-col items-center justify-center gap-5">
            {navItems.map(([label, id], index) => (
              <button
                key={id}
                onClick={() => {
                  setMenuOpen(false);
                  scrollToId(id);
                }}
                className={`font-podium text-4xl uppercase transition-all duration-500 sm:text-5xl hover:text-[#ff2b2b] ${
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 80 + 100}ms` }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Hero content */}
        <div
          id="top"
          className="relative z-10 flex w-full min-h-screen items-center px-6 pb-12 pt-28 sm:px-10 lg:px-16 lg:pb-20"
        >
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3 opacity-0 animate-fade-up lg:mb-8">
              <Crown className="h-4 w-4 text-[#ff2b2b]" />
              <DecryptedText
                text="Cybersecurity Community"
                animateOn="view"
                speed={35}
                className="text-xs uppercase tracking-[0.3em] text-white/80 sm:text-sm font-mono"
                encryptedClassName="text-[#ff2b2b] opacity-80"
              />
            </div>

            <h1 className="font-podium text-[clamp(2.8rem,8vw,7rem)] font-bold uppercase leading-[0.92] tracking-tight opacity-0 animate-fade-up-delay-1">
              <SplitText text="Learn." delay={40} splitBy="characters" className="block" />
              <span className="text-[#ff2b2b] block">
                <SplitText text="Break." delay={40} splitBy="characters" />
              </span>
              <SplitText text="Build." delay={40} splitBy="characters" className="block" />
            </h1>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70 opacity-0 animate-fade-up-delay-2 sm:text-base lg:mt-8">
              A collective for curious minds who find the weakness, follow the evidence —{" "}
              <strong className="text-white">and build what&apos;s next.</strong>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4 opacity-0 animate-fade-up-delay-3 sm:gap-6 lg:mt-10">
              <Magnet magnetStrength={2.5}>
                <AnimatedBorder borderWidth={1} speed={3}>
                  <button
                    onClick={() => scrollToId("community")}
                    className="group flex items-center gap-3 bg-black/70 px-5 py-3 text-[11px] uppercase tracking-[0.2em] backdrop-blur-sm transition-all hover:bg-[#ff2b2b]/15 sm:px-7 sm:py-4 sm:text-xs"
                  >
                    <ShinyText text="Meet the collective" speed={3} />
                    <ArrowUpRight className="h-4 w-4 text-[#ff2b2b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </AnimatedBorder>
              </Magnet>
              <div className="hidden items-center gap-3 sm:flex">
                <Award className="h-8 w-8 text-[#ff2b2b]/70" />
                <div className="text-xs uppercase tracking-wider text-white/60">
                  <div className="font-semibold text-white">Founder-led</div>
                  <div>Security Collective</div>
                </div>
              </div>
            </div>

            {/* Stats row with CountUp */}
            <div className="mt-8 flex flex-wrap gap-6 opacity-0 animate-fade-up-delay-4 sm:mt-10 sm:gap-12 lg:mt-14 lg:gap-16">
              {[
                { value: 1, label: "core member", colored: false },
                { value: 5, label: "focus areas", colored: true },
              ].map(({ value, label, colored }) => (
                <div key={label}>
                  <div
                    className={`font-inter text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl ${
                      colored ? "text-[#ff2b2b]" : "text-white"
                    }`}
                  >
                    <CountUp to={value} padZero={true} duration={1.8} delay={1} />
                  </div>
                  <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/50 sm:text-xs">
                    {label}
                  </div>
                </div>
              ))}
              <div>
                <div className="font-inter text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  ∞
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/50 sm:text-xs">
                  curiosity
                </div>
              </div>
            </div>
          </div>

          {/* Scroll hint */}
          <button
            onClick={() => scrollToId("community")}
            className="absolute bottom-8 right-6 hidden items-center gap-3 text-[9px] uppercase tracking-[0.25em] text-white/50 transition-colors hover:text-[#ff2b2b] lg:flex"
          >
            <span className="h-px w-12 bg-white/40" /> scroll to meet the collective{" "}
            <ArrowDown className="h-3 w-3 animate-bounce" />
          </button>
        </div>
      </section>

      {/* ─────────── MARQUEE TICKER ─────────── */}
      <div className="border-y border-white/10 bg-[#0d0d0d] py-4">
        <InfiniteMarquee speed={28}>
          {marqueeItems.map((item) => (
            <span key={item} className="flex items-center gap-6 px-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff2b2b]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/55">
                {item}
              </span>
            </span>
          ))}
        </InfiniteMarquee>
      </div>

      {/* ─────────── SECTION 01 — THE COLLECTIVE ─────────── */}
      <section
        id="community"
        className="relative border-t border-white/10 bg-[#0b0505] px-6 py-24 sm:px-10 lg:px-16 lg:py-32 overflow-hidden"
      >
        <GrainOverlay opacity={0.025} />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <div className="flex flex-col justify-between gap-8 border-b border-white/15 pb-10 lg:flex-row lg:items-end">
            <div>
              <BlurIn delay={0}>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff2b2b]">
                  <DecryptedText
                    text="01 / the collective"
                    animateOn="view"
                    speed={30}
                    className="font-mono"
                  />
                </p>
              </BlurIn>
              <BlurIn delay={0.1}>
                <h2 className="mt-5 font-podium text-5xl uppercase leading-[.9] tracking-tight sm:text-7xl">
                  <SplitText text="People behind" splitBy="words" />
                  <br />
                  <span className="text-white/40">
                    <SplitText text="the signal." splitBy="words" />
                  </span>
                </h2>
              </BlurIn>
            </div>
            <BlurIn delay={0.2} direction="left">
              <p className="max-w-sm text-sm leading-7 text-white/55">
                Hackspire is a founder-led cybersecurity community built around practical learning,
                investigation, and sharing the work.
              </p>
            </BlurIn>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-1">
            {team.map((member) => (
              <SpotlightCard
                key={member.name}
                spotlightColor="rgba(255, 43, 43, 0.14)"
                className="border border-white/15 bg-black/60 p-7 transition-all duration-300 hover:border-[#ff2b2b]/50 sm:p-10"
              >
                <div className="flex flex-col-reverse gap-10 lg:flex-row lg:items-start">
                  {/* Member info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      {!member.image && (
                        <div className="grid h-16 w-16 place-items-center border border-[#ff2b2b]/70 font-podium text-2xl text-[#ff2b2b]">
                          {member.initials}
                        </div>
                      )}
                      <BlurIn direction="right">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">
                          <DecryptedText
                            text={member.eyebrow}
                            animateOn="hover"
                            speed={30}
                          />
                        </span>
                      </BlurIn>
                    </div>
                    <BlurIn delay={0.05}>
                      <p className={`mt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#ff2b2b] ${!member.image ? "mt-14" : ""}`}>
                        <ShinyText text={member.title} speed={5} />
                      </p>
                    </BlurIn>
                    <BlurIn delay={0.1}>
                      <h3 className="mt-3 font-podium text-4xl uppercase tracking-tight sm:text-5xl">
                        <GlitchText text={member.name} speed="slow" />
                      </h3>
                    </BlurIn>
                    <BlurIn delay={0.15}>
                      <p className="mt-5 text-lg leading-7 text-white/80 max-w-2xl">{member.intro}</p>
                    </BlurIn>
                    <BlurIn delay={0.2}>
                      <p className="mt-5 text-sm leading-7 text-white/50 max-w-2xl">{member.bio}</p>
                    </BlurIn>

                    {/* Focus tags */}
                    <BlurIn delay={0.25}>
                      <div className="mt-8 flex flex-wrap gap-2">
                        {member.focus.map((item) => (
                          <AnimatedBorder key={item} borderWidth={1} speed={4}>
                            <span className="block bg-white/[0.03] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-white/65 transition-colors hover:text-white cursor-default">
                              <LetterSwap text={item} speed={20} />
                            </span>
                          </AnimatedBorder>
                        ))}
                      </div>
                    </BlurIn>

                    {/* Social links */}
                    <div className="mt-10 border-t border-white/10 pt-5 flex flex-wrap gap-4 items-center">
                      <Magnet magnetStrength={3}>
                        <AnimatedBorder borderWidth={1} borderColor="#ff2b2b" speed={2}>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 bg-[#ff2b2b]/10 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff2b2b] transition-all hover:bg-[#ff2b2b] hover:text-white"
                          >
                            <ShinyText text="Connect on LinkedIn" speed={3} />
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </AnimatedBorder>
                      </Magnet>
                      {member.tryhackme && (
                        <Magnet magnetStrength={3}>
                          <AnimatedBorder borderWidth={1} borderColor="rgba(255,255,255,0.3)" speed={3}>
                            <a
                              href={member.tryhackme}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 bg-white/5 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 transition-all hover:bg-white/15 hover:text-white"
                            >
                              TryHackMe Profile <Target className="h-4 w-4 text-[#ff2b2b]" />
                            </a>
                          </AnimatedBorder>
                        </Magnet>
                      )}
                    </div>
                  </div>

                  {/* Founder image with TiltedCard + CircularText badge */}
                  {member.image && (
                    <div className="relative w-full lg:w-[400px] shrink-0 flex items-start justify-center">
                      <TiltedCard
                        imageSrc={member.image}
                        altText={member.name}
                        captionText="Akash · Founder / 001"
                        scaleOnHover={1.04}
                        rotateAmplitude={12}
                        className="w-full aspect-[3/4]"
                      />
                      {/* Circular rotating text badge */}
                      <div className="absolute -top-8 -right-8 opacity-60">
                        <CircularText
                          text="HACKSPIRE · FOUNDER · PENTESTER · "
                          radius={54}
                          speed={12}
                          fontSize={8}
                          color="rgba(255,43,43,0.7)"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── SECTION 02 — FOCUS AREAS ─────────── */}
      <section
        id="focus"
        className="relative border-t border-white/10 bg-black px-6 py-24 sm:px-10 lg:px-16 lg:py-32 overflow-hidden"
      >
        {/* Animated squares grid background */}
        <Squares
          direction="right"
          speed={0.22}
          squareSize={44}
          borderColor="rgba(255, 255, 255, 0.03)"
          hoverFillColor="rgba(255, 43, 43, 0.15)"
          className="opacity-80"
        />
        <GrainOverlay opacity={0.03} />

        <div className="relative z-10 mx-auto max-w-[1440px]">
          <BlurIn>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ff2b2b]">
              <DecryptedText text="02 / focus areas" animateOn="view" speed={30} />
            </p>
          </BlurIn>
          <BlurIn delay={0.1}>
            <h2 className="mt-5 max-w-3xl font-podium text-5xl uppercase leading-[.9] tracking-tight sm:text-7xl">
              <SplitText text="Stay curious." splitBy="words" />
              <br />
              <span className="text-[#ff2b2b]">
                <SplitText text="Go deeper." splitBy="words" />
              </span>
            </h2>
          </BlurIn>

          {/* FlipCard focus area grid */}
          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {focusAreas.map((item, index) => {
              const Icon = item.icon;
              return (
                <BlurIn key={item.area} delay={index * 0.08}>
                  <FlipCard
                    trigger="hover"
                    className="h-56 w-full"
                    front={
                      <SpotlightCard
                        spotlightColor="rgba(255, 43, 43, 0.22)"
                        className="group h-full border border-white/15 bg-black/70 p-6 backdrop-blur-xs transition-colors hover:bg-[#ff2b2b]/[0.07] sm:p-8"
                      >
                        <div className="flex h-full flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs text-[#ff2b2b]">
                                0{index + 1}
                              </span>
                              <Icon className="h-5 w-5 text-white/20 transition-colors group-hover:text-[#ff2b2b]" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-podium text-2xl uppercase leading-tight tracking-tight transition-colors group-hover:text-[#ff2b2b]">
                              <DecryptedText text={item.area} animateOn="hover" speed={22} />
                            </h3>
                            <div className="mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/30">
                              <span>hover to flip</span>
                              <ArrowUpRight className="h-3 w-3 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff2b2b]" />
                            </div>
                          </div>
                        </div>
                      </SpotlightCard>
                    }
                    back={
                      <div className="h-full border border-[#ff2b2b]/60 bg-[#ff2b2b]/10 p-6 backdrop-blur-sm sm:p-8">
                        <div className="flex h-full flex-col justify-between">
                          <Icon className="h-6 w-6 text-[#ff2b2b]" />
                          <div>
                            <h3 className="font-podium text-lg uppercase leading-tight tracking-tight text-[#ff2b2b]">
                              {item.area}
                            </h3>
                            <p className="mt-3 text-xs leading-relaxed text-white/70">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </BlurIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── SECOND MARQUEE ─────────── */}
      <div className="border-y border-white/10 bg-[#0d0d0d] py-4">
        <InfiniteMarquee speed={22} direction="right">
          {["Find the weakness", "Follow the evidence", "Build what's next", "Stay curious", "Go deeper", "Hackspire"].map(
            (item) => (
              <span key={item} className="flex items-center gap-6 px-6">
                <span className="h-1.5 w-1.5 rounded-full bg-white/30" />
                <span className="font-podium text-sm uppercase tracking-[0.35em] text-white/30">
                  {item}
                </span>
              </span>
            )
          )}
        </InfiniteMarquee>
      </div>

      {/* ─────────── SECTION 03 — INQUIRE ─────────── */}
      <section
        id="inquire"
        className="relative border-t border-black bg-[#ff2b2b] px-6 py-20 text-white sm:px-10 lg:px-16 lg:py-28 overflow-hidden"
      >
        <GrainOverlay opacity={0.04} blendMode="multiply" />

        <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div>
            <BlurIn>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/70">
                <DecryptedText
                  text="Hackspire / open invitation"
                  animateOn="view"
                  speed={30}
                  className="font-mono"
                  encryptedClassName="text-white/40"
                />
              </p>
            </BlurIn>
            <BlurIn delay={0.1}>
              <h2 className="mt-5 font-podium text-5xl uppercase leading-[.88] tracking-tight sm:text-7xl lg:text-8xl">
                <SplitText text="Bring your" splitBy="words" />
                <br />
                <SplitText text="signal." splitBy="words" />
              </h2>
            </BlurIn>
          </div>
          <BlurIn delay={0.2} direction="left">
            <div className="flex flex-wrap gap-3">
              <Magnet magnetStrength={3}>
                <a
                  href="https://discord.gg/7Bv2Pbmt2A"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-fit items-center gap-3 border border-black bg-black px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black"
                >
                  <ShinyText text="Join the Discord" speed={3} />
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Magnet>
              <Magnet magnetStrength={3}>
                <a
                  href="https://www.linkedin.com/in/akash2201"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex w-fit items-center gap-3 border border-white/60 bg-white/10 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm transition-all hover:bg-black hover:text-white hover:border-black"
                >
                  <ShinyText text="Talk to the founder" speed={3} />
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </Magnet>
            </div>
          </BlurIn>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="flex flex-col gap-5 bg-black px-6 py-8 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-16">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center border border-[#ff2b2b] text-[#ff2b2b]">
            <Shield className="h-3.5 w-3.5" />
          </span>
          <span className="font-podium text-sm tracking-[0.16em]">
            <GlitchText text="HACKSPIRE" speed="slow" />
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
          Built by Akash / cybersecurity community
        </span>
        <a
          href="https://discord.gg/7Bv2Pbmt2A"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 transition-colors hover:text-[#ff2b2b]"
        >
          Join us on Discord ↗
        </a>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
          Frontend preview / no backend
        </span>
      </footer>
    </main>
  );
}
