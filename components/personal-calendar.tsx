"use client";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
type Entry = {
  id: string;
  date: string;
  title: string;
  type: string;
  time?: string;
  location?: string;
  description?: string;
};
const types = [
  "Prova",
  "Trabalho",
  "Reunião",
  "Evento",
  "Atividade",
  "Pessoal",
];
const colors: Record<string, string> = {
  Prova: "bg-red-100 text-red-700",
  Trabalho: "bg-blue-100 text-blue-700",
  Reunião: "bg-amber-100 text-amber-700",
  Evento: "bg-violet-100 text-violet-700",
  Atividade: "bg-emerald-100 text-emerald-700",
  Pessoal: "bg-pink-100 text-pink-700",
};
const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];
const initialEntries: Entry[] = [];
function localDate(value: string) {
  return new Date(`${value}T12:00:00`);
}
export function PersonalCalendar({ userId }: { userId: string }) {
  // v3 starts every account with a clean personal agenda, without demo entries.
  const storageKey = `sanico-calendar-v3:${userId}`;
  const [current, setCurrent] = useState(new Date(2026, 6, 1));
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [loaded, setLoaded] = useState(false);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [selectedDate, setSelectedDate] = useState("2026-07-12");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const personalEntries = (JSON.parse(saved) as Entry[]).filter(
          (entry) => !entry.id.startsWith("initial-"),
        );
        setEntries(personalEntries);
      }
    } catch {
      toast.error("Não foi possível carregar sua agenda pessoal.");
    }
    setLoaded(true);
  }, [storageKey]);
  useEffect(() => {
    if (loaded) localStorage.setItem(storageKey, JSON.stringify(entries));
  }, [entries, loaded, storageKey]);
  const year = current.getFullYear(),
    month = current.getMonth(),
    firstDay = new Date(year, month, 1).getDay(),
    daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from(
    { length: Math.ceil((firstDay + daysInMonth) / 7) * 7 },
    (_, index) => {
      const day = index - firstDay + 1;
      return day > 0 && day <= daysInMonth ? day : null;
    },
  );
  const upcoming = useMemo(
    () =>
      [...entries]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 8),
    [entries],
  );
  function changeMonth(delta: number) {
    setCurrent(new Date(year, month + delta, 1));
  }
  function openCreate(date?: string) {
    setEditing(null);
    setSelectedDate(date || `${year}-${String(month + 1).padStart(2, "0")}-01`);
    setModal(true);
  }
  function openEdit(entry: Entry) {
    setEditing(entry);
    setSelectedDate(entry.date);
    setModal(true);
  }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(
      new FormData(event.currentTarget),
    ) as Record<string, string>;
    const entry: Entry = {
      id: editing?.id || crypto.randomUUID(),
      date: data.date,
      title: data.title,
      type: data.type,
      time: data.time,
      location: data.location,
      description: data.description,
    };
    setEntries((items) =>
      editing
        ? items.map((item) => (item.id === editing.id ? entry : item))
        : [...items, entry],
    );
    setModal(false);
    toast.success(
      editing
        ? "Compromisso atualizado."
        : "Compromisso adicionado à sua agenda.",
    );
  }
  function remove(id: string) {
    if (!confirm("Excluir este compromisso da sua agenda?")) return;
    setEntries((items) => items.filter((item) => item.id !== id));
    setModal(false);
    toast.success("Compromisso excluído.");
  }
  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <button onClick={() => openCreate()} className="btn btn-primary">
          <Plus size={17} />
          Novo compromisso
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => changeMonth(-1)}
            className="btn border"
            aria-label="Mês anterior"
          >
            <ChevronLeft size={17} />
          </button>
          <button
            onClick={() => setCurrent(new Date(2026, 6, 1))}
            className="btn min-w-36 border"
          >
            {monthNames[month]} {year}
          </button>
          <button
            onClick={() => changeMonth(1)}
            className="btn border"
            aria-label="Próximo mês"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        <section className="card overflow-hidden">
          <div className="grid grid-cols-7 border-b bg-black/[.02] text-center text-xs font-bold">
            {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"].map((day) => (
              <div className="p-3" key={day}>
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((day, index) => {
              const date = day
                ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                : "";
              const dayEntries = entries.filter((entry) => entry.date === date);
              return (
                <button
                  key={index}
                  disabled={!day}
                  onClick={() => day && openCreate(date)}
                  className="min-h-24 border-b border-r p-2 text-left text-sm transition hover:bg-blue-50/50 disabled:hover:bg-transparent dark:hover:bg-blue-950/30"
                >
                  <span
                    className={
                      date === "2026-07-12"
                        ? "inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white"
                        : ""
                    }
                  >
                    {day}
                  </span>
                  <span className="mt-1 block space-y-1">
                    {dayEntries.slice(0, 2).map((entry) => (
                      <span
                        onClick={(event) => {
                          event.stopPropagation();
                          openEdit(entry);
                        }}
                        key={entry.id}
                        className={`block truncate rounded-lg p-1 text-[10px] font-bold ${colors[entry.type] || colors.Pessoal}`}
                      >
                        {entry.title}
                      </span>
                    ))}
                    {dayEntries.length > 2 && (
                      <span className="muted block text-[10px]">
                        +{dayEntries.length - 2} itens
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
        <aside className="card h-fit p-6">
          <h2 className="flex items-center gap-2 text-xl font-black">
            <CalendarDays className="text-blue-600" />
            Próximos compromissos
          </h2>
          <p className="muted mt-1 text-xs">Monte sua agenda pessoal</p>
          <div className="mt-5 space-y-4">
            {upcoming.length ? (
              upcoming.map((entry) => (
                <button
                  onClick={() => openEdit(entry)}
                  key={entry.id}
                  className="block w-full border-l-2 border-blue-500 pl-4 text-left"
                >
                  <span
                    className={`badge ${colors[entry.type] || colors.Pessoal}`}
                  >
                    {entry.type}
                  </span>
                  <h3 className="mt-2 text-sm font-bold">{entry.title}</h3>
                  <p className="muted mt-1 text-xs">
                    {localDate(entry.date).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    {entry.time && ` · ${entry.time}`}
                  </p>
                </button>
              ))
            ) : (
              <p className="muted rounded-xl border border-dashed p-5 text-center text-sm">
                Nenhum compromisso futuro.
              </p>
            )}
          </div>
        </aside>
      </div>
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="card max-h-[90vh] w-full max-w-lg overflow-y-auto p-6">
            <div className="flex justify-between">
              <div>
                <h2 className="text-2xl font-black">
                  {editing ? "Editar compromisso" : "Novo compromisso"}
                </h2>
                <p className="muted mt-1 text-sm">
                  Este item ficará somente na sua agenda.
                </p>
              </div>
              <button
                onClick={() => setModal(false)}
                className="rounded-lg p-2"
                aria-label="Fechar"
              >
                <X />
              </button>
            </div>
            <form onSubmit={save} className="mt-6 space-y-4">
              <label className="block text-sm font-bold">
                Título
                <input
                  name="title"
                  className="input mt-2"
                  defaultValue={editing?.title}
                  required
                  minLength={3}
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-bold">
                  Data
                  <input
                    name="date"
                    type="date"
                    className="input mt-2"
                    defaultValue={editing?.date || selectedDate}
                    required
                  />
                </label>
                <label className="block text-sm font-bold">
                  Horário
                  <input
                    name="time"
                    type="time"
                    className="input mt-2"
                    defaultValue={editing?.time}
                  />
                </label>
              </div>
              <label className="block text-sm font-bold">
                Categoria
                <select
                  name="type"
                  className="input mt-2"
                  defaultValue={editing?.type || "Pessoal"}
                >
                  {types.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-bold">
                <MapPin className="mr-1 inline" size={15} />
                Local
                <input
                  name="location"
                  className="input mt-2"
                  defaultValue={editing?.location}
                />
              </label>
              <label className="block text-sm font-bold">
                Observações
                <textarea
                  name="description"
                  className="input mt-2 min-h-24"
                  defaultValue={editing?.description}
                />
              </label>
              <div className="flex flex-wrap justify-between gap-3 pt-2">
                {editing ? (
                  <button
                    type="button"
                    onClick={() => remove(editing.id)}
                    className="btn border text-red-600"
                  >
                    <Trash2 size={17} />
                    Excluir
                  </button>
                ) : (
                  <span />
                )}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setModal(false)}
                    className="btn border"
                  >
                    Cancelar
                  </button>
                  <button className="btn btn-primary">
                    {editing ? <Pencil size={17} /> : <Clock3 size={17} />}
                    Salvar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
