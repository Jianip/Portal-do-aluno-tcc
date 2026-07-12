"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Menu, Search, SunMoon, User, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
const portalItems = [
  { label: "Início", keywords: "dashboard resumo", href: "/portal" },
  {
    label: "Eventos",
    keywords: "feira jogos mostra inscrição",
    href: "/portal/eventos",
  },
  {
    label: "Clubes",
    keywords: "robótica leitura xadrez",
    href: "/portal/clubes",
  },
  {
    label: "Calendário",
    keywords: "provas trabalhos atividades",
    href: "/portal/calendario",
  },
  {
    label: "Notícias",
    keywords: "avisos comunicados novidades",
    href: "/portal/noticias",
  },
  {
    label: "Cardápio",
    keywords: "alimentação almoço lanche",
    href: "/portal/cardapio",
  },
  {
    label: "Horários",
    keywords: "aulas professores disciplinas",
    href: "/portal/horarios",
  },
  { label: "Perfil", keywords: "conta telefone senha", href: "/portal/perfil" },
  {
    label: "Sobre a escola",
    keywords: "sanico teles contato história",
    href: "/portal/sobre",
  },
];
const adminItems = [
  { label: "Visão geral", keywords: "dashboard métricas", href: "/admin" },
  {
    label: "Gerenciar alunos",
    keywords: "matrículas estudantes",
    href: "/admin/alunos",
  },
  {
    label: "Gerenciar eventos",
    keywords: "cadastro inscrições",
    href: "/admin/eventos",
  },
  {
    label: "Gerenciar clubes",
    keywords: "membros responsáveis",
    href: "/admin/clubes",
  },
  {
    label: "Gerenciar notícias",
    keywords: "publicar comunicados",
    href: "/admin/noticias",
  },
  {
    label: "Calendário e grade",
    keywords: "horários cardápio",
    href: "/admin/conteudos",
  },
];
export function Header({
  name = "Lucas",
  userId,
  admin = false,
}: {
  name?: string;
  userId?: string;
  admin?: boolean;
}) {
  const router = useRouter(),
    items = admin ? adminItems : portalItems;
  const [dark, setDark] = useState(false),
    [query, setQuery] = useState(""),
    [focused, setFocused] = useState(false),
    [notifications, setNotifications] = useState(false),
    [profileName, setProfileName] = useState(name),
    [profileAvatar, setProfileAvatar] = useState("");
  useEffect(
    () => setDark(document.documentElement.classList.contains("dark")),
    [],
  );
  useEffect(() => {
    if (!userId || admin) return;
    const key = `sanico-profile:${userId}`;
    const loadProfile = () => {
      try {
        const saved = localStorage.getItem(key);
        if (!saved) return;
        const profile = JSON.parse(saved) as {
          displayName?: string;
          avatar?: string;
        };
        setProfileName(profile.displayName || name);
        setProfileAvatar(profile.avatar || "");
      } catch {
        setProfileName(name);
      }
    };
    const updateProfile = (event: Event) => {
      const detail = (event as CustomEvent).detail as {
        userId?: string;
        profile?: { displayName?: string; avatar?: string };
      };
      if (detail.userId !== userId || !detail.profile) return;
      setProfileName(detail.profile.displayName || name);
      setProfileAvatar(detail.profile.avatar || "");
    };
    loadProfile();
    window.addEventListener("profile-updated", updateProfile);
    return () => window.removeEventListener("profile-updated", updateProfile);
  }, [admin, name, userId]);
  const results = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("pt-BR");
    return (
      q
        ? items.filter((i) =>
            `${i.label} ${i.keywords}`.toLocaleLowerCase("pt-BR").includes(q),
          )
        : items
    ).slice(0, 6);
  }, [query, items]);
  function toggle() {
    document.documentElement.classList.toggle("dark");
    setDark((v) => !v);
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    if (results[0]) {
      router.push(results[0].href);
      setQuery("");
      setFocused(false);
    }
  }
  return (
    <header className="sticky top-0 z-10 flex min-h-20 items-center justify-between border-b bg-[color-mix(in_srgb,var(--background)_88%,transparent)] px-4 backdrop-blur-xl md:px-8">
      <Link
        href={admin ? "/admin" : "/portal"}
        className="rounded-xl p-2 lg:hidden"
        aria-label="Ir ao início"
      >
        <Menu />
      </Link>
      <form
        onSubmit={submit}
        className="relative hidden w-full max-w-md md:block"
        role="search"
      >
        <Search
          className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          className="input !pl-10 !pr-10"
          placeholder="Buscar no portal..."
          aria-label="Buscar no portal"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            aria-label="Limpar busca"
          >
            <X size={17} />
          </button>
        )}
        {focused && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border bg-[var(--card)] p-2 shadow-xl">
            {results.length ? (
              results.map((item) => (
                <button
                  type="button"
                  key={item.href}
                  onMouseDown={() => router.push(item.href)}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <Search size={15} className="text-blue-600" />
                  <span>
                    <b className="block">{item.label}</b>
                    <small className="muted">Acessar página</small>
                  </span>
                </button>
              ))
            ) : (
              <p className="muted p-4 text-center text-sm">
                Nenhum resultado encontrado.
              </p>
            )}
          </div>
        )}
      </form>
      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggle}
          className="rounded-xl p-3 hover:bg-black/5"
          aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"}
        >
          <SunMoon size={20} />
        </button>
        <div className="relative">
          <button
            onClick={() => setNotifications((v) => !v)}
            className="relative rounded-xl p-3 hover:bg-black/5"
            aria-label="Notificações"
          >
            <Bell size={20} />
            <i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
          {notifications && (
            <div className="absolute right-0 top-14 w-72 rounded-2xl border bg-[var(--card)] p-3 shadow-xl">
              <b>Notificações</b>
              <div className="mt-2 rounded-xl bg-blue-50 p-3 text-sm dark:bg-blue-950">
                <b>Bem-vindo ao portal</b>
                <p className="muted mt-1 text-xs">
                  Confira seus próximos compromissos.
                </p>
              </div>
            </div>
          )}
        </div>
        <Link
          href={admin ? "/admin" : "/portal/perfil"}
          className="ml-1 flex items-center gap-3 rounded-xl border px-3 py-2"
        >
          <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white">
            {profileAvatar && !admin ? (
              <Image
                src={profileAvatar}
                alt="Foto do perfil"
                width={32}
                height={32}
                unoptimized
                className="h-full w-full object-cover"
              />
            ) : (
              <User size={18} />
            )}
          </span>
          <span className="hidden text-left text-sm md:block">
            <b className="block max-w-28 truncate">
              {admin ? name : profileName}
            </b>
            <small className="muted">
              {admin ? "Administrador" : "3º TI A"}
            </small>
          </span>
        </Link>
      </div>
    </header>
  );
}
