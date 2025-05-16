import {
  Button,
  chakra,
  Flex,
  Heading,
  Text,
  PinInput,
  PinInputField,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = ({ email, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const toast = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/user/verify`,
        {
          email,
          otp,
        }
      );

      if (response.data.status === 'success') {
        toast({
          title: response?.data?.status,
          description: response?.data.message,
          status: response?.data?.status,
          position: 'top',
          duration: 1500,
        });
        setLoading(false);
        onClose();
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: 'Error',
        description: error?.response?.data?.message,
        status: 'error',
        position: 'top',
        duration: 1500,
      });
    }
  };

  return (
    <Flex w='100%' h='100%' direction='column' p='8' gap='6'>
      <Flex w='100%' direction='column' gap='2'>
        <Heading
          textTransform='uppercase'
          color='brand.mainBg'
          fontSize={{ base: '2rem' }}
          textAlign='center'
          border='none'
        >
          Enter OTP
        </Heading>
        <Text textAlign='center' fontWeight='semibold' color='brand.mainBg'>
          Enter the 6-digit OTP sent to your email to reset your password.
        </Text>
      </Flex>
      <Flex
        as={chakra.form}
        direction='column'
        onSubmit={handleSubmit}
        align='center'
        gap='4'
      >
        <HStack>
          <PinInput otp value={otp} onChange={setOtp}>
            <PinInputField bgColor='brand.white' borderColor='brand.mainBg' />
            <PinInputField bgColor='brand.white' borderColor='brand.mainBg' />
            <PinInputField bgColor='brand.white' borderColor='brand.mainBg' />
            <PinInputField bgColor='brand.white' borderColor='brand.mainBg' />
            <PinInputField bgColor='brand.white' borderColor='brand.mainBg' />
            <PinInputField bgColor='brand.white' borderColor='brand.mainBg' />
          </PinInput>
        </HStack>
        <Flex w='100%' gap='5' justify='space-between'>
          <Button
            w='12rem'
            bg='#576798'
            color='brand.white'
            _hover={{ bg: '#576798' }}
          >
            BACK
          </Button>
          <Button
            w='12rem'
            bg='#001553'
            color='brand.white'
            _hover={{ bg: '#4869CC' }}
            type='submit'
            isLoading={loading}
            loadingText='Verifying...'
          >
            SUBMIT
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

VerifyOtp.propTypes = {
  email: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default VerifyOtp;
