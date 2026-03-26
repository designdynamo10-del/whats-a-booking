import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

export default function Privacy() {
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
          <h1 className="text-3xl font-display font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: March 26, 2026</p>

          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly, including your name, email address, phone number, and business details when you create an account. We also collect WhatsApp message metadata to provide our booking automation services.</p>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process bookings and send automated messages on your behalf</li>
            <li>Send you service-related notifications</li>
            <li>Respond to your requests and support needs</li>
          </ul>

          <h2>3. Data Sharing</h2>
          <p>We do not sell your personal information. We may share data with third-party service providers (such as WhatsApp/Meta) solely to deliver our services. All providers are bound by data protection agreements.</p>

          <h2>4. Data Security</h2>
          <p>We implement industry-standard security measures to protect your data, including encryption in transit and at rest. However, no method of transmission over the internet is 100% secure.</p>

          <h2>5. Data Retention</h2>
          <p>We retain your data for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us.</p>

          <h2>6. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal data. You may also object to processing or request data portability. Contact us at support@wabooker.com to exercise these rights.</p>

          <h2>7. Cookies</h2>
          <p>We use essential cookies to maintain your session and preferences. We do not use tracking or advertising cookies.</p>

          <h2>8. Changes to This Policy</h2>
          <p>We may update this policy from time to time. We will notify you of significant changes via email or in-app notification.</p>

          <h2>9. Contact</h2>
          <p>For privacy-related questions, contact us at <a href="mailto:support@wabooker.com" className="text-primary">support@wabooker.com</a>.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
