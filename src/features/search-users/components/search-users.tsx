import { searchLogoOutline } from '@/assets/icons';
import { InputGroup } from '@/components/ui/input-group';
import { searchUserDatas } from '@/utils/fake-datas/search-users';
import { Box, Image, Input } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import SearchUserCard from './search-user-card';
import UserCardSkeleton from '@/components/skeletons/user-card-skeleton';
import { SearchUser } from '../types/search-user';

export default function SearchUsers() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>('');
  const [searchTextDebounced] = useDebounce(searchText, 500);
  const [searchUserDataInterval, setSearchUserDataInterval] = useState<
    SearchUser[]
  >([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  function getSearchUserDatas() {
    setTimeout(() => {
      setSearchUserDataInterval(searchUserDatas);
      setIsLoading(false);
    }, 1500);
  }

  useEffect(() => {
    getSearchUserDatas();
  }, []);

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

      {isLoading &&
        Array(searchUserDatas.length)
          .fill(0)
          .map((_, index) => <UserCardSkeleton key={index} />)}

      {searchUserDataInterval
        .filter((searchUserData) =>
          searchUserData.fullName
            .toLowerCase()
            .trim()
            .includes(searchTextDebounced.toLowerCase().trim())
        )
        .map((searchUserData) => (
          <SearchUserCard
            searchUserData={searchUserData}
            key={searchUserData.id}
          />
        ))}
    </Box>
  );
}
