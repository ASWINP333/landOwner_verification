import { Divider, Flex, Image, Text, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { MdOutlineLogout } from 'react-icons/md';
import { Logo } from '../../assets';
import MainModal from '../modals/MainModal';
import Logout from './logout';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const DesktopSidebar = () => {
  const user = getItemFromLocalStorage('user');

  const role = user?.role;
  const isAdmin = role === 'Admin';
  const isVerifier = role === 'Verifier';

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      w='16rem'
      h='100vh'
      bg='brand.mainBg'
      alignItems='center'
      justifyContent='center'
      p='4'
    >
      <Flex
        direction='column'
        alignItems='center'
        justify='space-between'
        h='100%'
      >
        <Link to='/user/dashboard'>
          <Image src={Logo} alt='Secondary Logo' />
        </Link>
        <Flex direction='column' alignItems='center' gap='8'>
          {(isAdmin || isVerifier) && (
            <Flex direction='column' alignItems='center' gap='6'>
              <Link to='/user/dashboard'>
                <Text color='brand.white'>Dashboard</Text>
              </Link>
              <Divider w='12rem' borderColor='brand.white' />
            </Flex>
          )}
          {isAdmin && (
            <Flex direction='column' alignItems='center' gap='4'>
              <Link to='/user/branches'>
                <Text color='brand.white'>Branches</Text>
              </Link>
              <Divider w='12rem' borderColor='brand.white' />
            </Flex>
          )}

          {(isAdmin || isVerifier) && (
            <Flex direction='column' alignItems='center' gap='4'>
              <Link to='/user/users'>
                <Text color='brand.white'>Users List</Text>
              </Link>
              <Divider w='12rem' borderColor='brand.white' />
            </Flex>
          )}
          <Flex direction='column' alignItems='center' gap='4'>
            <Link to='/user/documents'>
              <Text color='brand.white'>Documents</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.white' />
          </Flex>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link to='/user/plots'>
              <Text color='brand.white'>Plot Details</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.white' />
          </Flex>
          <Flex direction='column' alignItems='center' gap='4'>
            <Link to='/user/settings'>
              <Text color='brand.white'>Settings</Text>
            </Link>
            <Divider w='12rem' borderColor='brand.white' />
          </Flex>
          {(isAdmin || isVerifier) && (
            <Flex direction='column' alignItems='center' gap='4'>
              <Link to='/user/report'>
                <Text color='brand.white'>Report</Text>
              </Link>
            </Flex>
          )}
        </Flex>
        <Flex
          color='brand.white'
          alignItems='center'
          gap='2'
          textTransform='capitalize'
          border='1px solid'
          borderColor='brand.white'
          py='2'
          px='4'
          borderRadius='2rem'
          cursor='pointer'
          onClick={onOpen}
        >
          LogOut
          <MdOutlineLogout size='1.2rem' />
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <Logout onClose={onClose} />
      </MainModal>
    </Flex>
  );
};

export default DesktopSidebar;
