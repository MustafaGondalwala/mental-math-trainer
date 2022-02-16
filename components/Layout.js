import Image from 'next/image';
import Sidebar from 'components/Sidebar';
import logo from 'public/logo.svg';

export default function Layout({ children }) {
  return (
    <div className='fixed inset-0 flex flex-col overflow-auto bg-zinc-800 text-white'>
      <header className='grid h-12 grid-cols-[2.25rem_1fr_2.25rem] bg-gray-800 px-2'>
        <Sidebar />
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href='/'
          className='flex select-none items-center gap-4 justify-self-center'
        >
          <Image
            src={logo}
            alt='Mental Math Trainer logo'
            width={36}
            height={36}
          />
          <div className='hidden text-xl sm:block'>Mental Math Trainer</div>
        </a>
      </header>
      <main className='mx-auto my-3 w-full max-w-screen-md flex-auto px-3'>
        {children}
      </main>
    </div>
  );
}
