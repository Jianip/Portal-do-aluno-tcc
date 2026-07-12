import {Apple,ChefHat,ChevronLeft,ChevronRight,Coffee,Info,Leaf,Milk,Salad,Sun,Utensils} from "lucide-react";
import {menu} from "@/lib/demo-data";
import {PageTitle} from "@/components/page-title";

const mealStyles=[
  {label:"Café da manhã",time:"6h30",key:"breakfast" as const,icon:Coffee,color:"bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300"},
  {label:"Primeiro almoço",time:"10h20",key:"lunch" as const,icon:Utensils,color:"bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"},
  {label:"Segundo almoço",time:"13h05",key:"lunchLate" as const,icon:Utensils,color:"bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300"},
  {label:"Café da tarde",time:"15h50",key:"snack" as const,icon:Apple,color:"bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300"},
];

export default function Cardapio(){return <>
  <PageTitle eyebrow="Alimentação escolar" title="Cardápio da semana" description="Refeições equilibradas, preparadas com carinho para acompanhar sua rotina de estudos." action={<div className="flex items-center gap-2"><button className="btn border" aria-label="Semana anterior"><ChevronLeft size={16}/></button><span className="btn min-w-44 border bg-[var(--card)]">13 a 17 de julho</span><button className="btn border" aria-label="Próxima semana"><ChevronRight size={16}/></button></div>}/>

  <section className="relative mb-7 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-6 text-white shadow-xl shadow-emerald-900/10 md:p-8">
    <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10"/><div className="absolute bottom-0 right-32 h-32 w-32 rounded-full bg-white/5"/>
    <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-black uppercase tracking-wider"><Sun size={14}/> Refeições de hoje</span><h2 className="mt-4 text-3xl font-black">Segunda-feira</h2><p className="mt-2 max-w-xl text-emerald-50">Um cardápio completo para começar a semana com energia, sabor e equilíbrio.</p></div><div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-white/15 backdrop-blur"><ChefHat size={48}/></div></div>
  </section>

  <div className="grid gap-5 xl:grid-cols-5">{menu.map((day,index)=><article key={day.day} className={`card overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-xl ${index===0?"ring-2 ring-emerald-500":""}`}>
    <header className={`relative p-5 ${index===0?"bg-gradient-to-br from-emerald-500 to-teal-600 text-white":"bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950"}`}>
      <div className="flex items-center justify-between"><div><p className={`text-[10px] font-black uppercase tracking-[.16em] ${index===0?"text-emerald-100":"text-blue-600"}`}>{index===0?"Hoje":"Dia da semana"}</p><h2 className="mt-1 text-xl font-black">{day.day}</h2></div><span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${index===0?"bg-white/15":"bg-white text-blue-600 shadow-sm dark:bg-slate-800"}`}><Salad size={21}/></span></div>
    </header>
    <div className="space-y-3 p-4">{mealStyles.map(({label,time,key,icon:Icon,color})=><div className="rounded-2xl border p-3" key={key}><div className="flex items-center gap-2"><span className={`rounded-xl p-2 ${color}`}><Icon size={16}/></span><div><p className="text-[11px] font-black uppercase tracking-wide">{label}</p><p className="mt-0.5 text-[11px] font-bold text-blue-600">{time}</p></div></div><p className="muted mt-3 text-sm leading-5">{day[key]}</p></div>)}</div>
    {index===0&&<div className="mx-4 mb-4 flex flex-wrap gap-2"><span className="badge bg-emerald-50 text-emerald-700"><Leaf size={12}/> Vegetariano disponível</span></div>}
  </article>)}</div>

  <section className="card mt-7 overflow-hidden"><div className="grid md:grid-cols-[220px_1fr]"><div className="flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white"><Info size={28}/><h2 className="mt-3 text-xl font-black">Informações importantes</h2><p className="mt-2 text-xs text-blue-100">Fale com a equipe da cozinha em caso de restrições.</p></div><div className="grid gap-4 p-5 sm:grid-cols-3"><div className="flex gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30"><Leaf className="shrink-0 text-emerald-600"/><div><b className="text-sm">Opção vegetariana</b><p className="muted mt-1 text-xs">Disponível mediante solicitação.</p></div></div><div className="flex gap-3 rounded-2xl bg-blue-50 p-4 dark:bg-blue-950/30"><Milk className="shrink-0 text-blue-600"/><div><b className="text-sm">Sem lactose</b><p className="muted mt-1 text-xs">Informe a equipe antecipadamente.</p></div></div><div className="flex gap-3 rounded-2xl bg-amber-50 p-4 dark:bg-amber-950/30"><Apple className="shrink-0 text-amber-600"/><div><b className="text-sm">Alérgenos</b><p className="muted mt-1 text-xs">Consulte os ingredientes na cozinha.</p></div></div></div></div></section>
  <p className="muted mt-4 text-center text-xs">O cardápio pode sofrer alterações conforme a disponibilidade dos ingredientes.</p>
</>}
