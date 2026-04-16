import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const API_URL = "https://wa-booker.onrender.com";

type WAState = "connecting" | "connected" | "disconnected";

export function useWhatsAppStatus() {
  const [state, setState] = useState<WAState | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;
        if (!token) return;
        const res = await fetch(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const json = await res.json();
        if (mounted) setState(json.state);
      } catch {
        // ignore
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return { state, loading, isAuthed: state === "connected" };
}
