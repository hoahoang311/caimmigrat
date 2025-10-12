"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsletterSubscriber } from "@/lib/supabase";
import { Download, Mail } from "lucide-react";
import { useState } from "react";

interface SubscribersTabProps {
  subscribers: NewsletterSubscriber[];
}

export default function SubscribersTab({ subscribers }: SubscribersTabProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const response = await fetch("/api/admin/export-subscribers");

      if (!response.ok) {
        throw new Error("Failed to export subscribers");
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a URL for the blob and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `subscribers-${new Date().toISOString().split("T")[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export subscribers");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-green-600" />
              <span>Newsletter Subscribers</span>
            </CardTitle>
            <CardDescription>All active newsletter subscribers</CardDescription>
          </div>
          <Button
            onClick={handleExport}
            disabled={isExporting || subscribers.length === 0}
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Export Excel"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto flex-1">
        <div className="space-y-4">
          {subscribers.map((subscriber) => (
            <div key={subscriber.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{subscriber.email}</h4>
                <span className="text-xs text-gray-500">
                  {subscriber.subscribed_at
                    ? new Date(subscriber.subscribed_at).toLocaleDateString()
                    : ""}
                </span>
              </div>
              {subscriber.preferred_topics && (
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Interested in:</p>
                  <div className="flex flex-wrap gap-1">
                    {subscriber.preferred_topics
                      .split(",")
                      .map((topic: string, index: number) => (
                        <span
                          key={index}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full"
                        >
                          {topic.trim()}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          {subscribers.length === 0 && (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No subscribers yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
