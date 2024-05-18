'use client'

import {
  RenderList,
  revalidate,
  useServerAction,
  useServerMutation
} from 'atomic-utils'
import { getMessages, sendMessage } from './actions'

export default function Page() {
  const { data } = useServerAction(getMessages, {
    default: [],
    id: 'Messages'
  })

  const { formProps } = useServerMutation(sendMessage, {
    onSubmit: 'reset',
    onResolve() {
      revalidate('Messages')
    }
  })

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
