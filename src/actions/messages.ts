'use server'

import { $form, actionData } from 'atomic-utils'

type Message = {
  id: string
  messageText: string
}

let messages: Message[] = []

export async function getMessages() {
  return actionData(messages)
}

export async function sendMessage(data: FormData) {
  const { messageText } = $form<Message>(data)

  const newMessage: Message = {
    messageText,
    id: crypto.randomUUID()
  }

  messages.push(newMessage)

  return actionData(messages)
}
