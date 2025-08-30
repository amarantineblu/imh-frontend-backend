import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type RegisterForm = {
  surname: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
    surname: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
    });
  };

  return (
    <AuthLayout title="Create an account" description="Enter your details below to create your account">
      <Head title="Register" />
      <form className="flex max-w-5xl min-w-md flex-col gap-4 text-black" onSubmit={submit}>
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label htmlFor="surname">Surname</Label>
            <Input
              id="surname"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              value={data.surname}
              onChange={(e) => setData('surname', e.target.value)}
              disabled={processing}
              placeholder="Surname"
            />
            <InputError message={errors.surname} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="first_name">Name</Label>
            <Input
              id="first_name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="first_name"
              value={data.first_name}
              onChange={(e) => setData('first_name', e.target.value)}
              disabled={processing}
              placeholder="First name"
            />
            <InputError message={errors.first_name} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="last_name">Middle Name</Label>
            <Input
              id="last_name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="last_name"
              value={data.last_name}
              onChange={(e) => setData('last_name', e.target.value)}
              disabled={processing}
              placeholder="Middle name"
            />
            <InputError message={errors.last_name} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              disabled={processing}
              placeholder="email@example.com"
            />
            <InputError message={errors.email} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              tabIndex={3}
              autoComplete="new-password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              disabled={processing}
              placeholder="Password"
            />
            <InputError message={errors.password} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              tabIndex={4}
              autoComplete="new-password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              disabled={processing}
              placeholder="Confirm password"
            />
            <InputError message={errors.password_confirmation} />
          </div>

          <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </div>

        <div className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <TextLink href={route('login')} className="hover:text-primary text-gray-600" tabIndex={6}>
            Log in
          </TextLink>
        </div>
      </form>
    </AuthLayout>
  );
}
