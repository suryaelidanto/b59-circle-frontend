import { useCounterContext } from '@/context/counter/counter';
import { ActionTypes } from '@/context/counter/counter.type';
import { Box, Button, Text } from '@chakra-ui/react';

export default function CounterPage() {
  return (
    <Box display={'flex'} justifyContent={'center'} marginTop={'128px'}>
      <CounterDisplay />
      <CounterAdd />
      <CounterSubtract />
    </Box>
  );
}

function CounterDisplay() {
  const { state } = useCounterContext()!;

  return <Text>{state.counter}</Text>;
}

function CounterAdd() {
  const { dispatch } = useCounterContext()!;

  return (
    <Button
      onClick={() => {
        dispatch({
          type: ActionTypes.ADD,
        });
      }}
    >
      Tambah
    </Button>
  );
}

function CounterSubtract() {
  const { dispatch } = useCounterContext()!;

  return (
    <Button
      onClick={() => {
        dispatch({
          type: ActionTypes.SUBTRACT,
        });
      }}
    >
      Kurang
    </Button>
  );
}
