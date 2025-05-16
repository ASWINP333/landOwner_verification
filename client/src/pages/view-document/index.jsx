import { Flex, Image, Text } from '@chakra-ui/react';
import { Logo, SampleDoc } from '../../assets';

const ViewDocument = () => {
  return (
    <Flex w='100' h='100vh'>
      <Flex
        w='100vw'
        h='100%'
        direction='column'
        alignItems='center'
        gap='12'
        pos='relative'
      >
        <Flex pos='absolute' top='0' left='0'>
          <Image src={Logo} w='10rem' />
        </Flex>
        <Flex w='100%' h='100%'>
          <Flex
            w='60%'
            alignItems='center'
            justify='center'
            direction='column'
            gap='8'
          >
            <Flex
              w='25rem'
              h='15rem'
              bg='#333169'
              shadow='xl'
              rounded='1rem'
              p='4'
              direction='column'
              gap='2'
            >
              <Text
                fontSize='1.4rem'
                fontWeight='bold'
                color='white'
                textAlign='center'
              >
                Document Details
              </Text>
              <MainDataRow data='Name :' value='Test Document' />
              <MainDataRow data='Doc Type :' value='Test' />
              <MainDataRow data='Branch :' value='Kerala' />
            </Flex>
            <Flex
              w='25rem'
              h='15rem'
              bg='#333169'
              shadow='xl'
              rounded='1rem'
              p='4'
              direction='column'
              gap='2'
            >
              <Text
                fontSize='1.4rem'
                fontWeight='bold'
                color='white'
                textAlign='center'
              >
                Blockchain Details
              </Text>
              <MainDataRow data='Block No :' value='7859409' />
              <Flex direction='column' gap='2'>
                <Text
                  fontSize='1.2rem'
                  fontWeight='semibold'
                  color='white'
                  textAlign='center'
                >
                  Block Hash
                </Text>
                <Text
                  fontSize='1rem'
                  fontWeight='semibold'
                  color='white'
                  textAlign='center'
                >
                  0xe6fef3816356b617b33f1e00c496cb4988f049e44ce052cf488206df2a7d3d31
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex w='40%' h='100%'>
            <Flex
              w='full'
              h='full'
              p='5'
              bg='#2A264E'
              borderRadius='5rem 0 5rem 0'
              alignItems='center'
              justify='center'
            >
              <Image src={SampleDoc} h='38rem' />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const MainDataRow = ({ data, value }) => (
  <Flex
    flexDir='row'
    w='100%'
    justifyContent='space-between'
    align-items='flex-start'
    p='1'
    gap={{ base: '0.5rem', md: '0.75rem' }}
    h='auto'
    fontSize={{ base: '0.775rem', md: '1rem' }}
    color='brand.white'
    fontWeight='normal'
  >
    <Flex>{data}</Flex>
    <Flex>{value}</Flex>
  </Flex>
);

export default ViewDocument;
