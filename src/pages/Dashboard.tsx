import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CalendarCheck, MessageSquare, Users, TrendingUp, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useWhatsAppStatus } from "@/hooks/useWhatsAppStatus";

interface Stats {
  totalBookings: number;
  upcoming: number;
  messagesIn: number;
  messagesOut: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalBookings: 0,
    upcoming: 0,
    messagesIn: 0,
    messagesOut: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const { isAuthed, loading: waLoading } = useWhatsAppStatus();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Get business
    const { data: biz } = await supabase.from("businesses").select("id").eq("user_id", user.id).single();
    if (!biz) return;

    // Stats
    const { count: totalBookings } = await supabase.from("bookings").select("*", { count: "exact", head: true }).eq("business_id", biz.id);
    const { count: upcoming } = await supabase.from("bookings").select("*", { count: "exact", head: true }).eq("business_id", biz.id).gte("appointment_date", new Date().toISOString().split("T")[0]);
    const { count: messagesIn } = await supabase.from("messages").select("*", { count: "exact", head: true }).eq("business_id", biz.id).eq("direction", "incoming");
    const { count: messagesOut } = await supabase.from("messages").select("*", { count: "exact", head: true }).eq("business_id", biz.id).eq("direction", "outgoing");

    setStats({
      totalBookings: totalBookings || 0,
      upcoming: upcoming || 0,
      messagesIn: messagesIn || 0,
      messagesOut: messagesOut || 0,
    });

    // Recent bookings
    const { data: bookings } = await supabase
      .from("bookings")
      .select("*")
      .eq("business_id", biz.id)
      .order("appointment_date", { ascending: true })
      .limit(5);
    setRecentBookings(bookings || []);
  };

  const statCards = [
    { label: "Total Bookings", value: stats.totalBookings, icon: CalendarCheck, color: "text-primary" },
    { label: "Upcoming", value: stats.upcoming, icon: TrendingUp, color: "text-wa-teal" },
    { label: "Messages In", value: stats.messagesIn, icon: MessageSquare, color: "text-primary" },
    { label: "Messages Out", value: stats.messagesOut, icon: Users, color: "text-wa-teal" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your WhatsApp bookings</p>
        </div>

        {!waLoading && !isAuthed && (
          <Alert variant="destructive">
            <AlertTriangle className="w-4 h-4" />
            <AlertTitle>WhatsApp not connected</AlertTitle>
            <AlertDescription className="flex items-center justify-between gap-3 flex-wrap">
              <span>Connect your WhatsApp to start receiving bookings and sending messages.</span>
              <Button asChild size="sm" variant="outline">
                <Link to="/dashboard/whatsapp">Connect now</Link>
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className="shadow-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <s.icon className={`w-5 h-5 ${s.color}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-card border-border">
          <CardContent className="p-5">
            <h2 className="font-display font-semibold text-foreground mb-4">Upcoming Appointments</h2>
            {recentBookings.length === 0 ? (
              <p className="text-sm text-muted-foreground py-8 text-center">No bookings yet. They'll appear here when customers book via WhatsApp.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-muted-foreground font-medium">Customer</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Date</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Time</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((b) => (
                      <tr key={b.id} className="border-b border-border last:border-0">
                        <td className="py-3 text-foreground">{b.customer_phone}</td>
                        <td className="py-3 text-foreground">{b.appointment_date}</td>
                        <td className="py-3 text-foreground">{b.appointment_time}</td>
                        <td className="py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            b.status === "confirmed"
                              ? "bg-secondary text-secondary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}>
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
