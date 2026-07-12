import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
  TrendingUp,
  Users,
  Utensils,
} from "lucide-react";
import { events, news } from "@/lib/demo-data";
import { formatDate } from "@/lib/utils";
import { getSession } from "@/lib/auth";
import { PersonalizedGreeting } from "@/components/personalized-greeting";
import { InstallApp } from "@/components/install-app";
export default async function Dashboard() {
  const session = await getSession();
  return (
    <>
      <InstallApp />
      <section className="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-700 p-7 text-white md:p-10">
        <div className="absolute -right-10 -top-20 h-72 w-72 rounded-full bg-white/10 blur-xl" />
        <p className="font-bold text-blue-200">DOMINGO, 12 DE JULHO</p>
        <PersonalizedGreeting
          userId={session?.id || "local"}
          initialName={session?.name || "Lucas"}
        />
        <p className="mt-3 max-w-xl text-blue-100">
          Uma nova semana de aprendizados começa amanhã. Veja o que preparamos
          para você.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/portal/horarios" className="btn bg-white text-blue-700">
            <Clock3 size={18} />
            Ver próximas aulas
          </Link>
          <Link
            href="/portal/calendario"
            className="btn bg-white/10 text-white"
          >
            <CalendarDays size={18} />
            Abrir calendário
          </Link>
        </div>
      </section>
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [
            "Próxima aula",
            "Programação Web",
            "Amanhã, 09:20 · Lab 03",
            BookOpen,
            "text-blue-600 bg-blue-50",
          ],
          [
            "Próximo evento",
            "Feira de Ciências",
            "18 ago · Ginásio",
            CalendarDays,
            "text-violet-600 bg-violet-50",
          ],
          [
            "Meus clubes",
            "2 ativos",
            "Robótica e Leitura",
            Users,
            "text-amber-600 bg-amber-50",
          ],
          [
            "Notificações",
            "3 não lidas",
            "1 aviso importante",
            Bell,
            "text-rose-600 bg-rose-50",
          ],
        ].map(([a, b, c, I, style]) => (
          <div className="card p-5" key={String(a)}>
            <div className={`mb-5 inline-flex rounded-xl p-3 ${style}`}>
              <I size={22} />
            </div>
            <p className="muted text-sm">{a as string}</p>
            <h2 className="mt-1 text-xl font-black">{b as string}</h2>
            <p className="muted mt-1 text-sm">{c as string}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="card p-6 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-blue-600">SUA AGENDA</p>
              <h2 className="text-2xl font-black">Próximos eventos</h2>
            </div>
            <Link
              className="text-sm font-bold text-blue-600"
              href="/portal/eventos"
            >
              Ver todos
            </Link>
          </div>
          <div className="space-y-3">
            {events.slice(0, 3).map((e) => (
              <Link
                href={`/portal/eventos/${e.id}`}
                key={e.id}
                className="flex items-center gap-4 rounded-2xl border p-4 hover:border-blue-300"
              >
                <div className="w-14 rounded-xl bg-blue-50 p-2 text-center text-blue-700">
                  <b className="block text-xl">
                    {new Date(e.date + "T12:00").getDate()}
                  </b>
                  <small>AGO</small>
                </div>
                <div className="min-w-0 flex-1">
                  <b>{e.title}</b>
                  <p className="muted mt-1 flex gap-3 text-xs">
                    <span className="flex gap-1">
                      <Clock3 size={13} />
                      {e.time}
                    </span>
                    <span className="flex gap-1">
                      <MapPin size={13} />
                      {e.location}
                    </span>
                  </p>
                </div>
                <ArrowRight size={18} />
              </Link>
            ))}
          </div>
        </section>
        <section className="card overflow-hidden">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white">
            <div className="flex justify-between">
              <div>
                <p className="font-bold text-emerald-100">CARDÁPIO DE AMANHÃ</p>
                <h2 className="mt-1 text-2xl font-black">Segunda-feira</h2>
              </div>
              <Utensils />
            </div>
          </div>
          <div className="space-y-5 p-6">
            {[
              ["Café da manhã", "Pão de queijo e vitamina"],
              ["Almoço", "Frango grelhado, arroz, feijão e salada"],
              ["Lanche", "Bolo de cenoura e leite"],
            ].map((x) => (
              <div key={x[0]}>
                <p className="text-xs font-black uppercase text-emerald-600">
                  {x[0]}
                </p>
                <p className="mt-1 text-sm font-semibold">{x[1]}</p>
              </div>
            ))}
            <Link href="/portal/cardapio" className="btn w-full border">
              Ver semana completa
            </Link>
          </div>
        </section>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <section className="card p-6 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black">Notícias recentes</h2>
            <Link
              href="/portal/noticias"
              className="text-sm font-bold text-blue-600"
            >
              Ver todas
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {news.slice(0, 2).map((n) => (
              <Link
                href={`/portal/noticias/${n.id}`}
                key={n.id}
                className="rounded-2xl border p-4"
              >
                <span className="badge">{n.category}</span>
                <h3 className="mt-3 font-black">{n.title}</h3>
                <p className="muted mt-2 text-xs">{formatDate(n.date)}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="card p-6">
          <Sparkles className="text-violet-600" />
          <h2 className="mt-4 text-xl font-black">Seu progresso</h2>
          <p className="muted mt-2 text-sm">
            Você participou de 8 atividades neste semestre.
          </p>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-violet-500" />
          </div>
          <p className="mt-2 flex items-center gap-2 text-sm font-bold text-emerald-600">
            <TrendingUp size={16} /> 18% acima do mês anterior
          </p>
        </section>
      </div>
    </>
  );
}
