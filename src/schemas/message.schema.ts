import {TypeOf, boolean, number, object, string} from 'zod';

export const MessageSchema = object({
  id: number(),
  isIncome: boolean(),
  amount: number(),
  description: string(),
  tags: string().array(),
});

export type Message = TypeOf<typeof MessageSchema>;