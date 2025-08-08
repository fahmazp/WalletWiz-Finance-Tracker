import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, NotepadText, Target } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Features() {
  const navigate = useNavigate()

  return (
    <section className="w-full py-20 flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-foreground">
        Take Control of Your <span className="text-primary">Finances</span>
      </h1>
      <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
        <span className="text-primary font-semibold">WalletWiz</span> helps you track expenses, manage income, and save smarter. Built for people who want to master their money with ease and simplicity.
      </p>

      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <Button size="lg" onClick={() => navigate("/signup")}>
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        <Button
          size="lg"
          variant="ghost"
          className="border-white/20 bg-accent "
          onClick={() => { navigate("/")
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          I already have an account
        </Button>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-4 w-full text-center text-white/80">
        <FeatureCard
        icon={<NotepadText className="h-6 w-6 text-foreground" />}
          title="Smart Expense Tracking"
          description="Effortlessly log every purchase. Categorize spending and find where your money really goes."
        />
        <FeatureCard
        icon={<BarChart3 className="h-6 w-6 text-foreground" />}
          title="Visual Insights"
          description="Charts and graphs to help you see trends, spot leaks, and adjust your spending habits."
        />
        <FeatureCard
        icon={<Target className="h-6 w-6 text-foreground" />}
          title="Budget Goals"
          description="Set monthly goals and get reminders when you’re about to overspend."
        />
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-green-400/90 border border-white/10 p-4 rounded-xl shadow-md hover:shadow-lg transition-all flex flex-col gap-2" style={{ boxShadow: '3px 3px #d9f99d, 6px 6px #09090b' }}>
      <div className="flex items-center justify-center">{icon}</div>
      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-black">{description}</p>
    </div>
  )
}
