import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
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

const signUpFormSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const SignUpForm = () => {
  const { setToken } = useAuth();

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post('/api/signup', {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      setToken(response.data.accessToken);
    } catch (e) {
      setError('root', {
        message: e.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <Card className='mx-auto w-[500px]'>
      <CardHeader>
        <h2 className='text-center text-2xl'>Sign Up</h2>
        <p className='text-center text-muted-foreground'>
          Create an account to get started
        </p>
        <Separator />
      </CardHeader>
      <CardContent>
        <form className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <Input {...register('firstName')} placeholder='First name' />
              {errors['firstName'] && (
                <div className='mt-2 text-sm text-red-500'>
                  {errors['firstName'].message}
                </div>
              )}
            </div>
            <div className='flex-1'>
              <Input {...register('lastName')} placeholder='Last name' />
              {errors['lastName'] && (
                <div className='mt-2 text-sm text-red-500'>
                  {errors['lastName'].message}
                </div>
              )}
            </div>
          </div>

          <div>
            <Input {...register('email')} placeholder='name@example.com' />
            {errors['email'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['email'].message}
              </div>
            )}
          </div>

          <div>
            <Input
              {...register('password')}
              type='password'
              placeholder='Password (min 8 characters)'
            />
            {errors['password'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </div>
            )}
          </div>

          <div>
            <Input
              {...register('confirmPassword')}
              type='password'
              placeholder='Confirm password'
            />
            {errors['confirmPassword'] && (
              <div className='mt-2 text-sm text-red-500'>
                {errors['confirmPassword'].message}
              </div>
            )}
          </div>

          <Button disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>

          {errors.root && (
            <div className='text-center text-sm text-red-500'>
              {errors.root.message}
            </div>
          )}

          <p className='text-center text-sm text-muted-foreground'>
            Already have an account?{' '}
            <Link to='/signin' className='text-primary hover:underline'>
              Sign in
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
