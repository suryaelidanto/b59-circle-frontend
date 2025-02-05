import { likeLogo, replyLogoOutline } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Post } from '../types/posts';

interface CardThreadProps extends BoxProps {
  postData: Post;
}

export default function CardThread({ postData }: CardThreadProps) {
  const navigate = useNavigate();

  function onClickCard() {
    navigate(`/detail/${postData.id}`);
  }

  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'16px 0px'}
    >
      <Avatar
        name={postData.user.fullName}
        src={postData.user.avatarUrl}
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'bold'}>{postData.user.fullName}</Text>
          <Text color={'secondary'}>@{postData.user.username}</Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>{postData.createdAt.getHours()}h</Text>
        </Box>
        <Text cursor={'pointer'} onClick={onClickCard}>
          {postData.content}
        </Text>
        <Box display={'flex'}>
          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={likeLogo} width={'27px'} />
            <Text>{postData.likesCount}</Text>
          </Button>

          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={replyLogoOutline} width={'27px'} />
            <Text>{postData.repliesCount}</Text>
            <Text>Replies</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
