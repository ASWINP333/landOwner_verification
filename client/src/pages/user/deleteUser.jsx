import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import axiosInstance from '../../config/axiosInstance';
import PropTypes from 'prop-types';
import { useState } from 'react';

const DeleteUser = ({ onClose, id }) => {
  console.log(id);

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.delete(`user/delete/${id}`);

      if (response.status === 200) {
        toast({
          title: 'success',
          description: response?.data?.message || 'User Deleted successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setLoading(false);
        onClose();
      }
    } catch (error) {
      toast({
        title: 'error',
        description: error?.response?.data?.message || 'Failed to delete User',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justify='center'
      align='center'
      gap='2'
    >
      <Flex w='full'>
        <Text fontSize={{ base: '1.2rem' }}>
          Are you sure you want to delete?
        </Text>
      </Flex>
      <Flex gap='4' alignSelf='flex-end' mt='4'>
        <Button
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
          px={{ base: '4', md: '6' }}
          bg='brand.secondaryBg'
          color='brand.white'
          type='button'
          mt='4'
          _hover={{ background: '#5B4ED0' }}
          borderRadius='0.7rem'
          size='sm'
          onClick={handleDelete}
          isLoading={loading}
          loadingText='Deleting'
          spinnerPlacement='start'
        >
          Confirm
        </Button>
      </Flex>
    </Flex>
  );
};

DeleteUser.propTypes = {
  id: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteUser;
