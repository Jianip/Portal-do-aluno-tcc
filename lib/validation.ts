import { z } from "zod";
export const loginSchema=z.object({email:z.email("Informe um e-mail válido"),password:z.string().min(8,"A senha deve ter ao menos 8 caracteres")});
export const profileSchema=z.object({phone:z.string().min(10).max(20),email:z.email()});
export const eventSchema=z.object({title:z.string().min(3),description:z.string().min(10),location:z.string().min(2),capacity:z.coerce.number().int().positive().optional()});
