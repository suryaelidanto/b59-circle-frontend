import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { ReplyResponse } from '@/features/reply/dto/reply';
import { api } from '@/libs/api';
import { useAuthStore } from '@/stores/auth';
import {
  createReplySchema,
  CreateReplySchemaDTO,
} from '@/utils/schemas/reply.schema';
import { Box, Button, Field, Spinner, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

export default function CreateReply() {
  const { threadId } = useParams();
  const {
    user: {
      profile: { fullName, avatarUrl },
    },
  } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateReplySchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(createReplySchema),
  });

  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useMutation<
    ReplyResponse,
    Error,
    CreateReplySchemaDTO
  >({
    mutationKey: ['create-reply'],
    mutationFn: async (data: CreateReplySchemaDTO) => {
      const response = await api.post<ReplyResponse>(
        `/replies/${threadId}`,
        data
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
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: [`threads/${threadId}`],
      });

      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  async function onSubmit(data: CreateReplySchemaDTO) {
    await mutateAsync(data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        display={'flex'}
        flexDirection={'column'}
        borderBottom={'1px solid'}
        borderBottomColor={'outline'}
        padding={'20px 0px'}
      >
        <Box
          display={'flex'}
          alignItems={'center'}
          gap={'20px'}
          padding={'20px 0px'}
        >
          <Avatar
            name={fullName}
            src={avatarUrl || ''}
            shape="full"
            size="full"
            width={'50px'}
            height={'50px'}
          />
          <Field.Root invalid={!!errors.content?.message}>
            <Textarea
              placeholder="What is happening?!"
              {...register('content')}
            />
            <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
          </Field.Root>

          <Button
            type="submit"
            backgroundColor={'brand'}
            color={'white'}
            disabled={isPending ? true : false}
          >
            {isPending ? <Spinner /> : 'Post'}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
