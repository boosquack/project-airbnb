import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import * as z from 'zod';

import api from '@/api';
import { useAuth } from '@/components/AuthProvider';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Input,
  Separator,
} from '@/components/ui';
import type { AuthResponse } from '@/types/api';

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFormData = z.infer<typeof signInFormSchema>;

const SignInForm = () => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get('redirect') || '/listings';

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      const response = await api.post<AuthResponse>('/api/signin', data);
      setToken(response.data.accessToken);
      setUser(response.data.user);
      navigate(redirectTo, { replace: true });
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      setError('root', {
        message: error.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <Card className="mx-auto w-[500px]">
      <CardHeader>
        <h2 className="text-center text-2xl">Sign In</h2>
        <p className="text-center text-muted-foreground">
          Sign in using your email and password
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4">
          <div>
            <Input {...register('email')} placeholder="name@example.com" />
            {errors['email'] && (
              <div className="mt-2 text-sm text-red-500">
                {errors['email'].message}
              </div>
            )}
          </div>

          <div>
            <Input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
            />
            {errors['password'] && (
              <div className="mt-2 text-sm text-red-500">
                {errors['password'].message}
              </div>
            )}
          </div>

          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Loading...' : 'Sign In'}
          </Button>

          {errors.root && (
            <div className="text-center text-sm text-red-500">
              {errors.root.message}
            </div>
          )}

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
