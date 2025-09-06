"use client";

import Image from "next/image";
import { AnimatedBeamMultipleOutputs } from "@/components/animated-beam-multiple-outputs";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import BlurIn from "@/components/magicui/blur-in";
import { EmailForm } from "@/components/email-form";
import { FadeIn } from "@/components/magicui/fade-in";
import GlobeAndStars from "@/components/globe-and-stars";
import Hero from "@/components/hero";
import Marquee from "@/components/magicui/marquee";
import Technologies from "@/components/technologies";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import Orbit from "@/components/orbit";
import RetroGrid from "@/components/magicui/retro-grid";
import StatsChart from "@/components/stats-chart";
import { cn } from "@/lib/utils";
import { defaultDomains } from "@/lib/data";
import { RippleCard } from "./ui/ripper-card";
import { motion } from "framer-motion";
import GitHubStars from "@/components/github-stars";
import ProjectPosts from "@/components/project-posts";

const features = [
  {
    name: "",
    description: "",
    href: "",
    cta: "",
    className: "col-span-3 md:col-span-2",
    background: (
      <>
        <div
          id="hero"
          className="absolute right-0 top-0 h-full w-full border-none transition-all duration-300 ease-out"
        >
          <Hero />
        </div>

        <div className="absolute right-0 top-0 z-50">
          <FadeIn direction="down">
            <AnimatedThemeToggler />
          </FadeIn>
        </div>
      </>
    ),
  },
  {
    name: "What is Splitmate?",
    description:
      "An intelligent app to split expenses with friends and family. Track balances, and settle up with ease.",
    className: "col-span-3 md:col-span-1",
    href: "/about",
    cta: "Learn more",
    background: (
      <div>
        <div className="absolute right-0 top-0 h-3/4 w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_50%)] group-hover:scale-105">
          <BlurIn duration={0.5} className="h-full">
            <Image
              className="object-cover object-center h-full w-full"
              src="/og.png"
              alt="splitmate app screenshot"
              width={200}
              height={200}
              priority
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/png;base64,..."
            />
          </BlurIn>
        </div>
        <FadeIn
          direction="right"
          framerProps={{
            show: { transition: { delay: 1.5 } },
          }}
        >
          <a
            href="#contact-form"
            className="absolute top-2 right-2 bg-background rounded-lg px-4 py-2 text-xs text-neutral-500 dark:text-neutral-300 max-w-3/4 w-fit"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full animate-pulse bg-emerald-400"></div>
              <div className="">Join the beta</div>
            </div>
          </a>
        </FadeIn>
      </div>
    ),
  },
  {
    name: "Core Features",
    description: "Everything you need to manage shared expenses.",
    href: "/#features",
    cta: "View features",
    className: "col-span-3 md:col-span-1",
    background: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        <Marquee
          className="absolute h-2/3 top-10 [--duration:40s] [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] w-full"
          pauseOnHover
        >
          {[
            {
              name: "Groups",
              body: "Create groups for trips, households, and more.",
            },
            { name: "Expenses", body: "Add expenses and attach receipts." },
            { name: "Balances", body: "See who owes who and how much." },
            { name: "Settle Up", body: "Settle debts with integrated payments." },
            { name: "Activity", body: "A shared feed of all group activity." },
          ].map((f, idx) => (
            <div
              key={idx}
              className={cn(
                "relative w-40 h-full cursor-pointer overflow-hidden rounded-xl border p-4",
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                "transform-gpu transition-all duration-300 ease-out hover:blur-none hover:-translate-y-1",
              )}
            >
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-col">
                  <figcaption className="text-lg font-bold dark:text-white ">
                    {f.name}
                  </figcaption>
                </div>
              </div>
              <blockquote className="mt-2 text-xs">{f.body}</blockquote>
            </div>
          ))}
        </Marquee>
      </motion.div>
    ),
  },
  {
    name: "Technologies",
    description:
      "Using a combination of cutting-edge, and time-tested technologies to build a robust, scalable, and secure application.",
    href: "/technologies",
    cta: "View all technologies",
    className: "col-span-3 md:col-span-2",
    background: (
      <div className="absolute right-0 top-0 w-[80%] origin-top translate-x-0 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_70%)] md:[mask-image:linear-gradient(to_top,transparent_50%,#000_70%)] group-hover:-translate-y-5 group-hover:scale-105">
        <FadeIn direction="up">
          <Technologies />
        </FadeIn>
      </div>
    ),
  },
  {
    name: "AI-Powered Splits",
    description:
      "Use our AI assistant to automatically split bills from a receipt or just by describing it in plain English.",
    href: "/chat",
    cta: "Try the AI assistant",
    className: "col-span-3 md:col-span-2",
    background: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <AnimatedBeamMultipleOutputs className="absolute right-0 top-4 h-[300px] w-[600px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] md:[mask-image:linear-gradient(to_top,transparent_0%,#000_100%)] group-hover:scale-105" />
      </motion.div>
    ),
  },
  {
    name: "Seamless Experience",
    description: "Fast, reliable, and always in sync.",
    className: "col-span-3 md:col-span-1",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute w-full h-full right-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_25%,#000_70%)] group-hover:scale-105">
        <Orbit />
      </div>
    ),
  },

  {
    name: "Available Everywhere",
    description:
      "Access Splitmate on the web, or install it as a PWA on your phone. Your data is always available.",
    className: "col-span-3 md:col-span-3",
    href: "/",
    cta: "Learn more",
    background: (
      <div className="absolute w-full h-full right-0 top-0 origin-top rounded-md transition-all duration-300 ease-out  [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] md:[mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105 group-hover:-translate-y-4">
        <GlobeAndStars />
      </div>
    ),
  },

  {
    name: "Share with Friends",
    description: "Love Splitmate? Share it with your friends and get rewards.",
    className: "col-span-3 md:col-span-1",
    href: "/invite",
    cta: "Invite friends",
    background: (
      <div className="absolute h-full w-full left-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_70%)] group-hover:scale-105 group-hover:-translate-y-4">
        <div className="text-7xl font-semibold w-full flex justify-center items-center h-2/3 group-hover:-translate-y-2 transition-all duration-300">
          <a
            href="/invite"
            className="flex items-center gap-2 border shadow-xl p-5 rounded-lg border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
          >
            <Image
              src="/file.svg"
              alt="Share icon"
              className="h-14 w-14 drop-shadow"
              width={56}
              height={56}
              priority
            />
          </a>
        </div>
      </div>
    ),
  },

  {
    name: "How It Works",
    description: "A quick overview of how to get started with Splitmate.",
    className: "col-span-3 md:col-span-2",
    href: "/#how-it-works",
    cta: "See the guide",
    background: (
      <div className="absolute h-full w-full left-0 top-0 origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[102%]">
        <div className="absolute h-full w-full [mask-image:linear-gradient(to_top,transparent_20%,#000_70%)]">
          <div className="absolute h-full w-full [mask-image:linear-gradient(to_bottom,transparent_2%,#000_10%)]">
            <div className="text-7xl font-semibold w-full flex justify-center items-center h-2/3 transition-all duration-300">
              <div className="flex items-center gap-2">
                <ProjectPosts />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  {
    name: "User Analytics",
    description: "Track your spending habits and see where your money goes.",
    href: "/analytics",
    cta: "View Analytics",
    className: "col-span-3 md:col-span-2",
    background: (
      <>
        <div className="absolute h-full w-full left-0 top-0 origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[102%]">
          <div className="absolute h-full w-full [mask-image:linear-gradient(to_top,transparent_20%,#000_70%)]">
            <div className="absolute h-full w-full [mask-image:linear-gradient(to_bottom,transparent_2%,#000_10%)]"></div>
            <div className="sm:-translate-y-5">
              <StatsChart />
            </div>
          </div>
        </div>
      </>
    ),
  },

  {
    name: "Dashboard",
    description: "Your central hub for all your groups and expenses.",
    className: "col-span-3 md:col-span-1",
    href: "/dashboard",
    cta: "Go to Dashboard",
    background: (
      <div className="absolute h-full w-full left-0 top-0 origin-top rounded-md transition-all duration-300 ease-out group-hover:scale-[105%]">
        <div className="absolute h-full w-full [mask-image:linear-gradient(to_top,transparent_20%,#000_70%)]">
          <div className="absolute h-full w-full [mask-image:linear-gradient(to_bottom,transparent_2%,#000_10%)]">
            <RippleCard />
          </div>
        </div>
      </div>
    ),
  },

  {
    name: "",
    description: "",
    className: "col-span-3 md:col-span-3",
    href: "",
    cta: "",
    background: (
      <div
        id="contact-form"
        className="absolute h-full w-full left-0 top-0 origin-top rounded-md transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_0%,#000_0%)]"
      >
        <div className="absolute inset-0 z-50 flex justify-center items-center gap-5 p-5">
          <div className="max-w-sm w-full flex flex-col gap-2">
            <div className="text-5xl md:text-6xl font-semibold text-neutral-700 dark:text-neutral-300 w-full flex justify-start">
              <BlurIn duration={0.5} className="h-full">
                Get early access.
              </BlurIn>
            </div>
            <div className="w-full flex justify-center text-neutral-500 dark:text-neutral-400">
              Leave your email to get notified when we launch.
            </div>
            <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              *Your email will never be shared with anyone.
            </div>
            <div className="">
              <EmailForm />
            </div>
          </div>
        </div>

        <RetroGrid />
      </div>
    ),
  },
];

export function Bento() {
  return (
    <>
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </>
  );
}
