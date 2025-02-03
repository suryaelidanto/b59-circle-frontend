import ResetPasswordForm from '@/features/auth/components/reset-password-form';
import { Box } from '@chakra-ui/react';

export default function ResetPasswordPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} marginTop={'128px'}>
      <ResetPasswordForm width={'412px'} />
    </Box>
  );
}
