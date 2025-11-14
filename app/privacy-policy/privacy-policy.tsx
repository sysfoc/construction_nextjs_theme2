"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isPageVisible } from "@/lib/api/pageVisibility";
import { Shield } from "lucide-react";
import Loader from "../components/General/Loader";


interface PrivacyPolicy {
  _id: string;
  title: string;
  content: string;
  lastUpdated: string;
}

export default function PrivacyPolicyPage() {
  const [privacyPolicy, setPrivacyPolicy] = useState<PrivacyPolicy | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkVisibility = async () => {
      const visible = await isPageVisible("privacy-policy");
      setIsVisible(visible);
      if (!visible) {
        router.push("/not-found");
      }
    };
    checkVisibility();
  }, [router]);

  useEffect(() => {
    const fetchPrivacyPolicy = async () => {
      try {
        const response = await fetch("/api/privacy-policy");
        const data = await response.json();
        setPrivacyPolicy(data);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacyPolicy();
  }, []);

  if (!isVisible) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex items-start mt-20 justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background px-6 py-12">
      <section className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-6 h-6 text-primary" />
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
              {privacyPolicy?.title || "Privacy Policy"}
            </h1>
          </div>
          {privacyPolicy && (
            <p className="text-sm text-gray-500">
              Last updated:{" "}
              {new Date(privacyPolicy.lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Content */}
        {privacyPolicy ? (
          <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: privacyPolicy.content }}
              />
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-gray-500">
              No privacy policy available at this time.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
