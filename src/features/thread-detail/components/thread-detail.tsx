import CardReply from '@/features/home/components/card-reply';
import CardThreadDetail from '@/features/home/components/card-thread-detail';
import CreateThread from '@/features/home/components/create-thread';
import { postDatas } from '@/utils/fake-datas/posts';
import { Box } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

export default function PostDetail() {
  const { id } = useParams();
  const postData = postDatas.find((post) => post.id === id)!;

  return (
    <Box>
      <CardThreadDetail postData={postData} />
      <CreateThread />
      {postData?.replies?.map((reply) => <CardReply replyData={reply} />)}
    </Box>
  );
}
