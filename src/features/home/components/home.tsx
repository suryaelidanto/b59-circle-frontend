import { Box } from '@chakra-ui/react';
import CardThread from './card-thread';
import CreateThread from './create-thread';
import { postDatas } from '@/utils/fake-datas/posts';

export default function Home() {
  return (
    <Box>
      <CreateThread />
      <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
        {postDatas.map((postData) => (
          <CardThread postData={postData} key={postData.id} />
        ))}
      </Box>
    </Box>
  );
}
