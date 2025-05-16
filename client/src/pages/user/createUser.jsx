import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { FormInput, SelectInput } from '../../components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';

const CreateUser = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [branchData, setBranchData] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [designation, setDesignation] = useState('');
  const [branchDetails, setBranchDetails] = useState('');

  const navigate = useNavigate();
  const toast = useToast();

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

      const userRole = 'Verifier';

      const userData = {
        firstName,
        lastName,
        email,
        phoneNumber,
        designation,
        branchDetails: branchDetails,
        role: userRole,
      };

      const response = await axiosInstance.post(`user/create`, userData);

      if (response.status === 201) {
        toast({
          title: 'success',
          description: response?.data?.message || 'User Created successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setBtnLoading(false);
        navigate('/user/users');
      }
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'error',
        description: error?.response?.data?.message || 'Failed to create user',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    }
  };

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

  return (
    <Flex w='100%' h='100vh'>
      <Flex
        w='100%'
        h='100%'
        direction='column'
        alignItems='center'
        p='10'
        gap='12'
      >
        <Flex w='100%'>
          <Heading
            color='brand.mainBg'
            fontWeight='semibold'
            textTransform='uppercase'
            textAlign='start'
          >
            Create Verifier
          </Heading>
        </Flex>

        <Flex
          as={chakra.form}
          w='100%'
          p='10'
          direction='column'
          gap='8'
          onSubmit={handleSubmit}
        >
          <Flex w='full'>
            <FormInput
              label='First Name'
              id='firstName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
              label='Last Name'
              id='lastName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setlastName(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Email'
              id='email'
              type='email'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              label='Phone Number'
              id='phoneNumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Designation'
              id='designation'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setDesignation(e.target.value)}
            />
            <SelectInput
              id='branchDetails'
              name='branchDetails'
              validator={{
                required: 'Choose Branch',
              }}
              w='90%'
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
          </Flex>
          <Flex w='95%' justify='space-between'>
            <Button
              w='48%'
              type='button'
              bg={'#EEB82D'}
              color='black'
              mt='4'
              px={{ base: '4', md: '6' }}
              _hover={{ bg: 'yellow.300' }}
              borderRadius='0.7rem'
              size='sm'
              onClick={() => {
                navigate('/user/users');
              }}
            >
              Back
            </Button>
            <Button
              w='48%'
              px={{ base: '4', md: '6' }}
              color='brand.white'
              type='submit'
              mt='4'
              bg='brand.secondaryBg'
              _hover={{ background: '#5B4ED0' }}
              borderRadius='0.7rem'
              size='sm'
              isLoading={btnLoading}
              loadingText='Creating..'
              spinnerPlacement='start'
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateUser;
