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

export default function RegisterForm(props: BoxProps) {
  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} {...props}>
      <Image src={brandLogo} width={'108px'} />
      <Text fontSize={'28px'}>Create an Account to Circle</Text>
      <Field.Root>
        <Input placeholder="Full Name" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
      <Field.Root>
        <Input placeholder="Email/Username" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
      <Field.Root>
        <Input placeholder="Password" type="password" />
        <Field.ErrorText>This is an error text</Field.ErrorText>
      </Field.Root>
      <Button backgroundColor={'brand'} color={'white'}>
        Register
      </Button>
      <Text as="span">
        Already have account?{' '}
        <ChakraLink asChild color={'brand'}>
          <Link to={'/login'}>Login</Link>
        </ChakraLink>
      </Text>
    </Box>
  );
}
