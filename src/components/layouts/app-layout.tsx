import brandLogo from '@/assets/logo.svg';
import { useAuthStore } from '@/stores/auth';
import { NAV_LINK_MENU } from '@/utils/constants/nav-link-menu';
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
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Avatar } from '../ui/avatar';
import { logoutLogo } from '@/assets/icons';
import Cookies from 'js-cookie';

export default function AppLayout() {
  const username = useAuthStore((state) => state.user.username);
  if (!username) return <Navigate to={'/login'} />;

  return (
    <Grid templateColumns="repeat(4, 1fr)">
      <GridItem colSpan={1} display={{ base: 'none', lg: 'block' }}>
        <LeftBar />
      </GridItem>

      <GridItem
        colSpan={{ base: 4, lg: 2 }}
        padding={'40px'}
        borderX={'1px solid'}
        borderColor={'outline'}
      >
        <Outlet />
      </GridItem>

      <GridItem colSpan={1} display={{ base: 'none', lg: 'block' }}>
        <RightBar />
      </GridItem>
    </Grid>
  );
}

function LeftBar(props: BoxProps) {
  const { pathname } = useLocation();
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    Cookies.remove('token');
    navigate('/login');
  }

  return (
    <Box height={'100vh'} padding={'40px'} {...props}>
      <Image src={brandLogo} width={'220px'} padding={'0px 16px'} />
      <Box
        marginTop={'22px'}
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
        <Button onClick={onLogout} variant={'ghost'}>
          <Image src={logoutLogo} width={'27px'} />
          <Text>Logout</Text>
        </Button>
      </Box>
    </Box>
  );
}

function RightBar(props: BoxProps) {
  const {
    username,
    profile: { fullName, bio, bannerUrl, avatarUrl },
  } = useAuthStore((state) => state.user);

  return (
    <Box height={'100vh'} padding={'40px'} {...props}>
      <Card.Root size="sm" backgroundColor={'background'}>
        <Card.Header>
          <Heading size="2xl">My Profile</Heading>
        </Card.Header>
        <Card.Body>
          <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
            <Box
              backgroundImage={`url("${bannerUrl}")`}
              padding={'15px'}
              borderRadius={'lg'}
            >
              <Avatar
                name={fullName}
                src={
                  avatarUrl ||
                  `https://api.dicebear.com/9.x/notionists/svg?seed=${fullName}`
                }
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
                <Text fontWeight={'bold'}>{200}</Text>
                <Text>Following</Text>
              </Box>
              <Box display={'flex'} gap={'5px'}>
                <Text fontWeight={'bold'}>{100}</Text>
                <Text>Followers</Text>
              </Box>
            </Box>
          </Box>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
