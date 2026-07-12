"use client";
import Image from "next/image";
import {
  Bell,
  CalendarDays,
  Camera,
  Mail,
  Phone,
  RotateCcw,
  Save,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ChangePassword } from "@/components/change-password";
type Profile = {
  displayName: string;
  email: string;
  phone: string;
  bio: string;
  avatar: string;
  notifications: Record<string, boolean>;
};
const notificationLabels = [
  "Avisos importantes",
  "Lembretes de eventos",
  "Novas notícias",
  "Alterações de horário",
];
export function ProfileCustomizer({
  userId,
  initialName,
  initialEmail,
}: {
  userId: string;
  initialName: string;
  initialEmail: string;
}) {
  const key = `sanico-profile:${userId}`;
  const defaults: Profile = useMemo(
    () => ({
      displayName: initialName,
      email: initialEmail,
      phone: "(11) 99999-2026",
      bio: "Estudante do 3º ano apaixonado por tecnologia e novos aprendizados.",
      avatar: "",
      notifications: Object.fromEntries(
        notificationLabels.map((label, index) => [label, index < 3]),
      ),
    }),
    [initialEmail, initialName],
  );
  const [profile, setProfile] = useState(defaults);
  const [loaded, setLoaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) setProfile({ ...defaults, ...JSON.parse(saved) });
    } catch {
      toast.error("Não foi possível carregar suas preferências.");
    }
    setLoaded(true);
  }, [defaults, key]);
  function update<K extends keyof Profile>(field: K, value: Profile[K]) {
    setProfile((current) => ({ ...current, [field]: value }));
  }
  function avatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Escolha um arquivo de imagem.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => update("avatar", String(reader.result));
    reader.readAsDataURL(file);
  }
  function save() {
    if (!profile.displayName.trim()) {
      toast.error("Informe seu nome de exibição.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
      toast.error("Informe um e-mail válido.");
      return;
    }
    localStorage.setItem(key, JSON.stringify(profile));
    window.dispatchEvent(
      new CustomEvent("profile-updated", { detail: { userId, profile } }),
    );
    toast.success("Perfil personalizado com sucesso.");
  }
  function reset() {
    if (!confirm("Restaurar as informações padrão do perfil?")) return;
    setProfile(defaults);
    localStorage.removeItem(key);
    window.dispatchEvent(
      new CustomEvent("profile-updated", {
        detail: { userId, profile: defaults },
      }),
    );
    toast.success("Perfil restaurado.");
  }
  if (!loaded) return <div className="card h-72 animate-pulse" />;
  const initials = profile.displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      <aside className="card h-fit p-6 text-center">
        <div className="relative mx-auto h-32 w-32">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-4xl font-black text-white">
            {profile.avatar ? (
              <Image
                src={profile.avatar}
                alt="Foto do perfil"
                width={128}
                height={128}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : (
              initials
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 rounded-full bg-[var(--card)] p-3 text-blue-600 shadow-lg"
              aria-label="Trocar foto"
            >
              <Camera size={18} />
            </button>
          </div>
          <input
            ref={fileRef}
            onChange={avatarChange}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
          />
        </div>
        <h2 className="mt-5 text-xl font-black">{profile.displayName}</h2>
        <p className="muted text-sm">3º ano · Mat. 202600184</p>
        {profile.bio && (
          <p className="muted mt-3 text-sm leading-5">{profile.bio}</p>
        )}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
            <Users className="mx-auto" />
            <b className="mt-1 block">2</b>
            <small>Clubes</small>
          </div>
          <div className="rounded-xl bg-violet-50 p-3 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300">
            <CalendarDays className="mx-auto" />
            <b className="mt-1 block">3</b>
            <small>Eventos</small>
          </div>
        </div>
        <button
          onClick={() => fileRef.current?.click()}
          className="btn mt-4 w-full border"
        >
          <Camera size={16} />
          Escolher foto
        </button>
        <p className="muted mt-2 text-xs">PNG, JPG ou WebP · máximo 2 MB</p>
      </aside>
      <section className="space-y-6">
        <div className="card p-6">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-blue-50 p-2 text-blue-600 dark:bg-blue-950">
              <UserRound />
            </span>
            <div>
              <h2 className="text-xl font-black">Personalização</h2>
              <p className="muted mt-1 text-sm">
                Escolha como suas informações aparecem no portal.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-bold">
              Nome de exibição
              <input
                value={profile.displayName}
                onChange={(event) => update("displayName", event.target.value)}
                className="input mt-2"
                maxLength={60}
              />
            </label>
            <label className="text-sm font-bold">
              <Mail className="mr-1 inline" size={15} />
              E-mail
              <input
                value={profile.email}
                onChange={(event) => update("email", event.target.value)}
                className="input mt-2"
                type="email"
              />
            </label>
            <label className="text-sm font-bold">
              <Phone className="mr-1 inline" size={15} />
              Telefone
              <input
                value={profile.phone}
                onChange={(event) => update("phone", event.target.value)}
                className="input mt-2"
                placeholder="(00) 00000-0000"
              />
            </label>
            <label className="text-sm font-bold">
              Biografia curta
              <textarea
                value={profile.bio}
                onChange={(event) => update("bio", event.target.value)}
                className="input mt-2 min-h-24 resize-none"
                maxLength={180}
              />
              <span className="muted mt-1 block text-right text-xs">
                {profile.bio.length}/180
              </span>
            </label>
          </div>
          <div className="mt-6 rounded-2xl border bg-black/[.02] p-4">
            <p className="flex items-center gap-2 text-sm font-bold">
              <ShieldCheck className="text-emerald-600" size={18} />
              Dados acadêmicos protegidos
            </p>
            <div className="muted mt-3 grid gap-3 text-sm sm:grid-cols-3">
              <span>
                <b className="block text-xs">Matrícula</b>202600184
              </span>
              <span>
                <b className="block text-xs">Turma</b>3º ano
              </span>
              <span>
                <b className="block text-xs">Situação</b>Ativo
              </span>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <button onClick={save} className="btn btn-primary">
              <Save size={17} />
              Salvar perfil
            </button>
            <button onClick={reset} className="btn border">
              <RotateCcw size={16} />
              Restaurar padrão
            </button>
          </div>
        </div>
        <div className="card p-6">
          <h2 className="flex gap-2 text-xl font-black">
            <Bell />
            Preferências de notificação
          </h2>
          <p className="muted mt-1 text-sm">
            Escolha quais atualizações você deseja acompanhar.
          </p>
          <div className="mt-4 space-y-3">
            {notificationLabels.map((label) => (
              <label
                className="flex cursor-pointer items-center justify-between rounded-xl border p-4 text-sm font-semibold"
                key={label}
              >
                {label}
                <input
                  type="checkbox"
                  checked={profile.notifications[label] ?? false}
                  onChange={(event) =>
                    update("notifications", {
                      ...profile.notifications,
                      [label]: event.target.checked,
                    })
                  }
                  className="h-4 w-4 accent-blue-600"
                />
              </label>
            ))}
          </div>
          <button onClick={save} className="btn btn-primary mt-5">
            <Save size={17} />
            Salvar preferências
          </button>
        </div>
        <ChangePassword />
      </section>
    </div>
  );
}
