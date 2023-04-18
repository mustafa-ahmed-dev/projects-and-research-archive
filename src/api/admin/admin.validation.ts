import { z } from "zod";

import { Gender } from "../../database/entities/Person";

export const IdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const AdminSchema = z.object({
  body: z.object({
    name: z.string().min(4).max(30),
    dateOfBirth: z.string().min(4),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
  }),
});

type Id = z.infer<typeof IdSchema>["params"];
type AdminData = z.infer<typeof AdminSchema>["body"];

export { Id, AdminData };
