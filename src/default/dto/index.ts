import { z } from "zod";

export const RequestSchema = z.object({
  id: z.uuidv4(),
});

export const ResponseSchema = z.object({
  id: z.uuidv4(),
});

export type RequestDTO = z.infer<typeof RequestSchema>;
export type ResponseDTO = z.infer<typeof ResponseSchema>;
