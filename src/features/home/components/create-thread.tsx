import { galleryAddLogo } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { toaster } from '@/components/ui/toaster';
import { api } from '@/libs/api';
import { userSession } from '@/utils/fake-datas/session';
import {
  createThreadSchema,
  CreateThreadSchemaDTO,
} from '@/utils/schemas/thread.schema';
import {
  Box,
  Button,
  Field,
  Image,
  Input,
  Spinner,
  Textarea,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface ThreadResponse {
  message: string;
  data: {
    id: string;
    content: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export default function CreateThread() {
  const { fullName, avatarUrl } = userSession;
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateThreadSchemaDTO>({
    mode: 'onChange',
    resolver: zodResolver(createThreadSchema),
  });

  const {
    ref: registerImagesRef,
    onChange: registerImagesOnChange,
    ...restRegisterImages
  } = register('images');

  const queryClient = useQueryClient();

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  const { isPending, mutateAsync } = useMutation<
    ThreadResponse,
    Error,
    CreateThreadSchemaDTO
  >({
    mutationKey: ['create-threads'],
    mutationFn: async (data: CreateThreadSchemaDTO) => {
      const formData = new FormData();
      formData.append('content', data.content);
      formData.append('images', data.images[0]);

      const response = await api.post<ThreadResponse>('/threads', formData);
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
        queryKey: ['threads'],
      });

      toaster.create({
        title: data.message,
        type: 'success',
      });
    },
  });

  async function onSubmit(data: CreateThreadSchemaDTO) {
    await mutateAsync(data);
    reset();
    setPreviewURL('');
  }

  function handlePreview(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreviewURL(url);
    }
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
            src={avatarUrl}
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
          <Button variant={'ghost'} onClick={onClickFile}>
            <Image src={galleryAddLogo} width={'27px'} />
          </Button>
          <Input
            type={'file'}
            hidden
            {...restRegisterImages}
            onChange={(e) => {
              handlePreview(e);
              registerImagesOnChange(e);
            }}
            ref={(e) => {
              registerImagesRef(e);
              inputFileRef.current = e;
            }}
          />

          <Button
            type="submit"
            backgroundColor={'brand'}
            color={'white'}
            disabled={isPending ? true : false}
          >
            {isPending ? <Spinner /> : 'Post'}
          </Button>
        </Box>
        <Image
          objectFit={'contain'}
          maxHeight={'300px'}
          maxWidth={'300px'}
          src={previewURL ?? ''}
        />
      </Box>
    </form>
  );
}
