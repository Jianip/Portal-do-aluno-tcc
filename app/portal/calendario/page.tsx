import { getSession } from "@/lib/auth";
import { PageTitle } from "@/components/page-title";
import { PersonalCalendar } from "@/components/personal-calendar";
export default async function Calendario() {
  const session = await getSession();
  const personalCalendarId = `${session?.id || "local"}-empty-v2`;
  return (
    <>
      <PageTitle
        eyebrow="Organize-se"
        title="Meu calendário"
        description="Crie sua própria rotina com compromissos, lembretes, avaliações e atividades pessoais."
      />
      <PersonalCalendar userId={personalCalendarId} />
    </>
  );
}
