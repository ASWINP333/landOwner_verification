import {
  Button,
  Flex,
  Heading,
  Spinner,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { MdDelete, MdEdit } from 'react-icons/md';
import axiosInstance from '../../config/axiosInstance';
import { MainModal, TableComponent } from '../../components';
import { MdVerified } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import UpdatePlot from './updatePlot';
import DeletePlot from './deletePlot';
import { Link } from 'react-router-dom';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const PlotList = () => {
  const [loading, setLoading] = useState(false);
  const [plotData, setPlotData] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [selectedDocument, setSelectedDocument] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = getItemFromLocalStorage('user');

  const isAdmin = user?.role === 'Admin';
  const isVerifier = user?.role === 'Verifier';

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        Header: 'Plot Owner',
        accessor: 'plotOwner',
      },
      {
        Header: 'Survey Number',
        accessor: 'surveyNumber',
      },
      {
        Header: 'Plot Address',
        accessor: (row) => (
          <Tooltip label={row.plotAddress} hasArrow placement='top'>
            {row.plotAddress?.length > 15
              ? `${row.plotAddress.slice(0, 15)}...`
              : row.plotAddress}
          </Tooltip>
        ),
      },
      {
        Header: 'Thandapper Number',
        accessor: 'thandapperNumber',
      },
      {
        Header: 'Status',
        accessor: 'status',
        // eslint-disable-next-line react/prop-types
        Cell: ({ value }) => (
          <Tooltip
            hasArrow
            label={value}
            bg='gray.300'
            color='black'
            placement='top'
          >
            <Flex
              alignItems='center'
              justify='center'
              fontSize='1.2rem'
              color={
                value === 'pending'
                  ? 'yellow.300'
                  : value === 'revoked'
                    ? 'red.500'
                    : 'green.500'
              }
            >
              <MdVerified />
            </Flex>
          </Tooltip>
        ),
      },
      {
        Header: 'Actions',
        accessor: (cell) => (
          <Flex>
            {/* {isAdmin ||
              (isVerifier && (
                <Button
                  bg='transparent'
                  color='brand.black'
                  fontSize='1.2rem'
                  _hover={{ bg: 'transparent' }}
                  onClick={() => {
                    setSelectedDocument(cell);
                    onModalOpen();
                  }}
                >
                  <MdEdit />
                </Button>
              ))} */}
            <Button
              bg='transparent'
              color='brand.black'
              fontSize='1.2rem'
              _hover={{ bg: 'transparent' }}
              onClick={() => {
                setDeleteId(cell?._id);
                onOpen();
              }}
            >
              <MdDelete />
            </Button>
            {isAdmin ||
              (isVerifier && (
                <Button
                  as={Link}
                  to={`/user/documents/create/${cell?._id}`}
                  bg='transparent'
                  color='brand.black'
                  fontSize='1.2rem'
                  _hover={{ bg: 'transparent' }}
                >
                  <FaEye />
                </Button>
              ))}
          </Flex>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getPlotData();
  }, []);

  const getPlotData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`document/plot`);
      if (response.data.status === 'success') {
        setLoading(false);
        setPlotData(response.data.plot);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
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
        <Flex w='100%'>
          <Heading
            color='brand.mainBg'
            fontWeight='semibold'
            textTransform='uppercase'
            textAlign='start'
          >
            Plot List
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
            <TableComponent
              columns={columns}
              data={plotData}
              buttonName='Add Plot'
              buttonLink='/user/plots/create'
              isButton={isAdmin ? false : true}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeletePlot onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal isOpen={isModalOpen} onClose={onModalClose}>
        <UpdatePlot onClose={onModalClose} id={selectedDocument?._id} />
      </MainModal>
    </Flex>
  );
};

export default PlotList;
