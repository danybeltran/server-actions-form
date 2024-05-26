'use client'

import { RenderList, revalidate, useAction, useMutation } from 'atomic-utils'

import { getMessages, sendMessage } from '@/actions/messages'

export default function Page() {
  const { data } = useMessages()
  const { formProps } = useSendMessage()

  return (
    <main className='p-4 space-y-2'>
      <form
        className='border-2 border-black rounded-lg w-72 p-4'
        {...formProps}
      >
        <input
          type='text'
          name='messageText'
          placeholder='Type your message here'
          className='border-2 p-2 focus:outline-none focus:ring-2'
        />
      </form>
      <RenderList
        data={data}
        render={message => (
          <div key={message.id}>
            <p>{message.messageText}</p>
          </div>
        )}
      />
    </main>
  )
}

function useMessages() {
  return useAction(getMessages, {
    id: 'messages',
    default: [],
    middleware(incomingData) {
      return incomingData.reverse()
    }
  })
}

function useSendMessage() {
  return useMutation(sendMessage, {
    onSubmit: 'reset',
    onResolve() {
      revalidate('messages')
    }
  })
}
