import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
  const { auth } = usePage<SharedData>().props;

  return (
    <>
      <Head title="Ibiyeomie Meat house">
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
      </Head>
      <div className="center bg-white">
        <header className="container flex w-full justify-between py-2 not-has-[nav]:hidden">
          <img src="/img/ibmh.svg" alt="Ibiyeomie Meat house" width={150} height={50} className="h-10 w-auto" />
          <nav className="flex items-center justify-end gap-4">
            {/* <Link href={route('business.getRegister')}>
                <Button size="lg">step</Button>
              </Link> */}
            {auth.user ? (
              <Link href={route('dashboard')}>
                <Button size="lg">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href={route('login')}>
                  <Button size="lg">Log in</Button>
                </Link>
                <Link href={route('business.getRegister')}>
                  <Button variant="outline" size="lg">
                    Register
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </header>
      </div>
      <div
        className="relative flex w-full flex-1 items-center"
        style={{
          backgroundImage: "url('/img/bg-home.svg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: 'calc(100vh - 64px)', // assuming header is ~64px tall
        }}
      >
        <div className="relative z-10 container space-y-4 text-left text-3xl font-bold text-white">
          <h1>
            Premium, Fresh & Affordable <br /> Meats Available for Your <br /> Consumption
          </h1>
          <p>Directly from farms to you — quality cuts of beef, chicken, goat meat, and more</p>
          <Link href={route('login')}>
            <Button size="lg" className="text-primary rounded-full bg-white hover:bg-gray-200">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
