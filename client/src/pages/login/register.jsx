import { Button, chakra, Flex, Image, Text, useToast } from '@chakra-ui/react';
import { FormInput, SelectInput } from '../../components';
import { useEffect, useState } from 'react';
import { LoginleftBg } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';

const Register = () => {
  const [btnLoading, setBtnLoading] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [branchDetails, setBranchDetails] = useState('');
  const [password, setPassword] = useState('');

  const [branchData, setBranchData] = useState([]);

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getBranchData();
  }, []);

  const getBranchData = async () => {
    try {
      const response = await axiosInstance.get(`branch/getAll`);
      if (response?.data?.status === 'success') {
        setBranchData(response?.data?.branches);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       const { data, status, statusText } = await axiosInstance.post(
  //         `user/login`,
  //         {
  //           email,
  //           password,
  //         }
  //       );

  //       if (status === 200 && statusText === 'OK') {
  //         const token = data?.token;
  //         const user = data?.user;

  //         authentication.loginIn(token, user, () => {
  //           navigate('/user/dashboard');
  //         });

  //         toast({
  //           title: 'success',
  //           description: data?.message,
  //           status: 'success',
  //           position: 'top',
  //           duration: 1500,
  //           isClosable: true,
  //         });
  //       }
  //     } catch (error) {
  //       toast({
  //         title: 'Error',
  //         description: error?.response?.data?.message,
  //         status: 'error',
  //         position: 'top',
  //         duration: 1500,
  //         isClosable: true,
  //       });
  //     }
  //   };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // You can adjust this to your country format
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phoneNumber)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit phone number.',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
      return;
    }
    try {
      setBtnLoading(true);
      const userData = {
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        designation: 'user',
        branchDetails: branchDetails,
      };

      const response = await axiosInstance.post(`user/register`, userData);

      if (response.status === 201) {
        toast({
          title: 'success',
          description:
            response?.data?.message || 'User Registration successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setBtnLoading(false);
        navigate('/login');
      }
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to register user',
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
            >
              <Text
                fontSize={{ base: '1.7rem', lg: '4xl' }}
                textAlign='justify'
                fontWeight='bold'
                color='#000000CC'
                textTransform='uppercase'
              >
                Sign Up
              </Text>
            </Flex>
            <Flex
              flexDir='column'
              alignItems='center'
              justifyContent='center'
              as={chakra.form}
              onSubmit={handleSubmit}
            >
              <FormInput
                label='First Name'
                id='firstName'
                type='text'
                isRequired={true}
                w='100%'
                labelColor='brand.mainBg'
                onChange={(e) => setFirstName(e.target.value)}
              />
              <FormInput
                label='Last Name'
                id='lastName'
                type='text'
                isRequired={true}
                w='100%'
                labelColor='brand.mainBg'
                onChange={(e) => setlastName(e.target.value)}
              />
              <FormInput
                label='Email'
                id='email'
                type='email'
                isRequired={true}
                w='100%'
                labelColor='brand.mainBg'
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormInput
                label='Password'
                id='email'
                type='password'
                isRequired={true}
                w='100%'
                labelColor='brand.mainBg'
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormInput
                label='Phone Number'
                id='phoneNumber'
                type='text'
                isRequired={true}
                w='100%'
                labelColor='brand.mainBg'
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <SelectInput
                id='branchDetails'
                name='branchDetails'
                validator={{
                  required: 'Choose Branch',
                }}
                w='100%'
                options={branchData.map((item) => ({
                  label: item?.branchName,
                  value: item?._id,
                }))}
                optionProps={{
                  background: '#2A264E',
                  color: '#ffffff',
                }}
                onChange={(e) => setBranchDetails(e.target.value)}
              >
                Branch
              </SelectInput>
              <Flex w='full' justifyContent='flex-end'>
                <Button
                  as={Link}
                  to='/login'
                  variant='unstyled'
                  color='brand.mainBg'
                >
                  Already have an Account ?
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
                isLoading={btnLoading}
                loadingText='Loading...'
              >
                Sign Up
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Register;
