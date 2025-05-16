import { Flex } from '@chakra-ui/react';
import { DesktopSidebar, Footer } from '../components';
import { Outlet } from 'react-router-dom';

const DesktopLayout = () => {
  return (
    <Flex
      gap='4'
      w='100vw'
      minH='100vh'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      overflow='hidden'
      bg='brand.white'
      backgroundSize='cover'
      backgroundPosition='center'
    >
      <Flex w='100%' h='100%'>
        <DesktopSidebar />
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default DesktopLayout;
