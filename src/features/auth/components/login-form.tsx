import {
  Box,
  Field,
  Image,
  Input,
  Text,
  Link as ChakraLink,
  BoxProps,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import brandLogo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchemaDTO } from '@/utils/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import dummyUsers from '@/utils/fake-datas/user.json';
import { toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';

export default function LoginForm(props: BoxProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  async function onSubmit(data: LoginSchemaDTO) {
    const user = dummyUsers.find(
      (dummyUser) => dummyUser.email === watch('email')
    );

    if (!user)
      return toaster.create({
        title: 'Email/password is wrong!',
        type: 'error',
      });

    const isPasswordCorrect = user?.password === watch('password');

    if (!isPasswordCorrect)
      return toaster.create({
        title: 'Email/password is wrong!',
        type: 'error',
      });

    toaster.create({
      title: 'Login success!',
      type: 'success',
    });

    console.log(data);
    navigate({ pathname: '/' });

    // send to backend
    // await axios.post("https://backend-circle.com/api/v1/login", data)
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image src={brandLogo} width={'108px'} />
      <Text fontSize={'28px'}>Login to Circle</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Field.Root invalid={!!errors.email?.message}>
          <Input placeholder="Email" {...register('email')} />
          <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.password?.message}>
          <Input
            placeholder="Password"
            type="password"
            {...register('password')}
          />
          <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
        </Field.Root>
        <Box display={'flex'} justifyContent={'flex-end'}>
          <ChakraLink asChild>
            <Link to={'/forgot-password'}>Forgot password?</Link>
          </ChakraLink>
        </Box>
        <Button backgroundColor={'brand'} color={'white'} type="submit">
          Login
        </Button>
      </form>
      <Text as="span">
        Don't have an account yet?{' '}
        <ChakraLink asChild color={'brand'}>
          <Link to={'/register'}>Create account</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
