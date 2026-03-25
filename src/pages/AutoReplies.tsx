import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, MessageSquare } from "lucide-react";

interface AutoReply {
  id?: string;
  keywords: string;
  reply_message: string;
  reply_type: string;
}

const defaultReplies: AutoReply[] = [
  { keywords: "hi, hello, hey", reply_message: "Hello! 👋 Welcome! Would you like to book an appointment? Reply with YES", reply_type: "greeting" },
  { keywords: "book, appointment, reserve", reply_message: "Sure! 📅 What date works for you? Reply with DD/MM", reply_type: "booking" },
  { keywords: "price, cost, how much", reply_message: "Please check our services at our website or reply with the service you're interested in!", reply_type: "faq" },
];

export default function AutoReplies() {
  const [replies, setReplies] = useState<AutoReply[]>([]);
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadReplies();
  }, []);

  const loadReplies = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: biz } = await supabase.from("businesses").select("id").eq("user_id", user.id).single();
    if (!biz) return;
    setBusinessId(biz.id);

    const { data } = await supabase.from("auto_replies").select("*").eq("business_id", biz.id);
    if (data && data.length > 0) {
      setReplies(data);
    } else {
      setReplies(defaultReplies);
    }
  };

  const addReply = () => {
    setReplies([...replies, { keywords: "", reply_message: "", reply_type: "custom" }]);
  };

  const removeReply = (index: number) => {
    setReplies(replies.filter((_, i) => i !== index));
  };

  const updateReply = (index: number, field: keyof AutoReply, value: string) => {
    const updated = [...replies];
    updated[index] = { ...updated[index], [field]: value };
    setReplies(updated);
  };

  const saveReplies = async () => {
    if (!businessId) return;
    setLoading(true);

    // Delete existing
    await supabase.from("auto_replies").delete().eq("business_id", businessId);

    // Insert new
    const toInsert = replies.filter((r) => r.keywords && r.reply_message).map((r) => ({
      business_id: businessId,
      keywords: r.keywords,
      reply_message: r.reply_message,
      reply_type: r.reply_type,
    }));

    const { error } = await supabase.from("auto_replies").insert(toInsert);
    setLoading(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved!", description: "Auto replies updated successfully." });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Auto Replies</h1>
            <p className="text-sm text-muted-foreground">Configure keyword-based automatic responses</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={addReply}>
              <Plus className="w-4 h-4 mr-1" /> Add Rule
            </Button>
            <Button variant="hero" size="sm" onClick={saveReplies} disabled={loading}>
              {loading ? "Saving..." : "Save All"}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {replies.map((reply, i) => (
            <Card key={i} className="shadow-card border-border">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-xs font-medium text-muted-foreground uppercase">{reply.reply_type}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeReply(i)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Keywords (comma-separated)</Label>
                    <Input
                      placeholder="hi, hello, hey"
                      value={reply.keywords}
                      onChange={(e) => updateReply(i, "keywords", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Reply Message</Label>
                    <Textarea
                      placeholder="Hello! 👋 How can I help you?"
                      value={reply.reply_message}
                      onChange={(e) => updateReply(i, "reply_message", e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
