import { likeLogo, likeLogoOutline, replyLogoOutline } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import {
  CreateLikeSchemaDTO,
  DeleteLikeSchemaDTO,
} from '@/utils/schemas/like.schema';
import { Box, BoxProps, Button, Image, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Thread } from '../types/posts';

interface CardThreadProps extends BoxProps {
  threadData: Thread;
}

interface LikeResponse {
  message: string;
  data: {
    id: string;
    userId: string;
    threadId: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function CardThread({ threadData }: CardThreadProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function onClickCard() {
    navigate(`/detail/${threadData.id}`);
  }

  const { isPending: isPendingLike, mutateAsync: mutateLike } = useMutation<
    LikeResponse,
    Error,
    CreateLikeSchemaDTO
  >({
    mutationKey: ['like'],
    mutationFn: async (data: CreateLikeSchemaDTO) => {
      const response = await api.post<LikeResponse>('/likes', data);
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
    },
  });

  const { isPending: isPendingUnlike, mutateAsync: mutateUnlike } = useMutation<
    LikeResponse,
    Error,
    DeleteLikeSchemaDTO
  >({
    mutationKey: ['unlike'],
    mutationFn: async (data: DeleteLikeSchemaDTO) => {
      const response = await api.delete<LikeResponse>(
        `/likes/${data.threadId}`
      );
      return response.data;
    },
    onError: (error) => {
      if (isAxiosError(error)) {
        return toaster.create({
          title: error.response?.data.message,
          type: 'error',
        });
      }

      toaster.create({
        title: 'Something went wrong!',
        type: 'error',
      });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['threads'],
      });
    },
  });

  async function onLike(data: CreateLikeSchemaDTO) {
    await mutateLike(data);
  }

  async function onUnlike(data: DeleteLikeSchemaDTO) {
    await mutateUnlike(data);
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
            disabled={isPendingLike || isPendingUnlike}
            onClick={() =>
              threadData.isLiked
                ? onUnlike({ threadId: threadData.id })
                : onLike({ threadId: threadData.id })
            }
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
