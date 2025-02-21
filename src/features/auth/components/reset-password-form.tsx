import brandLogo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import {
  Box,
  BoxProps,
  Field,
  Image,
  Input,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { usePasswordForm } from '../hooks/use-password-form';

export default function ResetPasswordForm(props: BoxProps) {
  const { errors, handleSubmit, isPending, onSubmit, register } =
    usePasswordForm();

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image src={brandLogo} width={'108px'} />
      <Text fontSize={'28px'}>Reset password</Text>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Field.Root invalid={!!errors.oldPassword?.message}>
          <Input
            placeholder="Password"
            type="password"
            {...register('oldPassword')}
          />
          <Field.ErrorText>{errors.oldPassword?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!errors.newPassword?.message}>
          <Input
            placeholder="Confirm password"
            type="password"
            {...register('newPassword')}
          />
          <Field.ErrorText>{errors.newPassword?.message}</Field.ErrorText>
        </Field.Root>
        <Button
          type="submit"
          backgroundColor={'brand'}
          color={'white'}
          disabled={isPending ? true : false}
        >
          {isPending ? <Spinner /> : 'Send'}
        </Button>
      </form>
    </Box>
  );
}
