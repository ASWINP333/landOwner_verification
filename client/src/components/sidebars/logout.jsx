import { Button, Flex, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useAuthentication } from '../../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onClose }) => {
  const authentication = useAuthentication();
  const navigate = useNavigate();
  const handleLogout = () => {
    authentication.logOut(() => {
      navigate('/login');
      onClose();
    });
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
          Are you sure you want to logout?
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
          onClick={handleLogout}
        >
          Confirm
        </Button>
      </Flex>
    </Flex>
  );
};

Logout.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Logout;
