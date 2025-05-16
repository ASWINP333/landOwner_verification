import {
  Button,
  chakra,
  Flex,
  Heading,
  Img,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//   import { baseURL } from '../config';
import { MainLogo, MainLogoDark } from '../../assets';
import axiosInstance from '../../config/axiosInstance';
import { FormInput, SelectInput } from '../../components';

const Verify = () => {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState([]);
  const [branchId, setBranchId] = useState('');
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { docId } = event.target.elements;
    const id = docId.value;

    if (id && branchId) {
      navigate(`/document?docId=${id}&bId=${branchId}`);
    } else {
      toast({
        title: 'All the fields are required',
        status: 'warning',
        isClosable: true,
        position: 'top',
        variant: 'top-accent',
      });
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getBranches();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBranches = async () => {
    try {
      const { data, status, statusText } =
        await axiosInstance.get(`branch/getAll`);

      if (status === 200 && statusText === 'OK') {
        console.log(data);

        setResponseData(data?.branches);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Flex
      w='100dvw'
      h='100dvh'
      overflowX='hidden'
      overflowY='hidden'
      direction={{ base: 'colomn', lg: 'row' }}
    >
      <Flex w='100%'>
        <Flex
          w={{ base: '0', lg: '50%' }}
          bg='brand.dark'
          borderTopRightRadius='20rem'
          justifyContent='center'
          direction='column'
          alignItems='center'
          gap='24'
          display={{ base: 'none', lg: 'flex' }}
        >
          {/* <Flex gap='3' alignItems='center'>
            <Text
              color='brand.light'
              fontSize='1.6rem'
              fontWeight='bold'
              textTransform='uppercase'
            >
              LandOwner Verifier
            </Text>
          </Flex> */}
          <Flex h='20rem' w='20rem' justifyContent='center'>
            <Img src={MainLogoDark} objectFit='contain' />
          </Flex>
        </Flex>
        <Flex w={{ base: 'full', lg: '50%' }}>
          <Flex
            w='100%'
            direction='column'
            alignItems='center'
            gap='5'
            justify='center'
            mb={{ base: '32', lg: '0' }}
          >
            <Img
              src={MainLogo}
              display={{ base: 'flow', lg: 'none' }}
              w={{ base: '9rem', md: '10rem' }}
            />
            <Heading
              fontSize={{ base: '2rem', md: '2.2rem', lg: '3rem' }}
              letterSpacing='1px'
              color='#00000099'
              mb='2'
            >
              VERIFY DOCUMENT
            </Heading>
            <Text
              color='brand.dark'
              fontWeight='semibold'
              fontSize={{ base: '1.2rem', md: '1.4rem' }}
              textTransform='capitalize'
              textAlign='center'
            >
              Enter the Doc ID and Branch ID to verify details{' '}
            </Text>
            <Flex
              as={chakra.form}
              onSubmit={handleSubmit}
              justify='center'
              alignItems='center'
            >
              <Flex
                w={{ base: '23rem', md: '28rem', lg: '25rem' }}
                direction='column'
                gap='5'
                justify='center'
                alignItems='center'
              >
                <FormInput
                  label='Document ID'
                  id='docId'
                  name='docId'
                  type='text'
                  isRequired={true}
                  w='100%'
                  labelColor='brand.mainTeal'
                />
                <SelectInput
                  id='institutionDetails'
                  name='institutionDetails'
                  validator={{
                    required: 'Choose a institution',
                  }}
                  w='100%'
                  options={responseData.map((item) => ({
                    label: item.branchName,
                    value: item.bId,
                  }))}
                  optionProps={{
                    background: '#0996A1',
                    color: '#ffffff',
                  }}
                  onChange={(e) => setBranchId(e.target.value)}
                >
                  Select Institution
                </SelectInput>
                <Button
                  variant='unstyled'
                  bg='brand.mainTeal'
                  _hover={{ background: '#3DC76C' }}
                  w='30%'
                  color='brand.white'
                  type='submit'
                  mt='2'
                >
                  Verify
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Verify;
