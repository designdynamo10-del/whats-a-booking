import { Link } from "react-router-dom";
import { MessageCircle, ArrowLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Footer from "@/components/Footer";

const faqs = [
  {
    question: "What is WA Booker?",
    answer:
      "WA Booker is a WhatsApp-based booking and communication platform that helps businesses automate appointment scheduling, customer replies, and broadcast messaging — all through WhatsApp.",
  },
  {
    question: "How does the booking system work?",
    answer:
      "Customers can book appointments by sending a WhatsApp message to your business number. WA Booker automatically handles scheduling based on your available working hours and sends confirmations to both you and the customer.",
  },
  {
    question: "Do I need a special WhatsApp account?",
    answer:
      "Yes, WA Booker integrates with the WhatsApp Business API. During onboarding we'll guide you through connecting your WhatsApp Business number to the platform.",
  },
  {
    question: "What are auto-replies?",
    answer:
      "Auto-replies let you set up keyword-based automatic responses. When a customer sends a message containing specific keywords, WA Booker instantly replies with your pre-configured message — even outside working hours.",
  },
  {
    question: "Can I send bulk messages to my customers?",
    answer:
      "Yes! The Broadcast feature lets you send messages to multiple customers at once. This is great for promotions, announcements, or appointment reminders. All broadcasts comply with WhatsApp's messaging policies.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption and secure cloud infrastructure to protect your business data and customer information. See our Privacy Policy for full details.",
  },
  {
    question: "What plans are available?",
    answer:
      "We offer a free Starter plan for small businesses, a Pro plan with advanced features like auto-replies and broadcasts, and a Business plan with unlimited messaging and priority support. Visit our pricing section for details.",
  },
  {
    question: "Can I change or cancel my plan?",
    answer:
      "Yes, you can upgrade, downgrade, or cancel your plan at any time from the Dashboard Settings page. Changes take effect at the start of your next billing cycle.",
  },
  {
    question: "How do I get support?",
    answer:
      "You can reach our support team via the Contact Us page or by emailing support@wabooker.com. Pro and Business plan users also get access to priority support.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1">
        <div className="container max-w-3xl mx-auto py-16 px-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">
              Frequently Asked Questions
            </h1>
          </div>
          <p className="text-muted-foreground mb-10">
            Everything you need to know about WA Booker.
          </p>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 p-6 rounded-xl border border-border bg-muted/30 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Still have questions?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              Contact our team →
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
