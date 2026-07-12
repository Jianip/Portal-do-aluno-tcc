"use client";
import { Download, MoreVertical, Share2, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
export function InstallApp() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null),
    [ios, setIos] = useState(false),
    [visible, setVisible] = useState(true),
    [showHelp, setShowHelp] = useState(false);
  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        (navigator as Navigator & { standalone?: boolean }).standalone);
    if (standalone) {
      setVisible(false);
      return;
    }
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const handler = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallPromptEvent);
      setVisible(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  async function install() {
    if (!prompt) {
      setShowHelp(true);
      return;
    }
    await prompt.prompt();
    const result = await prompt.userChoice;
    if (result.outcome === "accepted") setVisible(false);
    setPrompt(null);
  }
  if (!visible) return null;
  return (
    <section className="card relative mb-7 overflow-hidden border-blue-200 bg-gradient-to-r from-blue-50 to-violet-50 p-5 dark:from-blue-950/50 dark:to-violet-950/50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white">
          <Smartphone />
        </span>
        <div className="flex-1">
          <h2 className="font-black">Instale o Portal Sanico Teles</h2>
          <p className="muted mt-1 text-sm">
            Acesse rapidamente pela tela inicial do seu celular.
          </p>
        </div>
        {ios ? (
          <div className="rounded-xl border bg-white/70 px-4 py-3 text-sm dark:bg-slate-900/70">
            <Share2 className="mr-2 inline text-blue-600" size={17} />
            Toque em <b>Compartilhar</b> e depois em{" "}
            <b>Adicionar à Tela de Início</b>.
          </div>
        ) : (
          <button onClick={install} className="btn btn-primary">
            <Download size={17} />
            Instalar aplicativo
          </button>
        )}
      </div>
      {showHelp && !ios && (
        <div className="mt-4 rounded-2xl border border-blue-200 bg-white/80 p-4 text-sm dark:bg-slate-900/80">
          <p className="font-bold">Para instalar pelo Google Chrome:</p>
          <ol className="muted mt-2 space-y-1">
            <li>1. Toque nos três pontos <MoreVertical className="inline" size={16} /> no canto do navegador.</li>
            <li>2. Toque em <b>Instalar app</b> ou <b>Adicionar à tela inicial</b>.</li>
            <li>3. Confirme tocando em <b>Instalar</b>.</li>
          </ol>
        </div>
      )}
    </section>
  );
}
