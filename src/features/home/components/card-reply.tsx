import { Avatar } from '@/components/ui/avatar';
import { ReplyEntity } from '@/entities/reply.entity';
import { Box, Text } from '@chakra-ui/react';

export default function CardReply(reply: ReplyEntity) {
  return (
    <Box
      display={'flex'}
      gap={'16px'}
      borderBottom={'1px solid'}
      borderColor={'outline'}
      padding={'30px 0px'}
    >
      <Avatar
        name={reply.user?.profile?.fullName || ''}
        src={reply.user?.profile?.avatarUrl || ''}
        shape="full"
        size="full"
        width={'50px'}
        height={'50px'}
      />

      <Box display={'flex'} flexDirection={'column'} gap={'4px'}>
        <Box display={'flex'} gap={'4px'}>
          <Text fontWeight={'bold'}>{reply.user?.profile?.fullName}</Text>
          <Text color={'secondary'}>@{reply.user?.username}</Text>
          <Text color={'secondary'}>•</Text>
          <Text color={'secondary'}>
            {new Date(reply.createdAt).getHours()}h
          </Text>
        </Box>
        <Text>{reply.content}</Text>
      </Box>
    </Box>
  );
}
