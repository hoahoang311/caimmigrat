"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn, getCalendlyLink } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import * as React from "react";

export type ConsultationDuration = 30 | 60;
export type ConsultationOfficer = "mou" | "richard";

export interface BookingSelection {
  duration: ConsultationDuration;
  officer: ConsultationOfficer;
}

interface BookingPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function BookingPopup({
  open,
  onOpenChange,
  title = "Book a Consultation",
  description = "Select your consultation preferences",
}: BookingPopupProps) {
  const [step, setStep] = React.useState<1 | 2>(1);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [duration, setDuration] = React.useState<ConsultationDuration | null>(
    null
  );
  const [officer, setOfficer] = React.useState<ConsultationOfficer | null>(
    null
  );

  // Reset state when dialog closes
  React.useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => {
        setStep(1);
        setDuration(null);
        setOfficer(null);
        setIsTransitioning(false);
      }, 200); // Delay to allow closing animation
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleDurationSelect = (selectedDuration: ConsultationDuration) => {
    setDuration(selectedDuration);
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(2);
      setIsTransitioning(false);
    }, 150);
  };

  const handleOfficerSelect = (selectedOfficer: ConsultationOfficer) => {
    setOfficer(selectedOfficer);
  };

  const handleComplete = () => {
    if (duration && officer) {
      const now = new Date();

      const calendly = getCalendlyLink(duration, officer, now);

      console.log(now);
      console.log(now.getUTCMonth());
      window.open(calendly, "_blank", "noopener,noreferrer");
      onOpenChange(false);
    }
  };

  const handleBack = () => {
    setIsTransitioning(true);
    setOfficer(null);
    setTimeout(() => {
      setStep(1);
      setIsTransitioning(false);
    }, 150);
  };

  // https://calendly.com/richard-icbmlaw/30min?back=1&month=2025-10

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="py-6 overflow-hidden">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                  step === 1
                    ? "bg-primary text-primary-foreground scale-110"
                    : "bg-primary/20 text-primary scale-100"
                )}
              >
                1
              </div>
              <div
                className={cn(
                  "h-[2px] w-16 transition-all duration-300",
                  step === 2 ? "bg-primary" : "bg-border"
                )}
              />
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all duration-300",
                  step === 2
                    ? "bg-primary text-primary-foreground scale-110"
                    : "bg-muted text-muted-foreground scale-100"
                )}
              >
                2
              </div>
            </div>
          </div>

          {/* Content Container with fixed min-height for smooth transitions */}
          <div className="relative min-h-[308px] box-border">
            {/* Step 1: Duration Selection */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-300 ease-in-out",
                step === 1 && !isTransitioning
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : step === 1 && isTransitioning
                  ? "opacity-0 -translate-x-4 pointer-events-none"
                  : "opacity-0 translate-x-4 pointer-events-none"
              )}
            >
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-center mb-6">
                  Select Consultation Duration
                </h3>
                <div className="grid gap-4">
                  <button
                    onClick={() => handleDurationSelect(30)}
                    className={cn(
                      "group relative flex items-center justify-between p-6 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5",
                      duration === 30
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-lg">30 Minutes</p>
                        <p className="text-sm text-muted-foreground">
                          Quick consultation session
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">$129</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleDurationSelect(60)}
                    className={cn(
                      "group relative flex items-center justify-between p-6 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5",
                      duration === 60
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-lg">60 Minutes</p>
                        <p className="text-sm text-muted-foreground">
                          Extended consultation session
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">$199</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Step 2: Officer Selection */}
            <div
              className={cn(
                "absolute inset-0 transition-all duration-300 ease-in-out",
                step === 2 && !isTransitioning
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : step === 2 && isTransitioning
                  ? "opacity-0 translate-x-4 pointer-events-none"
                  : "opacity-0 -translate-x-4 pointer-events-none"
              )}
            >
              <div className="space-y-4">
                <h3 className="text-base font-semibold text-center mb-6">
                  Select Immigration Officer
                </h3>
                <div className="grid gap-4">
                  <button
                    onClick={() => handleOfficerSelect("mou")}
                    className={cn(
                      "group relative flex items-center justify-between p-6 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5",
                      officer === "mou"
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-lg">
                          Moumita Chakraborty
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Licensed Immigration Consultant
                        </p>
                      </div>
                    </div>
                    {officer === "mou" && (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <svg
                          className="h-3 w-3 text-primary-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>

                  <button
                    onClick={() => handleOfficerSelect("richard")}
                    className={cn(
                      "group relative flex items-center justify-between p-6 rounded-lg border-2 transition-all hover:border-primary hover:bg-primary/5",
                      officer === "richard"
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    )}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <User className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-lg">Richard Brown</p>
                        <p className="text-sm text-muted-foreground">
                          Licensed Immigration Consultant
                        </p>
                      </div>
                    </div>
                    {officer === "richard" && (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                        <svg
                          className="h-3 w-3 text-primary-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleComplete}
                    disabled={!officer}
                    className="gap-2"
                  >
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
