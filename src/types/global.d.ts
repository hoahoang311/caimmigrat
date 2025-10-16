interface Window {
  gtag?: (
    command: "event" | "config" | "set" | "js",
    eventNameOrConfigId: string,
    eventParams?: { [key: string]: unknown }
  ) => void;
}
