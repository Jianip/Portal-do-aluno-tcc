"use server";
import bcrypt from "bcryptjs";
import {z} from "zod";
import {getSession} from "@/lib/auth";
import {db} from "@/lib/db";

const schema=z.object({currentPassword:z.string().min(1,"Informe a senha atual."),newPassword:z.string().min(8,"A nova senha deve ter pelo menos 8 caracteres.").regex(/[A-Z]/,"Inclua uma letra maiúscula.").regex(/[a-z]/,"Inclua uma letra minúscula.").regex(/[0-9]/,"Inclua um número."),confirmPassword:z.string()}).refine(data=>data.newPassword===data.confirmPassword,{message:"As novas senhas não coincidem.",path:["confirmPassword"]}).refine(data=>data.currentPassword!==data.newPassword,{message:"A nova senha deve ser diferente da atual.",path:["newPassword"]});
export type PasswordState={status?:"success"|"error";message?:string};
export async function changePassword(_:PasswordState,formData:FormData):Promise<PasswordState>{const session=await getSession();if(!session)return{status:"error",message:"Sua sessão expirou. Entre novamente."};const parsed=schema.safeParse(Object.fromEntries(formData));if(!parsed.success)return{status:"error",message:parsed.error.issues[0].message};try{const user=await db.user.findUnique({where:{id:session.id},select:{passwordHash:true}});if(!user||!await bcrypt.compare(parsed.data.currentPassword,user.passwordHash))return{status:"error",message:"A senha atual está incorreta."};const passwordHash=await bcrypt.hash(parsed.data.newPassword,12);await db.user.update({where:{id:session.id},data:{passwordHash}});return{status:"success",message:"Senha alterada com sucesso."}}catch{return{status:"error",message:session.id.startsWith("demo-")?"Inicie o PostgreSQL e execute o seed para alterar a senha da conta demonstrativa.":"Não foi possível alterar a senha agora."}}}
