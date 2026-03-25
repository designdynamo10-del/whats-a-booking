import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Download } from "lucide-react";

export default function Bookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [businessId, setBusinessId] = useState<string | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: biz } = await supabase.from("businesses").select("id").eq("user_id", user.id).single();
    if (!biz) return;
    setBusinessId(biz.id);
    const { data } = await supabase.from("bookings").select("*").eq("business_id", biz.id).order("appointment_date", { ascending: false });
    setBookings(data || []);
  };

  const exportCSV = () => {
    if (!bookings.length) return;
    const headers = ["Customer Phone", "Date", "Time", "Status"];
    const rows = bookings.map((b) => [b.customer_phone, b.appointment_date, b.appointment_time, b.status]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bookings.csv";
    a.click();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-foreground">Bookings</h1>
            <p className="text-sm text-muted-foreground">All customer appointments</p>
          </div>
          <Button variant="outline" size="sm" onClick={exportCSV} disabled={!bookings.length}>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>

        <Card className="shadow-card border-border">
          <CardContent className="p-0">
            {bookings.length === 0 ? (
              <p className="text-sm text-muted-foreground py-12 text-center">No bookings yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 text-muted-foreground font-medium">Customer</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Time</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                        <td className="p-4 text-foreground">{b.customer_phone}</td>
                        <td className="p-4 text-foreground">{b.appointment_date}</td>
                        <td className="p-4 text-foreground">{b.appointment_time}</td>
                        <td className="p-4">
                          <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
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
