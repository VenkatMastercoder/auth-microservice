import { z } from "zod";
import { protectedSchema } from "../../validations/protectedZod";

export type sampleData = z.infer<typeof protectedSchema>