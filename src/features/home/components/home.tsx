import { api } from '@/libs/api';
import { Box, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import CardThread from './card-thread';
import CreateThread from './create-thread';
import { Thread } from '../types/posts';
import { Spinner } from '@chakra-ui/react';

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
          {threads?.map((thread) => (
            <CardThread threadData={thread} key={thread.id} />
          ))}
        </Box>
      )}
    </Box>
  );
}
