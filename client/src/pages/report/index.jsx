import {
  Button,
  chakra,
  Flex,
  Heading,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import axiosInstance from '../../config/axiosInstance';
import { DateInput, SimpleTableComponent } from '../../components';

const Report = () => {
  const [loading, setLoading] = useState(false);
  const [documentData, setDocument] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const toast = useToast();

  // Get the first day of the current month and the current day as the end date
  const getCurrentMonthRange = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const endDay = new Date(); // Current day

    // Format date as YYYY-MM-DD
    const formatDate = (date) => date.toLocaleDateString('en-CA');

    return {
      startDate: formatDate(firstDay),
      endDate: formatDate(endDay),
    };
  };

  useEffect(() => {
    const { startDate, endDate } = getCurrentMonthRange();
    setStartDate(startDate);
    setEndDate(endDate);
    getUsersData(startDate, endDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsersData = async (start, end) => {
    try {
      setLoading(true);
      console.log(start, end);

      const response = await axiosInstance.get(
        `document/get/date?startDate=${start}&endDate=${end}`
      );
      if (
        response.data.status === 'success' &&
        response?.data?.documents.length > 0
      ) {
        setDocument(response?.data?.documents);
      } else {
        toast({
          title: 'No Data',
          description: 'No documents found for the selected date range.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        setDocument([]); // Explicitly set an empty array to trigger re-render
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: 'no documents found.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      setDocument([]); // Clear data on error as well
    } finally {
      setLoading(false);
      setBtnLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate && endDate) {
      setBtnLoading(true);
      getUsersData(startDate, endDate);
    } else {
      toast({
        title: 'Invalid Dates',
        description: 'Please select both start and end dates.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Document Id',
        accessor: 'documentId',
      },
      {
        Header: 'Name',
        accessor: 'documentName',
      },
      {
        Header: 'DocType',
        accessor: 'docType',
      },
      {
        Header: 'Branch Details',
        accessor: (row) => row?.branchDetails?.branchName || 'N/A',
      },
      {
        Header: 'Land Owner',
        accessor: (row) => row?.plotDetails?.plotOwner || 'N/A',
      },
      {
        Header: 'Issued By',
        accessor: (row) =>
          `${row?.issuedBy?.firstName} ${row?.issuedBy?.lastName}`,
      },
    ],
    []
  );

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
            Report
          </Heading>
        </Flex>
        <Flex w='100%' h='100%'>
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
            <>
              <Flex
                as={chakra.form}
                pos='absolute'
                onSubmit={handleSubmit}
                right='12'
                top='24'
                gap='4'
              >
                <DateInput
                  label='Start Date'
                  id='startDate'
                  value={startDate}
                  isRequired={true}
                  w='15rem'
                  labelColor='brand.white'
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <DateInput
                  label='End Date'
                  id='endDate'
                  value={endDate}
                  isRequired={true}
                  w='15rem'
                  labelColor='brand.white'
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Flex gap='2'>
                  <Button
                    w='10rem'
                    px={{ base: '4', md: '6' }}
                    bg='brand.mainBg'
                    color='brand.white'
                    type='submit'
                    _hover={{ bg: 'green.400' }}
                    borderRadius='0.7rem'
                    size='sm'
                    mt='10'
                    isLoading={btnLoading}
                    loadingText='Loading...'
                  >
                    Submit
                  </Button>
                </Flex>
              </Flex>
              {documentData.length !== 0 ? (
                <SimpleTableComponent
                  columns={columns}
                  data={documentData}
                  isPagination={true}
                />
              ) : (
                <Text>No Data available</Text>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Report;
