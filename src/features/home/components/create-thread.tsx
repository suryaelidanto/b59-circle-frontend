import { galleryAddLogo } from '@/assets/icons';
import { Avatar } from '@/components/ui/avatar';
import { userSession } from '@/utils/fake-datas/session';
import { Box, Button, Image, Input, Textarea } from '@chakra-ui/react';
import { useRef } from 'react';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function CreateThread() {
  const { fullName, avatarUrl } = userSession;
  const inputFileRef = useRef<HTMLInputElement>(null);

  function onClickFile() {
    inputFileRef?.current?.click();
  }

  return (
    <DialogRoot>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={'20px'}
        borderBottom={'1px solid'}
        borderBottomColor={'outline'}
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
        <DialogTrigger asChild>
          <Textarea placeholder="What is happening?!" />
        </DialogTrigger>

        <Button
          variant={'ghost'}
          onClick={onClickFile}
          disabled
          cursor={'disabled'}
        >
          <Image src={galleryAddLogo} width={'27px'} />
        </Button>
        <Input type={'file'} hidden ref={inputFileRef} />

        <Button backgroundColor={'brand'} disabled color={'white'}>
          Post
        </Button>
      </Box>
      <DialogBackdrop />
      <DialogContent>
        <DialogCloseTrigger />
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <DialogBody />
        <DialogFooter />
      </DialogContent>
    </DialogRoot>
  );
}
