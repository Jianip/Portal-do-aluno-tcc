import { PrismaClient, Role, ContentStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
const db = new PrismaClient();
async function main(){
 const passwordHash=await bcrypt.hash("Portal@123",12);
 const admin=await db.user.upsert({where:{email:"admin@escolafuturo.edu.br"},update:{},create:{name:"Mariana Oliveira",email:"admin@escolafuturo.edu.br",passwordHash,role:Role.ADMIN}});
 const student=await db.user.upsert({where:{email:"aluno@escolafuturo.edu.br"},update:{},create:{name:"Lucas Ferreira",email:"aluno@escolafuturo.edu.br",passwordHash,role:Role.STUDENT,phone:"(11) 99999-2026",studentProfile:{create:{registration:"202600184",course:"Técnico em Informática",className:"3º TI A"}}}});
 await db.event.upsert({where:{slug:"feira-ciencias"},update:{},create:{title:"Feira de Ciências e Tecnologia",slug:"feira-ciencias",description:"Projetos inovadores da comunidade escolar.",startsAt:new Date("2026-08-18T16:30:00Z"),location:"Ginásio principal",category:"Acadêmico",capacity:120,status:ContentStatus.PUBLISHED}});
 await db.club.upsert({where:{slug:"robotica"},update:{},create:{name:"Clube de Robótica",slug:"robotica",description:"Automação, criatividade e competições.",leader:"Prof. Ricardo Alves",meetingInfo:"Quartas, 14h",category:"Tecnologia",memberLimit:30}});
 await db.notification.create({data:{userId:student.id,title:"Bem-vindo ao Portal",message:"Seu ambiente acadêmico está pronto para uso."}}).catch(()=>{});
 console.log({admin:admin.email,student:student.email});
}
main().finally(()=>db.$disconnect());
