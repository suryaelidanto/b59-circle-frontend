import { Thread } from '@/features/thread/types/thread';
import { api } from '@/libs/api';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import CardThread from './card-thread';
import CreateThread from './create-thread';

export default function Home() {
  const {
    data: threads,
    isLoading,
    isError,
    failureReason,
  } = useQuery<Thread[]>({
    queryKey: ['threads'],
    queryFn: async () => {
      const response = await api.get('/threads');
      return response.data;
    },
  });

  return (
    <Box>
      <CreateThread />
      {isError && <Text color={'red'}>{failureReason?.message}</Text>}
      {isLoading ? (
        <Box display={'flex'} justifyContent={'center'} paddingY={50}>
          <Spinner />
        </Box>
      ) : (
        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          {threads?.map((thread) => <CardThread {...thread} key={thread.id} />)}
        </Box>
      )}
    </Box>
  );
}
