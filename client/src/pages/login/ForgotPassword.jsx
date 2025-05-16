import {
  Button,
  chakra,
  Flex,
  Image,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { LoginInput, MainModal } from '../../components';
import { LoginleftBg } from '../../assets';
import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import VerifyOtp from './VerifyOtp';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4000/api/v1/user/forgot`,
        {
          email,
        }
      );

      if (response.data.status === 'success') {
        setLoading(false);
        onOpen();
        toast({
          title: response?.data?.status,
          description: response?.data.message,
          status: response?.data?.status,
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error',
        description: error?.response?.data?.message,
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    }
  };
  return (
    <Flex w='100dvw' h='100dvh' overflowX='hidden' overflowY='hidden'>
      <Flex
        w='full'
        h='100%'
        justify='center'
        alignItems='center'
        pos='relative'
      >
        <Flex
          as={Image}
          w='100%'
          position='absolute'
          h='100%'
          src={LoginleftBg}
          objectFit='cover'
        />
        <Flex
          w={{ base: '25rem', md: '30rem' }}
          h={{ base: '32rem', lg: '35rem' }}
          bg='brand.white'
          zIndex='1'
          alignItems='center'
          rounded='1rem'
          shadow='lg'
        >
          <Flex
            w='100%'
            h='100%'
            direction='column'
            mt='40'
            p={{ base: '4', lg: '6' }}
            gap={{ base: '2', lg: '0' }}
          >
            <Flex
              direction='column'
              alignItems='center'
              justifyContent='center'
              w='full'
              mb='10'
              gap='2'
            >
              <Text
                fontSize={{ base: '1.7rem', lg: '4xl' }}
                textAlign='justify'
                fontWeight='bold'
                color='#000000CC'
                textTransform='uppercase'
              >
                Forgot Password ?
              </Text>
              <Text
                fontSize={{ base: '1rem', lg: '1.1rem' }}
                textAlign='center'
                color='#000000CC'
              >
                Enter your email and we will sent a OTP to reset your password
                on your mail
              </Text>
            </Flex>
            <Flex
              flexDir='column'
              alignItems='center'
              justifyContent='center'
              as={chakra.form}
              onSubmit={handleSubmit}
            >
              <LoginInput
                type='email'
                id='email'
                placeholder='Email'
                iconColor='#00000099'
                icon={IoMdMail}
                bgColor='brand.white'
                isRequired
                mb='5'
                onChange={(e) => setEmail(e.target.value)}
              />
              <Flex w='full' gap='4'>
                <Button
                  as={Link}
                  to='/'
                  variant='solid'
                  bg='#576798'
                  color='white'
                  justify-content='center'
                  align-items='center'
                  borderRadius='0.7rem'
                  fontSize='1.125rem'
                  fontWeight='bold'
                  w='90%'
                  mt='4'
                  _hover={{ bg: '#776DD5' }}
                >
                  Back
                </Button>
                <Button
                  variant='solid'
                  bg='brand.mainBg'
                  color='white'
                  justify-content='center'
                  align-items='center'
                  borderRadius='0.7rem'
                  fontSize='1.125rem'
                  fontWeight='bold'
                  type='submit'
                  w='90%'
                  mt='4'
                  _hover={{ bg: '#776DD5' }}
                  isLoading={loading}
                  loadingText='Sending...'
                >
                  Submit
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <MainModal isOpen={isOpen} onClose={onClose}>
          <VerifyOtp onClose={onClose} email={email} />
        </MainModal>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
