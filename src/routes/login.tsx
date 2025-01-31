import LoginForm from '@/features/auth/components/login-form';
import { Box } from '@chakra-ui/react';

export default function LoginPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} marginTop={'128px'}>
      <LoginForm width={'412px'} />
    </Box>
  );
}
