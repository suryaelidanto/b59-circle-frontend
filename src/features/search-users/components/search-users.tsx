import { searchLogoOutline } from '@/assets/icons';
import { InputGroup } from '@/components/ui/input-group';
import { Box, Image, Input, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { SearchUser } from '../types/search-user';
import SearchUserCard from './search-user-card';
import { api } from '@/libs/api';

export default function SearchUsers() {
  const [searchText, setSearchText] = useState<string>('');
  const [searchTextDebounced] = useDebounce(searchText, 500);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery<SearchUser[]>({
    queryKey: ['search-users'],
    queryFn: async () => {
      const response = await api.get(`/users/search?q=${searchTextDebounced}`);
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [searchTextDebounced, refetch]);

  return (
    <Box>
      <InputGroup
        width={'100%'}
        startElement={<Image src={searchLogoOutline} width={'20px'} />}
      >
        <Input
          placeholder="Username"
          borderRadius={'xl'}
          _focus={{
            borderColor: 'brand',
          }}
          onChange={handleChange}
        />
      </InputGroup>

      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {users?.map((user) => (
            <SearchUserCard searchUserData={user} key={user.id} />
          ))}
        </>
      )}
    </Box>
  );
}
