import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
  title?: string;
  description?: string;
  left?: boolean;
}

export default function AuthSplitLayout({ children, title, description, left = false }: PropsWithChildren<AuthLayoutProps>) {
  const { name, quote } = usePage<SharedData>().props;

  return (
    <div className="relative grid h-dvh flex-col items-center justify-center bg-white px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div
        className="dark:shadow-r-3xl relative hidden h-full flex-col p-10 text-white lg:flex"
        style={{
          backgroundImage: "url('/img/bg-login.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        {left && <Link
          href={route('home')}
          className="relative z-20 mb-10 flex items-center justify-center lg:absolute lg:top-8 lg:left-8 lg:mb-0 lg:flex lg:justify-end"
        >
          <AppLogoIcon />
        </Link>}
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center bg-white py-10 lg:relative lg:block">
        {/* Logo: Top right on lg, centered on small screens */}
        {!left && <Link
          href={route('home')}
          className="relative z-20 mb-10 flex items-center justify-center lg:absolute lg:top-8 lg:right-8 lg:mb-0 lg:flex lg:justify-end"
        >
          <AppLogoIcon />
        </Link>}
        {/* Centered content */}
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-2 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 h-screen">
          <h1 className="text-primary hidden text-center text-2xl font-bold md:text-3xl lg:mt-4 lg:flex">{title || name}</h1>
          <p className="max-w-md px-2 text-center text-gray-600">
            {description ||
              (typeof quote === 'string'
                ? quote
                : typeof quote === 'object' && quote !== null && 'message' in quote
                  ? quote.message
                  : 'Your One Stop Shop for Premium, Fresh & Affordable Meats Available for Your Daily Consumption.')}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
