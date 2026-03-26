import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
      (e.target as HTMLFormElement).reset();
    }, 800);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
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
        <div className="container max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Contact Us</h1>
          <p className="text-muted-foreground text-lg mb-10">Have a question or need help? We'd love to hear from you.</p>

          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="Your name" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="you@example.com" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="How can we help?" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Tell us more..." rows={5} required />
                    </div>
                    <Button type="submit" variant="hero" className="w-full" disabled={loading}>
                      {loading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2 space-y-6">
              {[
                { icon: Mail, title: "Email", detail: "support@wabooker.com" },
                { icon: MapPin, title: "Location", detail: "Remote-first company" },
                { icon: Clock, title: "Support Hours", detail: "Mon–Fri, 9 AM – 6 PM" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
