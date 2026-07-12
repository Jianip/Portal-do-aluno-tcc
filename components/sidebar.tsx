"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CalendarDays, Clock3, GraduationCap, House, Info, LayoutDashboard, Newspaper, Shield, Users, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [["/portal","Início",House],["/portal/eventos","Eventos",CalendarDays],["/portal/clubes","Clubes",Users],["/portal/calendario","Calendário",CalendarDays],["/portal/noticias","Notícias",Newspaper],["/portal/cardapio","Cardápio",Utensils],["/portal/horarios","Horários",Clock3],["/portal/sobre","Sobre",Info]] as const;

export function Sidebar({ admin = false }: { admin?: boolean }) {
  const path = usePathname();
  const list = admin ? [["/admin","Visão geral",LayoutDashboard],["/admin/alunos","Alunos",GraduationCap],["/admin/eventos","Eventos",CalendarDays],["/admin/clubes","Clubes",Users],["/admin/noticias","Notícias",Newspaper],["/admin/conteudos","Calendário e grade",Clock3],["/portal","Ver portal",House]] as const : links;
  return <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-[var(--card)] p-5 lg:block">
    <Link href={admin ? "/admin" : "/portal"} className="mb-9 flex items-center gap-3 text-lg font-black"><Image src="/brand/sanico-teles-logo.png" alt="Logo da Escola Estadual Sanico Teles" width={48} height={48} className="rounded-full bg-white object-contain" priority/><span>{admin ? <>Sanico Teles <small className="block text-xs font-semibold text-blue-600">Administração</small></> : "Sanico Teles"}</span></Link>
    <nav className="space-y-1">{list.map(([href,label,Icon]) => <Link key={href} href={href} className={cn("flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold muted hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-950",path === href && "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300")}><Icon size={19}/>{label}</Link>)}</nav>
    {!admin && <Link href="/admin" className="absolute bottom-5 left-5 right-5 flex items-center gap-2 rounded-xl border p-3 text-xs muted"><Shield size={16}/>Área administrativa</Link>}
  </aside>;
}
