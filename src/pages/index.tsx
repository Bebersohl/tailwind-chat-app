import { useRouter } from 'next/router';
import * as React from 'react';

import { generateName } from '@/lib/name';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage({ setName }) {
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();

    setName(e.target.name.value || generateName());

    router.push('/chat');
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <form onSubmit={onSubmit}>
          <div className='container mx-auto max-w-xs pt-10'>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Enter your name
            </label>
            <div className='mt-1'>
              <input
                autoFocus
                type='text'
                name='name'
                id='name'
                className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
              />
            </div>
          </div>
        </form>
      </main>
    </Layout>
  );
}
