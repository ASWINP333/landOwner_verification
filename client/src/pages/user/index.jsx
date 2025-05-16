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
import TableComponent from '../../components/tables/mainTable';
import { MainModal } from '../../components';
import DeleteUser from './deleteUser';
import UpdateUser from './updateUser';
const UsersList = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [selectedUser, setSelectedUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure(); // delete modal
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure(); // update modal

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`user/myUsers`);
      if (response.data.status === 'success') {
        console.log(response.data.data);

        setLoading(false);
        setUserData(response.data.data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'firstName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Designation',
        accessor: 'designation',
      },
      {
        Header: 'Branch Name',
        accessor: (row) => row?.branchDetails?.branchName || 'N/A',
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
                setSelectedUser(cell);
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
                setDeleteId(cell?._id);
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
            Users list
          </Heading>
        </Flex>
        <Flex w='100%' h='100%'>
          {loading ? (
            <Flex w='100%' h='100%' alignItems='center' justify='center'>
              <Spinner
                w='8rem'
                h='8rem'
                alignSelf='center'
                color='brand.mainTeal'
                thickness='0.6rem'
              />
            </Flex>
          ) : (
            <TableComponent
              columns={columns}
              data={userData}
              buttonName='Add User'
              buttonLink='/user/users/create'
              isButton={true}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeleteUser onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        bgColor='brand.dashboardBg'
      >
        <UpdateUser onClose={onModalClose} data={selectedUser} />
      </MainModal>
    </Flex>
  );
};

export default UsersList;
