import { Flex, Input, Text } from '@chakra-ui/react';

const DateInput = ({ label, id, isRequired, labelColor, ...rest }) => {
  return (
    <Flex direction='column' alignItems='flex-start' w='100%' gap='2'>
      <Text color={labelColor} fontWeight='semibold'>
        {label}
      </Text>
      <Input
        border='2px solid'
        borderColor='#958B8B'
        color='brand.black'
        borderRadius='0.8rem'
        type='date'
        id={id}
        isRequired={isRequired}
        {...rest}
      />
    </Flex>
  );
};

export default DateInput;
