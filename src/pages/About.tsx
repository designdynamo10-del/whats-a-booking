import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MessageCircle, Target, Heart, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border px-4 py-4">
        <div className="container max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">WA Booker</span>
          </Link>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back to Home</Link>
        </div>
      </header>

      <main className="flex-1 px-4 py-16">
        <div className="container max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">About WA Booker</h1>
          <p className="text-muted-foreground text-lg leading-relaxed mb-10">
            WA Booker helps small businesses automate appointment bookings, reminders, and customer communication through WhatsApp — the messaging platform your customers already use.
          </p>

          <div className="grid gap-8 md:grid-cols-3 mb-12">
            {[
              { icon: Target, title: "Our Mission", desc: "Empower small businesses to save time and grow by automating their WhatsApp communication." },
              { icon: Heart, title: "Customer First", desc: "We build tools that are simple, reliable, and designed around real business needs." },
              { icon: Zap, title: "Always Innovating", desc: "We continuously improve our platform to help you stay ahead and delight your customers." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-xl p-8">
            <h2 className="text-xl font-display font-semibold text-foreground mb-4">Why WhatsApp?</h2>
            <p className="text-muted-foreground leading-relaxed">
              With over 2 billion users worldwide, WhatsApp is where your customers already communicate. By meeting them on their preferred platform, you reduce no-shows, increase bookings, and build stronger relationships — all without requiring them to download another app.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
