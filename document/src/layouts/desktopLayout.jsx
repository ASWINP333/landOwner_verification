import { Flex, Image } from '@chakra-ui/react';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from '../components';
import { MainBg, MainDocBg, MainLogo, MainLogoDark } from '../assets';

const DesktopLayout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  return (
    <Flex
      gap='4'
      w='100vw'
      minH='100vh'
      flexDir='column'
      alignItems='center'
      justifyContent='center'
      overflow='hidden'
      pos='relative'
      backgroundImage={`url(${MainDocBg})`}
    >
      {!isMainPage && (
        <Flex
          as={Image}
          src={MainLogoDark}
          pos='absolute'
          top='0'
          left='0'
          w='8rem'
        />
      )}
      <Flex w='100%' h='100%'>
        <Outlet />
      </Flex>
      <Footer />
    </Flex>
  );
};

export default DesktopLayout;
