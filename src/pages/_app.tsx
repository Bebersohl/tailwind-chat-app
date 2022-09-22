import { AppProps } from 'next/app';
import { useState } from 'react';

import '@/styles/globals.css';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  const [name, setName] = useState('');

  return <Component {...pageProps} name={name} setName={setName} />;
}

export default MyApp;
