import { Box, Button, Image, Text } from '@chakra-ui/react';
import ThreadDetail from '@/features/thread-detail/components/thread-detail';
import { arrowLeftLogo } from '@/assets/icons';
import { useNavigate } from 'react-router-dom';

export default function ThreadDetailPage() {
  const navigate = useNavigate();

  function onBack() {
    navigate('/');
  }

  return (
    <Box>
      <Box display={'flex'} gap={'10px'}>
        <Button
          onClick={onBack}
          variant={'ghost'}
          display={'flex'}
          gap={'4px'}
          color={'secondary'}
        >
          <Image src={arrowLeftLogo} width={'27px'} />
        </Button>
        <Text fontSize={'2xl'}>Status</Text>
      </Box>
      <ThreadDetail />
    </Box>
  );
}
