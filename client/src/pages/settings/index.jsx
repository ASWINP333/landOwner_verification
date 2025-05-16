import { Button, Flex, Heading, Text, useDisclosure } from '@chakra-ui/react';
import { getItemFromLocalStorage } from '../../functions/localStorage';
import { MainModal } from '../../components';
import UpdateProfile from './updateProfile';
import UpdatePassword from './updatePassword';

const Settings = () => {
  const user = getItemFromLocalStorage('user');

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isModalPasswordOpen,
    onOpen: onModalPasswordOpen,
    onClose: onModalPasswordClose,
  } = useDisclosure();
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
            Settings
          </Heading>
        </Flex>
        <Flex
          w='80%'
          h='90%'
          alignItems='center'
          justify='center'
          direction='column'
          gap='6'
          border='2px solid'
          borderRadius='1rem'
          borderColor='brand.mainBg'
        >
          <Flex w='50rem' h='6rem' justify='space-between'>
            <Flex direction='column' gap='4'>
              <Text
                color='brand.mainBg'
                fontSize='1.2rem'
                fontWeight='semibold'
              >
                Name
              </Text>
              <Text
                color='brand.black'
                fontSize='1.1rem'
              >{`${user?.firstName} ${user?.lastName}`}</Text>
            </Flex>
          </Flex>
          <Flex w='50rem' h='6rem' justify='space-between'>
            <Flex direction='column' gap='4'>
              <Text
                color='brand.mainBg'
                fontSize='1.2rem'
                fontWeight='semibold'
              >
                Email
              </Text>
              <Text color='brand.black' fontSize='1.1rem'>
                {user?.email}
              </Text>
            </Flex>
            <Button
              w='6rem'
              bg='brand.secondaryBg'
              _hover={{ background: '#5B4ED0' }}
              px={{ base: '4', md: '6' }}
              color='brand.white'
              type='submit'
              mt='4'
              borderRadius='0.7rem'
              size='sm'
              border='2px solid'
              borderColor='brand.mainTeal'
              onClick={onModalOpen}
            >
              Edit
            </Button>
          </Flex>
          <Flex w='50rem' h='6rem' justify='space-between'>
            <Flex direction='column' gap='4'>
              <Text
                color='brand.mainBg'
                fontSize='1.2rem'
                fontWeight='semibold'
              >
                Password
              </Text>
              <Text color='brand.black' fontSize='1.1rem'>
                ************
              </Text>
            </Flex>
            <Button
              w='6rem'
              px={{ base: '4', md: '6' }}
              bg='brand.secondaryBg'
              _hover={{ background: '#5B4ED0' }}
              color='brand.white'
              type='submit'
              mt='4'
              borderRadius='0.7rem'
              size='sm'
              border='2px solid'
              borderColor='brand.mainTeal'
              onClick={onModalPasswordOpen}
            >
              Edit
            </Button>
          </Flex>
        </Flex>
      </Flex>
      <MainModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        bgColor='brand.dashboardBg'
      >
        <UpdateProfile onClose={onModalClose} data={user} />
      </MainModal>
      <MainModal
        isOpen={isModalPasswordOpen}
        onClose={onModalPasswordClose}
        bgColor='brand.dashboardBg'
      >
        <UpdatePassword onClose={onModalPasswordClose} />
      </MainModal>
    </Flex>
  );
};

export default Settings;
