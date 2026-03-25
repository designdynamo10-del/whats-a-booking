import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Broadcast() {
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    // TODO: integrate with WhatsApp API edge function
    setTimeout(() => {
      setSending(false);
      toast({ title: "Broadcast sent!", description: "Message queued for delivery to all customers." });
      setMessage("");
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Broadcast</h1>
          <p className="text-sm text-muted-foreground">Send a message to all your customers</p>
        </div>

        <Card className="shadow-card border-border">
          <CardContent className="p-6 space-y-4">
            <div className="space-y-2">
              <Label>Message</Label>
              <Textarea
                placeholder="Hi! 🎉 We have a special offer this week..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground text-right">{message.length}/1000</p>
            </div>
            <Button variant="hero" onClick={handleSend} disabled={sending || !message.trim()}>
              <Send className="w-4 h-4 mr-2" />
              {sending ? "Sending..." : "Send Broadcast"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
