import {
  Button,
  Flex,
  Heading,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { MdDelete, MdEdit } from 'react-icons/md';
import axiosInstance from '../../config/axiosInstance';
import { MainModal, TableComponent } from '../../components';
import DeleteBranch from './deleteBranch';
import UpdateBranch from './updateBranch';

const BranchList = () => {
  const [loading, setLoading] = useState(false);
  const [branchData, setBranchData] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [selectedBranch, setSelectedBranch] = useState({});

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const columns = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'bId',
      },
      {
        Header: 'Name',
        accessor: 'branchName',
      },
      {
        Header: 'Address',
        accessor: 'address',
      },
      {
        Header: 'Actions',
        accessor: (cell) => (
          <Flex>
            <Button
              bg='transparent'
              color='brand.black'
              fontSize='1.2rem'
              _hover={{ bg: 'transparent' }}
              onClick={() => {
                setSelectedBranch(cell);
                onModalOpen();
              }}
            >
              <MdEdit />
            </Button>
            <Button
              bg='transparent'
              color='brand.black'
              fontSize='1.2rem'
              _hover={{ bg: 'transparent' }}
              onClick={() => {
                setDeleteId(cell?.bId);
                onOpen();
              }}
            >
              <MdDelete />
            </Button>
          </Flex>
        ),
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getBranchData();
  }, []);

  const getBranchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`branch/getAll`);
      if (response.data.status === 'success') {
        setLoading(false);
        setBranchData(response.data.branches);
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
            Branches
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
              data={branchData}
              buttonName='Add Branch'
              buttonLink='/user/branches/create'
              isButton={true}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeleteBranch onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal isOpen={isModalOpen} onClose={onModalClose}>
        <UpdateBranch onClose={onModalClose} bData={selectedBranch} />
      </MainModal>
    </Flex>
  );
};

export default BranchList;
