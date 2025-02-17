import { likeLogo, likeLogoOutline, replyLogoOutline } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useReducer } from 'react';
import { Thread } from '../types/posts';

interface CardThreadProps extends BoxProps {
  threadData: Thread;
}

export default function CardThread({ threadData }: CardThreadProps) {
  const navigate = useNavigate();
  const [, forceUpdate] = useReducer((state) => state + 1, 0);

  function onClickCard() {
    navigate(`/detail/${threadData.id}`);
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
        name={threadData.user.fullName}
        src={threadData.user.avatarUrl}
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'bold'}>{threadData.user.fullName}</Text>
          <Text color={'secondary'}>@{threadData.user.username}</Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>
            {new Date(threadData.createdAt).getHours()}h
          </Text>
        </Box>
        <Text cursor={'pointer'} onClick={onClickCard}>
          {threadData.content}
        </Text>
        <Image
          objectFit={'contain'}
          maxHeight={'300px'}
          maxWidth={'300px'}
          src={threadData.images}
        />
        <Box display={'flex'}>
          <Button
            variant={'ghost'}
            display={'flex'}
            gap={'4px'}
            onClick={() => {
              threadData.isLiked = !threadData.isLiked;
              forceUpdate();
            }}
          >
            <Image
              src={threadData.isLiked ? likeLogo : likeLogoOutline}
              width={'27px'}
            />
            <Text>{threadData.likesCount}</Text>
          </Button>

          <Button variant={'ghost'} display={'flex'} gap={'4px'}>
            <Image src={replyLogoOutline} width={'27px'} />
            <Text>{threadData.repliesCount}</Text>
            <Text>Replies</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
