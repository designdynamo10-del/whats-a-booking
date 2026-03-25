import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageSquare,
  CalendarCheck,
  Bell,
  Zap,
  Users,
  Send,
  Check,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const features = [
  {
    icon: MessageSquare,
    title: "Auto Replies",
    desc: "Instantly respond to customer messages with smart keyword-based replies.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    desc: "Customers book appointments directly through WhatsApp chat.",
  },
  {
    icon: Bell,
    title: "Reminders",
    desc: "Automatic 24h and 2h reminders so customers never miss appointments.",
  },
  {
    icon: Send,
    title: "Broadcast",
    desc: "Send promotions and updates to all your customers at once.",
  },
  {
    icon: Zap,
    title: "Instant Setup",
    desc: "Connect your WhatsApp number and start in under 5 minutes.",
  },
  {
    icon: Users,
    title: "Dashboard",
    desc: "Track bookings, messages, and customer activity in real-time.",
  },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    features: ["20 messages/month", "5 bookings/month", "Auto replies", "Basic dashboard"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited messages",
      "Unlimited bookings",
      "Auto replies & reminders",
      "Broadcast messaging",
      "CSV export",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">WA Booker</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-6">
              🚀 Built for small businesses
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Turn WhatsApp into your
              <br />
              <span className="text-gradient">booking machine</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Auto-reply to customers, book appointments, and send reminders —
              all through WhatsApp. Perfect for dentists, salons, and gyms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/signup">
                  Start Free <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="#features">See How It Works</Link>
              </Button>
            </div>
          </motion.div>

          {/* Chat mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 max-w-md mx-auto"
          >
            <div className="rounded-2xl shadow-elevated bg-card border border-border p-4 space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <div className="w-8 h-8 rounded-full gradient-hero" />
                <div>
                  <p className="text-sm font-medium text-foreground">Your Business</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] text-sm text-foreground">
                  Hi, I'd like to book an appointment
                </div>
                <div className="bg-primary rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%] ml-auto text-sm text-primary-foreground">
                  Hello! 👋 Sure! What date works for you? Reply with DD/MM
                </div>
                <div className="bg-muted rounded-xl rounded-tl-sm px-3 py-2 max-w-[80%] text-sm text-foreground">
                  25/04
                </div>
                <div className="bg-primary rounded-xl rounded-tr-sm px-3 py-2 max-w-[80%] ml-auto text-sm text-primary-foreground">
                  ✅ Booked for April 25! We'll remind you 24h before.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 gradient-subtle">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything you need
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Automate your customer communication and never miss a booking again.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Card className="shadow-card hover:shadow-elevated transition-shadow border-border bg-card h-full">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-4">
                      <f.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Simple pricing
            </h2>
            <p className="text-muted-foreground">Start free, upgrade when you need more.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`shadow-card border-border ${
                  plan.highlighted
                    ? "ring-2 ring-primary shadow-elevated"
                    : ""
                }`}
              >
                <CardContent className="p-8">
                  {plan.highlighted && (
                    <span className="inline-block px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium mb-4">
                      Most Popular
                    </span>
                  )}
                  <h3 className="font-display text-xl font-bold text-foreground">{plan.name}</h3>
                  <div className="mt-2 mb-6">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground text-sm">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-sm text-foreground">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.highlighted ? "hero" : "hero-outline"}
                    className="w-full"
                    asChild
                  >
                    <Link to="/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-hero flex items-center justify-center">
              <MessageCircle className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-display font-semibold text-sm text-foreground">WA Booker</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © 2026 WA Booker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
