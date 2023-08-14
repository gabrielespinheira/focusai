'use client'

import { FaRobot } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { useChat } from 'ai/react'
import colors from 'tailwindcss/colors'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from './ui/scroll-area'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat',
    })

  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle>Chat AI</CardTitle>
        <CardDescription>
          Using Vercel SDK to create a chat bot.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] w-full pr-4">
          {!messages.length && <h1>Send your first message</h1>}

          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className="flex gap-2 text-slate-600 text-sm mb-4"
              >
                {message.role === 'user' && (
                  <Avatar>
                    <AvatarFallback>GE</AvatarFallback>
                    <AvatarImage src="https://github.com/gabrielespinheira.png" />
                  </Avatar>
                )}

                {message.role === 'assistant' && (
                  <div className="flex bg-slate-200 rounded-full w-12 h-12 justify-center items-center">
                    <FaRobot size={24} fill={colors.blue[600]} />
                  </div>
                )}
                <p className="leading-relaxed">
                  <span className="block font-bold text-slate-800">
                    {message.role === 'user' ? 'User' : 'Bot'}
                  </span>
                  {message.content}
                </p>
              </div>
            )
          })}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form className="w-full flex gap-2" onSubmit={handleSubmit}>
          <Input
            placeholder="Send a message"
            value={input}
            onChange={handleInputChange}
          />
          <Button disabled={isLoading} type="submit">
            <FiSend size={16} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
