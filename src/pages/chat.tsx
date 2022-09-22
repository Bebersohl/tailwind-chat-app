import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { nanoid } from 'nanoid';
import Pusher from 'pusher-js';
import { useEffect, useRef, useState } from 'react';

import Avatar from '@/components/Avatar';

dayjs.extend(relativeTime);

const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
};

const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
  {
    id: 4,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.',
  },
  {
    id: 5,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.',
  },
  {
    id: 6,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.',
  },
];

type Chat = {
  name: string;
  message: string;
  timestamp: string;
  id: string;
};

export default function ChatPage({ name }) {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const chatboxBottomRef = useRef<HTMLDivElement>();
  const chatBoxRef = useRef<HTMLDivElement>();

  useEffect(() => {
    chatboxBottomRef.current?.scrollIntoView();
  }, [chats]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_KEY!, {
      cluster: 'us2',
    });

    const channel = pusher.subscribe('chat');

    channel.bind('chat-event', function (data) {
      setChats((prevState) => [
        ...prevState,
        {
          name: data.name,
          message: data.message,
          timestamp: data.timestamp,
          id: data.id,
        },
      ]);
    });

    return () => {
      pusher.unsubscribe('chat');
    };
  }, []);

  const submitMessage = async (e) => {
    e.preventDefault();

    setMessage('');

    await axios.post('/api/pusher', {
      message,
      name,
      timestamp: Date.now(),
      id: nanoid(),
    });
  };

  return (
    <div className='container fixed top-0 bottom-0 left-0 right-0 mx-auto max-w-4xl'>
      <section aria-labelledby='notes-title'>
        <div className='bg-white shadow sm:overflow-hidden sm:rounded-lg'>
          <div className='divide-y divide-gray-200'>
            {/* <div className='px-4 py-5 sm:px-6'>
              <h2
                id='notes-title'
                className='text-lg font-medium text-gray-900'
              >
                Notes
              </h2>
            </div> */}
            <div
              className='h-[calc(100vh-176px)] overflow-y-auto px-4 py-6 sm:px-6'
              ref={chatBoxRef}
            >
              <ul role='list' className='space-y-8'>
                {chats.map((chat) => (
                  <li key={chat.id}>
                    <div className='flex space-x-3'>
                      <div className='flex-shrink-0'>
                        <img
                          className='h-10 w-10 rounded-full'
                          src={`https://images.unsplash.com/photo-${comments[0].imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                          alt=''
                        />
                      </div>
                      <div>
                        <div className='text-sm'>
                          <a href='#' className='font-medium text-gray-900'>
                            {chat.name}
                          </a>
                        </div>
                        <div className='mt-1 text-sm text-gray-700'>
                          <p>{chat.message}</p>
                        </div>
                        <div className='mt-2 space-x-2 text-sm'>
                          <span className='text-xs text-gray-500'>
                            {dayjs(chat.timestamp).fromNow()}
                          </span>{' '}
                          {/* <span className='font-medium text-gray-500'>
                            &middot;
                          </span>{' '}
                          <button
                            type='button'
                            className='font-medium text-gray-900'
                          >
                            Reply
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div ref={chatboxBottomRef}></div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-6 sm:px-6'>
            <div className='flex space-x-3'>
              <div className='flex-shrink-0'>
                {/* <img
                  className='h-10 w-10 rounded-full'
                  src={user.imageUrl}
                  alt=''
                /> */}
                <Avatar name={name} />
              </div>
              <div className='min-w-0 flex-1'>
                <form onSubmit={submitMessage}>
                  <div>
                    <label htmlFor='comment' className='sr-only'>
                      About
                    </label>
                    <textarea
                      id='comment'
                      name='comment'
                      rows={3}
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
                      placeholder='Write a message'
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className='mt-3 flex items-center justify-between'>
                    <a
                      href='#'
                      className='group inline-flex items-start space-x-2 text-sm text-gray-500 hover:text-gray-900'
                    >
                      <QuestionMarkCircleIcon
                        className='h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                        aria-hidden='true'
                      />
                      <span>Some HTML is okay.</span>
                    </a>
                    <button
                      type='submit'
                      className='inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
