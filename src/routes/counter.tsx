import { ADD, SUBTRACT } from '@/stores/slices/counter-slice';
import { RootState } from '@/stores/store';
import { Box, Button, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

export default function CounterPage() {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  return (
    <Box>
      <Text>{value}</Text>
      <Button onClick={() => dispatch(ADD())}>Tambah</Button>
      <Button onClick={() => dispatch(SUBTRACT())}>Kurang</Button>
    </Box>
  );
}
