import { z } from 'zod'

const schema = z.object({
  API_URL: z.string().url(),
  TOKEN: z.string(),
})

const env = schema.parse(process.env)

export const ENV = {
  API_URL: env.API_URL,
  TOKEN: env.TOKEN,
}
