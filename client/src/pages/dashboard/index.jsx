import { Flex, Heading, Icon, Spinner, Text } from '@chakra-ui/react';
import { FaUsers } from 'react-icons/fa';
import { IoDocumentText } from 'react-icons/io5';
import { LuSchool } from 'react-icons/lu';
import PropTypes from 'prop-types';
import axiosInstance from '../../config/axiosInstance';
import { useEffect, useState } from 'react';
import PeiChart from './peiChart';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const Dashboard = () => {
  const [dashboardDetails, setDashboardDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const user = getItemFromLocalStorage('user');

  useEffect(() => {
    getDashboardDetails();
  }, []);

  const getDashboardDetails = async () => {
    try {
      setLoading(true);
      const { data, status, statusText } =
        await axiosInstance.get(`dashboard/`);

      if (status === 200 && statusText === 'OK') {
        setDashboardDetails(data.dashboardData);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
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
        <Flex w='100%' direction='column'>
          <Heading
            color='brand.mainBg'
            fontWeight='semibold'
            textTransform='uppercase'
            textAlign='start'
          >
            Dashboard
          </Heading>
          <Flex
            w='100%'
            h='100%'
            direction='column'
            mt='10'
            alignItems='center'
          >
            <Flex
              w={user?.role === 'user' ? '70%' : 'full'}
              justify='space-between'
            >
              {(user?.role === 'Admin' || user?.role === 'Verifier') && (
                <DashboardCards
                  icon={FaUsers}
                  data={dashboardDetails?.users}
                  description='Total Number of active Users'
                />
              )}
              <DashboardCards
                icon={IoDocumentText}
                data={dashboardDetails?.documents}
                description='Total Number of Documents'
              />
              <DashboardCards
                icon={LuSchool}
                data={dashboardDetails?.branches}
                description='Total Number of Branches'
              />
            </Flex>
            <Flex
              w='full'
              alignItems='center'
              justify='center'
              h='full'
              mt='20'
            >
              {loading ? (
                <Flex w='100%' h='100%' alignItems='center' justify='center'>
                  <Spinner
                    w='8rem'
                    h='8rem'
                    alignSelf='center'
                    color='brand.mainBg'
                    thickness='0.6rem'
                  />
                </Flex>
              ) : (
                <PeiChart chartSeries={dashboardDetails} />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

const DashboardCards = ({ icon, data, description }) => (
  <Flex
    w={{ base: '22rem' }}
    h={{ base: '8rem' }}
    bg='brand.cardBg'
    rounded='1rem'
    p='4'
    direction='column'
    color='brand.white'
    alignItems='center'
    justify='center'
    shadow='2xl'
  >
    <Flex h='full' w='full' gap='4' alignItems='center' justify='center'>
      <Icon as={icon} color='brand.mainTeal' w='3rem' h='3rem' />
      <Text fontSize={{ base: '3rem' }} fontWeight='bold'>
        {data}
      </Text>
    </Flex>
    <Text>{description}</Text>
  </Flex>
);

DashboardCards.propTypes = {
  icon: PropTypes.any,
  data: PropTypes.any,
  description: PropTypes.any,
};

export default Dashboard;
