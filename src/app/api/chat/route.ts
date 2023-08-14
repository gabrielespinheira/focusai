import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(config)

export const runtime = 'edge'

export async function POST(req: Request) {
  console.log('🔥', req)
  const { messages } = await req.json()

  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo', // gpt-4
    stream: true,
    messages,
  })

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
