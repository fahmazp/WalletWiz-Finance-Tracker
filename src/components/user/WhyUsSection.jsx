import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

export default function WhyWalletWiz() {
  return (
    <section className="pt-4 w-full overflow-hidden pb-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Why <span className="text-primary">WalletWiz</span>?
        </h2>
        <p className="text-muted-foreground max-w-2xl mb-10">
          We’re not just another expense app — WalletWiz is your personal money assistant. 💸
        </p>

        <div className="grid md:grid-cols-1 gap-16 w-full">
          <FeatureBlock
            image="/images/undraw_progress.svg"
            title="Track Instantly"
            description="Every income and expense you add updates your dashboard in real-time. No waiting, no stress."
            reverse={false}
          />
          <FeatureBlock
            image="/images/undraw_investing.svg"
            title="Visualize Everything"
            description="Know where your money flows. Pie charts and bar graphs help you spot trends and leaks fast."
            reverse={true}
          />
          <FeatureBlock
            image="/images/undraw_savings.svg"
            title="Smash Your Goals"
            description="Set financial goals and get friendly nudges to keep you on track."
            reverse={false}
          />
        </div>
      </div>
    </section>
  )
}

function FeatureBlock({ image, title, description, reverse }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: reverse ? 100 : -100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col md:flex-row items-center justify-between gap-10 w-full max-w-5xl mx-auto ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <img
        src={image}
        alt={title}
        className="w-full max-w-full md:w-1/2 max-h-[300px] object-contain"
      />
      <div className="text-left max-w-md">
        <h3 className="text-2xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-md">{description}</p>
      </div>
    </motion.div>
  )
}
