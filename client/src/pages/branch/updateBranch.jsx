import { Button, chakra, Flex, Text, useToast } from '@chakra-ui/react';
import { FormInput } from '../../components';
import axiosInstance from '../../config/axiosInstance';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UpdateBranch = ({ onClose, bData }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [branchName, setBranchName] = useState(bData?.branchName || '');
  const [address, setAddress] = useState(bData?.address || '');

  const toast = useToast();

  // Ensure state updates if Idata changes dynamically
  useEffect(() => {
    setBranchName(bData?.branchName || '');
    setAddress(bData?.address || '');
  }, [bData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      const updatedData = {
        branchName: branchName || bData?.branchName,
        address: address || bData?.address,
      };

      console.log(updatedData);

      const response = await axiosInstance.put(
        `branch/update/${bData?.bId}`,
        updatedData
      );

      if (response.status === 200) {
        toast({
          title: 'success',
          description: response?.data?.message || 'Branch updated successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setBtnLoading(false);
        onClose();
      }
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to branch branch',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justify='center'
      align='center'
      gap='4'
      p='5'
    >
      <Text color='brand.mainBg' fontSize='1.5rem' fontWeight='semibold'>
        Update Branch
      </Text>
      <Flex
        as={chakra.form}
        w='100%'
        direction='column'
        gap='6'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='Branch Name'
          id='branchName'
          type='text'
          isRequired={true}
          value={branchName}
          onChange={(e) => setBranchName(e.target.value)}
        />
        <FormInput
          label='Address'
          id='address'
          type='text'
          isRequired={true}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Flex w='full' justify='space-between'>
          <Button
            w='48%'
            type='button'
            bg={'#EEB82D'}
            color='black'
            mt='4'
            px={{ base: '4', md: '6' }}
            onClick={onClose}
            _hover={{ bg: 'yellow.300' }}
            borderRadius='0.7rem'
            size='sm'
          >
            Cancel
          </Button>
          <Button
            w='48%'
            px={{ base: '4', md: '6' }}
            bg='brand.secondaryBg'
            _hover={{ background: '#5B4ED0' }}
            color='brand.white'
            type='submit'
            mt='4'
            borderRadius='0.7rem'
            size='sm'
            isLoading={btnLoading}
            loadingText='Updating'
            spinnerPlacement='start'
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

UpdateBranch.propTypes = {
  bData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
export default UpdateBranch;
