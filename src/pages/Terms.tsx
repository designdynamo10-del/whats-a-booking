import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

export default function Terms() {
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
        <div className="container max-w-3xl mx-auto prose prose-sm prose-neutral dark:prose-invert">
          <h1 className="text-3xl font-display font-bold text-foreground">Terms & Conditions</h1>
          <p className="text-muted-foreground">Last updated: March 26, 2026</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using WA Booker ("Service"), you agree to be bound by these Terms & Conditions. If you do not agree, do not use the Service.</p>

          <h2>2. Description of Service</h2>
          <p>WA Booker provides WhatsApp-based booking automation, auto-reply management, broadcast messaging, and appointment reminder services for businesses.</p>

          <h2>3. Account Registration</h2>
          <p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>

          <h2>4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the Service for spam or unsolicited messaging</li>
            <li>Violate WhatsApp's Terms of Service or Business Policy</li>
            <li>Transmit harmful, illegal, or offensive content</li>
            <li>Attempt to access other users' accounts or data</li>
          </ul>

          <h2>5. Payments & Billing</h2>
          <p>Paid plans are billed monthly or annually. All fees are non-refundable unless otherwise stated. We reserve the right to change pricing with 30 days' notice.</p>

          <h2>6. Service Availability</h2>
          <p>We strive for high availability but do not guarantee uninterrupted access. We are not liable for downtime caused by third-party services (including WhatsApp/Meta).</p>

          <h2>7. Intellectual Property</h2>
          <p>All content, trademarks, and technology of WA Booker are owned by us. You retain ownership of your business data and content uploaded to the platform.</p>

          <h2>8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, WA Booker shall not be liable for any indirect, incidental, or consequential damages arising from your use of the Service.</p>

          <h2>9. Termination</h2>
          <p>We may suspend or terminate your account if you violate these terms. You may cancel your account at any time through the dashboard settings.</p>

          <h2>10. Changes to Terms</h2>
          <p>We may modify these terms at any time. Continued use of the Service after changes constitutes acceptance of the updated terms.</p>

          <h2>11. Contact</h2>
          <p>For questions about these terms, contact us at <a href="mailto:support@wabooker.com" className="text-primary">support@wabooker.com</a>.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
