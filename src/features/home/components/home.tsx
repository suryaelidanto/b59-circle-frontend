import { Box } from '@chakra-ui/react';
import CardThread from './card-thread';
import CreateThread from './create-thread';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Thread } from '../types/posts';

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([]);

  async function getThreads() {
    const response = await axios.get('http://localhost:3000/threads');
    setThreads(response.data as Thread[]);
  }

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <Box>
      <CreateThread />
      <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
        {threads?.map((thread) => (
          <CardThread threadData={thread} key={thread.id} />
        ))}
      </Box>
    </Box>
  );
}
