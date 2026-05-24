import { useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

import { Header } from "./components/Header";
import { ShortenedPopup } from "./components/ShortenedPopup";
import { UrlForm } from "./components/UrlForm";

export function App() {
  const [url, setUrl] = useState("");

  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  const [showPopup, setShowPopup] = useState(false);

  const [loading, setLoading] = useState(false);

  const [shortenedUrl, setShortenedUrl] = useState("");

  async function handleSubmit(e: JSX.TargetedEvent<HTMLFormElement, Event>) {
    e.preventDefault();

    const backendUrl = "http://localhost:8080";

    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/urls`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          url,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();

      setShortenedUrl(`${backendUrl}/${data.short_code}`);

      setShowPopup(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-[#f5f5f5] antialiased">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
        <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-2xl shadow-black/40">
          <Header />

          <UrlForm
            url={url}
            setUrl={setUrl}
            days={days}
            setDays={setDays}
            hours={hours}
            setHours={setHours}
            minutes={minutes}
            setMinutes={setMinutes}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <ShortenedPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        shortenedUrl={shortenedUrl}
      />
    </div>
  );
}
