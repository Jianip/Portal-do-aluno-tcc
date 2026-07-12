# Portal do Aluno — Escola Sanico Teles

Portal acadêmico completo criado com Next.js, TypeScript, Tailwind CSS, Prisma e PostgreSQL. Possui interface responsiva, modo escuro, área do aluno, conteúdo acadêmico e painel administrativo com controle de acesso no servidor.

## Como executar

1. Copie `.env.example` para `.env` e defina uma `AUTH_SECRET` forte.
2. Inicie o PostgreSQL: `docker compose up -d`.
3. Instale e prepare o projeto: `npm install && npm run db:generate && npm run db:migrate && npm run db:seed`.
4. Execute: `npm run dev` e acesse `http://localhost:3000`.

Sem banco disponível, a tela de login mantém um fallback local somente para as contas de demonstração; o conteúdo público do portal usa o conjunto didático em `lib/demo-data.ts`.

## Acessos locais de demonstração

- Aluno: `aluno@escolafuturo.edu.br`
- Administrador: `admin@escolafuturo.edu.br`
- Senha para ambos: `Portal@123`

Nunca use essas credenciais em produção. As senhas persistidas pelo seed usam bcrypt com custo 12, e a sessão fica em cookie `httpOnly`, `sameSite=lax`, assinada com HS256 e expira após oito horas.

## Estrutura

- `app/portal`: experiência do aluno e páginas acadêmicas.
- `app/admin`: painel protegido por papel administrativo.
- `lib`: autenticação, validações, Prisma e dados locais sinalizados.
- `prisma`: modelo relacional e seed.
- `tests`: testes das regras de validação mais importantes.

Comandos de qualidade: `npm test`, `npm run lint` e `npm run build`.
