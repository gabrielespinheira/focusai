'use client'

import { useState } from 'react'
import { FaRobot, FaUser } from 'react-icons/fa'
import { FiSend } from 'react-icons/fi'
import { useChat } from 'ai/react'

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Chat() {
  const [model, setModel] = useState('gpt-4')
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat',
      body: {
        model,
      },
    })

  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>Focus AI</CardTitle>
        <CardDescription>
          Chatbot AI to help you <b>focus</b>, increase your <b>productivity</b>{' '}
          and <b>achieve more</b> in your everyday life.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ScrollArea
          className="w-full pr-4"
          style={{ height: 'calc(100vh - 32px - 32px - 98px - 90px)' }}
        >
          {!messages.length && <h1>Send your first message</h1>}

          {messages.map((message) => {
            return (
              <div
                key={message.id}
                className={`relative flex gap-4 text-slate-600 ${
                  message.role === 'assistant' ? 'bg-slate-100' : 'bg-slate-300'
                } rounded-lg px-4 py-2 pt-10 mt-6 mb-2`}
              >
                {message.role === 'assistant' && (
                  <div className="absolute top-[-12px] left-3 flex bg-primary text-primary-foreground rounded-full w-12 h-12 justify-center items-center">
                    <FaRobot size={24} />
                  </div>
                )}

                {message.role !== 'assistant' && (
                  <div className="absolute top-[-12px] left-3 flex bg-primary text-primary-foreground rounded-full w-12 h-12 justify-center items-center">
                    <FaUser size={24} />
                  </div>
                )}

                <p className="leading-relaxed flex-1">{message.content}</p>
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
          <Select defaultValue={model} onValueChange={(e) => setModel(e)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Model</SelectLabel>
                <SelectItem value="gpt-3">GPT-3</SelectItem>
                <SelectItem value="gpt-4">GPT-4</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button disabled={isLoading} type="submit">
            <FiSend size={16} />
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
