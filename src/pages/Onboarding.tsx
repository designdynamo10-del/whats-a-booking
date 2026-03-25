import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, ArrowRight, Building2, Phone, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  { icon: Building2, title: "Business Info", desc: "Tell us about your business" },
  { icon: Phone, title: "WhatsApp", desc: "Your WhatsApp number" },
  { icon: Clock, title: "Hours", desc: "Set your working hours" },
];

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [phone, setPhone] = useState("");
  const [workingHoursStart, setWorkingHoursStart] = useState("09:00");
  const [workingHoursEnd, setWorkingHoursEnd] = useState("18:00");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFinish = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({ title: "Error", description: "Not authenticated", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("businesses").insert({
      user_id: user.id,
      business_name: businessName,
      business_type: businessType,
      phone,
      working_hours_start: workingHoursStart,
      working_hours_end: workingHoursEnd,
      plan: "free",
    });

    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      navigate("/dashboard");
    }
  };

  const canProceed = () => {
    if (step === 0) return businessName && businessType;
    if (step === 1) return phone;
    return true;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-lg shadow-elevated border-border">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">Set up your business</h1>
            <p className="text-sm text-muted-foreground mt-1">Step {step + 1} of 3</p>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {step === 0 && (
                <>
                  <div className="space-y-2">
                    <Label>Business Name</Label>
                    <Input placeholder="My Dental Clinic" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dentist">🦷 Dentist</SelectItem>
                        <SelectItem value="salon">💇 Salon</SelectItem>
                        <SelectItem value="gym">🏋️ Gym</SelectItem>
                        <SelectItem value="other">📦 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
              {step === 1 && (
                <div className="space-y-2">
                  <Label>WhatsApp Phone Number</Label>
                  <Input placeholder="+1 234 567 8900" value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" />
                  <p className="text-xs text-muted-foreground">Include country code. This number will receive customer messages.</p>
                </div>
              )}
              {step === 2 && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input type="time" value={workingHoursStart} onChange={(e) => setWorkingHoursStart(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input type="time" value={workingHoursEnd} onChange={(e) => setWorkingHoursEnd(e.target.value)} />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                Back
              </Button>
            )}
            {step < 2 ? (
              <Button variant="hero" className="flex-1" onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                Continue <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button variant="hero" className="flex-1" onClick={handleFinish} disabled={loading}>
                {loading ? "Setting up..." : "Launch Dashboard"} 🚀
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
