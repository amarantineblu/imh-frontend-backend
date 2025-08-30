import AuthLayoutTemplate from '@/layouts/auth/auth-split-layout';

export default function AuthLayout({ children, title, description, left, ...props }: { children: React.ReactNode; title: string; description: string; left?: boolean }) {
  return (
    <AuthLayoutTemplate title={title} description={description} left={left} {...props}>
      {children}
    </AuthLayoutTemplate>
  );
}
