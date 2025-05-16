import {
  Button,
  chakra,
  Flex,
  Heading,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { FormInput } from '../../components';
import { useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CreateBranch = () => {
  const [bId, setBId] = useState('');
  const [branchName, setBranchName] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);

      const branchData = {
        branchName: branchName,
        address: address,
        bId: bId,
      };

      const response = await axiosInstance.post(`branch/create`, branchData);

      if (response.status === 201) {
        toast({
          title: 'success',
          description: response?.data?.message || 'Branch Created successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setloading(false);
        navigate('/user/branches');
      }
    } catch (error) {
      setloading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to create Branch',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
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
            Create branch
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
              label='Branch ID'
              id='bId'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setBId(e.target.value)}
            />
            <FormInput
              label='Branch Name'
              id='branchname'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setBranchName(e.target.value)}
            />
          </Flex>
          <Flex direction='column' gap='2' w='full'>
            <Text color='brand.mainBg' fontWeight='semibold'>
              Address
            </Text>
            <Textarea
              size='sm'
              border='2px solid'
              borderColor='#958B8B'
              w='95%'
              color='brand.black'
              borderRadius='0.8rem'
              onChange={(e) => setAddress(e.target.value)}
            />
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
                navigate('/user/institutions');
              }}
            >
              Back
            </Button>
            <Button
              w='48%'
              px={{ base: '4', md: '6' }}
              bg='brand.secondaryBg'
              color='brand.white'
              type='submit'
              mt='4'
              _hover={{ background: '#5B4ED0' }}
              borderRadius='0.7rem'
              size='sm'
              isLoading={loading}
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

export default CreateBranch;
