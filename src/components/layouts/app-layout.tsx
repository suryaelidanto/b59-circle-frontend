import brandLogo from '@/assets/logo.svg';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link-menu';
import { isLogin, userSession } from '@/utils/fake-datas/session';
import {
  Box,
  BoxProps,
  Button,
  Card,
  Link as ChakraLink,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Avatar } from '../ui/avatar';

export default function AppLayout() {
  if (!isLogin) return <Navigate to={'/login'} />;

  return (
    <Grid templateColumns="repeat(4, 1fr)">
      <GridItem colSpan={1}>
        <LeftBar />
      </GridItem>

      <GridItem
        colSpan={2}
        padding={'40px'}
        borderX={'1px solid'}
        borderColor={'outline'}
      >
        <Outlet />
      </GridItem>

      <GridItem colSpan={1}>
        <RightBar />
      </GridItem>
    </Grid>
  );
}

function LeftBar(props: BoxProps) {
  const { pathname } = useLocation();

  return (
    <Box height={'100vh'} padding={'40px'} {...props}>
      <Image src={brandLogo} width={'220px'} padding={'0px 16px'} />
      <Box
        marginTop={'22px'}
        backgroundColor={'black'}
        display={'flex'}
        flexDirection={'column'}
        gap={'8px'}
      >
        {NAV_LINK_MENU.map(({ label, logo, path }, index) => (
          <ChakraLink
            asChild
            display={'flex'}
            gap={'16px'}
            alignItems={'center'}
            padding={'16px 20px'}
            key={index}
          >
            <Link to={path}>
              <Image
                src={pathname === path ? logo.fill : logo.outline}
                width={'27px'}
              />
              <Text>{label}</Text>
            </Link>
          </ChakraLink>
        ))}
      </Box>
    </Box>
  );
}

function RightBar(props: BoxProps) {
  const {
    avatarUrl,
    backgroundUrl,
    followersCount,
    followingsCount,
    fullName,
    username,
    bio,
  } = userSession;

  return (
    <Box height={'100vh'} padding={'40px'} {...props}>
      <Card.Root size="sm" backgroundColor={'background'}>
        <Card.Header>
          <Heading size="2xl">My Profile</Heading>
        </Card.Header>
        <Card.Body>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Box
              backgroundImage={`url("${backgroundUrl}")`}
              padding={'15px'}
              borderRadius={'lg'}
            >
              <Avatar
                name={fullName}
                src={avatarUrl}
                shape="full"
                size="full"
              />
            </Box>
            <Button backgroundColor={'brand'} color={'white'}>
              Edit Profile
            </Button>
          </Box>

          <Box
            display={'flex'}
            flexDirection={'column'}
            gap={'5px'}
            marginTop={'20px'}
          >
            <Text>{fullName}</Text>
            <Text>@{username}</Text>
            <Text>{bio}</Text>
            <Box display={'flex'} gap={'5px'}>
              <Box display={'flex'} gap={'5px'}>
                <Text fontWeight={'bold'}>{followingsCount}</Text>
                <Text>Following</Text>
              </Box>
              <Box display={'flex'} gap={'5px'}>
                <Text fontWeight={'bold'}>{followersCount}</Text>
                <Text>Followers</Text>
              </Box>
            </Box>
          </Box>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
