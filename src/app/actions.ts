'use server'

import { $form, actionData } from 'atomic-utils'

type Message = {
  id: string
  messageText: string
}

const messages: Message[] = []

export async function getMessages() {
  return actionData(messages.reverse())
}

export async function sendMessage(data: FormData) {
  const { messageText } = $form<Message>(data)

  const newMessage = {
    messageText,
    id: crypto.randomUUID()
  }

  messages.push(newMessage)

  return actionData(messages)
}