import { Button, Flex, Text, useToast } from '@chakra-ui/react';
import axiosInstance from '../../config/axiosInstance';
import PropTypes from 'prop-types';
import { useState } from 'react';

const UpdatePlot = ({ onClose, id }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleUpdate = async (status) => {
    try {
      setLoading(true);
      const response = await axiosInstance.put(`document/plot/update/${id}`, {
        status,
      });

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: response?.data?.message || 'Plot updated successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.response?.data?.message || 'Failed to update plot',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    } finally {
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
        <Text fontSize={{ base: '1.2rem' }}>Upate Status</Text>
      </Flex>
      <Flex gap='4' alignSelf='flex-end' mt='4'>
        <Button
          type='button'
          bg={'#EEB82D'}
          color='black'
          mt='4'
          px={{ base: '4', md: '6' }}
          onClick={() => handleUpdate('rejected')}
          _hover={{ bg: 'yellow.300' }}
          borderRadius='0.7rem'
          size='sm'
        >
          Reject
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
          isLoading={loading}
          loadingText='Updating..'
          spinnerPlacement='start'
          onClick={() => handleUpdate('approved')}
        >
          Approve
        </Button>
      </Flex>
    </Flex>
  );
};

UpdatePlot.propTypes = {
  id: PropTypes.any.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdatePlot;
