import { useEffect, useState, useCallback } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Smartphone, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

const API_URL = "https://wa-booker.onrender.com";

interface SessionState {
  qr: string;
  connected: boolean;
}

export default function WhatsApp() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getAuth = async () => {
    const { data } = await supabase.auth.getSession();
    return {
      token: data.session?.access_token,
      userId: data.session?.user?.id,
    };
  };

  const buildUrl = (userId: string) => `${API_URL}?userId=${encodeURIComponent(userId)}`;

  const fetchState = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const { token, userId } = await getAuth();
      if (!token || !userId) return;
      const res = await fetch(buildUrl(userId), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        if (res.status === 404) {
          setSession(null);
          setNotFound(true);
          return;
        }
        throw new Error("Failed to fetch state");
      }
      const data = await res.json();
      setNotFound(false);
      setSession({ qr: data.qr ?? "", connected: !!data.connected });
    } catch (e) {
      if (!silent) toast.error("Could not reach WhatsApp service");
    } finally {
      if (!silent) setLoading(false);
    }
  }, []);

  const createSession = async () => {
    setActionLoading(true);
    try {
      const { token, userId } = await getAuth();
      if (!token || !userId) return;
      const res = await fetch(buildUrl(userId), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to create session");
      toast.success("Session started, scan the QR code");
      await fetchState();
    } catch (e) {
      toast.error("Could not start WhatsApp session");
    } finally {
      setActionLoading(false);
    }
  };

  const disconnect = async () => {
    setActionLoading(true);
    try {
      const { token, userId } = await getAuth();
      if (!token || !userId) return;
      const res = await fetch(buildUrl(userId), {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to disconnect");
      toast.success("Disconnected");
      setSession(null);
      setNotFound(true);
    } catch (e) {
      toast.error("Could not disconnect");
    } finally {
      setActionLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, [fetchState]);

  // Poll while session exists but is not yet connected
  useEffect(() => {
    if (!session || session.connected) return;
    const interval = setInterval(() => {
      fetchState(true);
    }, 2000);
    return () => clearInterval(interval);
  }, [session, fetchState]);

  const stateBadge = () => {
    if (loading) return null;
    if (!session) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
          <XCircle className="w-3.5 h-3.5" />
          Disconnected
        </span>
      );
    }
    if (session.connected) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
          <CheckCircle2 className="w-3.5 h-3.5" />
          Connected
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        Connecting
      </span>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">WhatsApp Connection</h1>
          <p className="text-sm text-muted-foreground">Link your WhatsApp account to start receiving bookings</p>
        </div>

        <Card className="shadow-card border-border">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Status</p>
                  <p className="text-xs text-muted-foreground">Live connection state</p>
                </div>
              </div>
              {stateBadge()}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : !session || notFound ? (
              <div className="text-center py-8 space-y-4">
                <p className="text-sm text-muted-foreground">No active session</p>
                <Button onClick={createSession} disabled={actionLoading} variant="hero">
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Start WhatsApp session
                </Button>
              </div>
            ) : session.connected ? (
              <div className="space-y-4">
                <Alert>
                  <CheckCircle2 className="w-4 h-4" />
                  <AlertTitle>WhatsApp connected</AlertTitle>
                  <AlertDescription>
                    Your WhatsApp is linked. You can now receive and send messages.
                  </AlertDescription>
                </Alert>
                <Button variant="destructive" onClick={disconnect} disabled={actionLoading}>
                  {actionLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-4 p-6 bg-muted/30 rounded-lg border border-border">
                  {session.qr ? (
                    <>
                      <div className="bg-background p-4 rounded-lg">
                        <QRCodeSVG value={session.qr} size={220} />
                      </div>
                      <div className="text-center max-w-sm">
                        <p className="text-sm font-medium text-foreground mb-1">Scan with WhatsApp</p>
                        <p className="text-xs text-muted-foreground">
                          Open WhatsApp → Settings → Linked Devices → Link a Device
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">Waiting for QR code…</p>
                    </div>
                  )}
                </div>
                <Button variant="outline" onClick={() => fetchState()} disabled={actionLoading}>
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
