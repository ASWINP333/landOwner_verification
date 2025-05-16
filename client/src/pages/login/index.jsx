import { Button, chakra, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { LoginInput, PasswordInput } from '../../components';
import { IoMdLock, IoMdMail } from 'react-icons/io';
import { useState } from 'react';
import { LoginleftBg } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../contexts/authContext';
import axiosInstance from '../../config/axiosInstance';

const Login = () => {
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toast = useToast();
  const navigate = useNavigate();
  const authentication = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, status, statusText } = await axiosInstance.post(
        `user/login`,
        {
          email,
          password,
        }
      );

      if (status === 200 && statusText === 'OK') {
        const token = data?.token;
        const user = data?.user;

        authentication.loginIn(token, user, () => {
          if (user?.role === 'user') {
            navigate('/user/plots');
          } else {
            navigate('/user/dashboard');
          }
        });
        toast({
          title: 'success',
          description: data?.message,
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (error) {
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
          w='100%'
          position='absolute'
          h='100%'
          as={Image}
          src={LoginleftBg}
          objectFit='cover'
        />
        <Flex
          w={{ base: '25rem', md: '30rem' }}
          h={{ base: '32rem', lg: '40rem' }}
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
            justify='center'
            p={{ base: '4', lg: '6' }}
            gap={{ base: '2', lg: '0' }}
          >
            <Flex
              direction='column'
              alignItems='center'
              justifyContent='center'
              w='full'
              mb='20'
            >
              <Text
                fontSize={{ base: '1.7rem', lg: '4xl' }}
                textAlign='justify'
                fontWeight='bold'
                color='#000000CC'
                textTransform='uppercase'
              >
                Sign In
              </Text>
              <Text
                fontSize={{ base: '1rem', lg: '1.1rem' }}
                textAlign='justify'
                color='#000000CC'
              >
                Please enter your details to sign in
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
              <PasswordInput
                // type='password'
                id='password'
                placeholder='Password'
                iconColor='#00000099'
                iconLeft={IoMdLock}
                bgColor='brand.white'
                isRequired
                mb='5'
                show={show}
                handleClick={handleClick}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Flex w='full' justifyContent='space-between'>
                <Button
                  as={Link}
                  to='/register'
                  variant='unstyled'
                  color='brand.mainBg'
                >
                  Register
                </Button>
                <Button
                  as={Link}
                  to='/forgot'
                  variant='unstyled'
                  color='brand.mainBg'
                >
                  Forgot Password ?
                </Button>
              </Flex>
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
                w='full'
                mt='4'
                _hover={{ bg: '#776DD5' }}
              >
                Login
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Login;
