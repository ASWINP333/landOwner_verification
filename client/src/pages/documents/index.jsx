/* eslint-disable react/prop-types */
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
import DeleteDocument from './deleteDocument';
import UpdateDocument from './updateDocument';
import DocumentDetails from './documentDetail';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const DocumentList = () => {
  const [loading, setLoading] = useState(false);
  const [documentData, setDocumentData] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [selectedDocument, setSelectedDocument] = useState({});
  const [singleDocumentData, setSingleDocumentData] = useState({});
  const [singleLoading, setSingleLoading] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = getItemFromLocalStorage('user');

  const role = user?.role;

  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  const {
    isOpen: isDetailModalOpen,
    onOpen: onDetailModalOpen,
    onClose: onDetailModalClose,
  } = useDisclosure();

  const handleBatchClick = async (document) => {
    try {
      setSingleLoading(true);
      const { data, status, statusText } = await axiosInstance.get(
        `document/get/${document?.documentId}/${document?.branchDetails?.bId}`
      );

      if (status === 200 && statusText === 'OK') {
        setSingleDocumentData(data?.document);
        setSingleLoading(false);
        onDetailModalOpen();
      }
    } catch (error) {
      setSingleLoading(false);
      console.log(error?.message);
    }
  };

  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: 'Document Id',
  //       accessor: (row) => (
  //         <Button
  //           variant='unstyled'
  //           style={{ cursor: 'pointer' }}
  //           _hover={{ textDecoration: 'underline', color: 'brand.dark' }}
  //           onClick={() => handleBatchClick(row)}
  //           p='0'
  //         >
  //           {row?.documentId}
  //         </Button>
  //       ),
  //     },
  //     {
  //       Header: 'Name',
  //       accessor: 'documentName',
  //     },
  //     {
  //       Header: 'DocType',
  //       accessor: 'docType',
  //     },
  //     {
  //       Header: 'Branch Details',
  //       accessor: (row) => row?.branchDetails?.branchName || 'N/A',
  //     },
  //     {
  //       Header: 'Status',
  //       accessor: 'status',
  //       // eslint-disable-next-line react/prop-types
  //       Cell: ({ value }) => (
  //         <Tooltip
  //           hasArrow
  //           label={value}
  //           bg='gray.300'
  //           color='black'
  //           placement='top'
  //         >
  //           <Flex
  //             alignItems='center'
  //             justify='center'
  //             fontSize='1.2rem'
  //             color={
  //               value === 'pending'
  //                 ? 'yellow.300'
  //                 : value === 'revoked'
  //                   ? 'red.500'
  //                   : 'green.500'
  //             }
  //           >
  //             <MdVerified />
  //           </Flex>
  //         </Tooltip>
  //       ),
  //     },
  //     {
  //       Header: 'Actions',
  //       accessor: (cell) => (
  //         <Flex>
  //           <Button
  //             bg='transparent'
  //             color='brand.black'
  //             fontSize='1.2rem'
  //             _hover={{ bg: 'transparent' }}
  //             onClick={() => {
  //               setSelectedDocument(cell);
  //               onModalOpen();
  //             }}
  //           >
  //             <MdEdit />
  //           </Button>
  //           <Button
  //             bg='transparent'
  //             color='brand.black'
  //             fontSize='1.2rem'
  //             _hover={{ bg: 'transparent' }}
  //             onClick={() => {
  //               setDeleteId(cell?._id);
  //               onOpen();
  //             }}
  //           >
  //             <MdDelete />
  //           </Button>
  //         </Flex>
  //       ),
  //     },
  //   ],
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   []
  // );

  const columns = useMemo(() => {
    const cols = [
      {
        Header: 'Document Id',
        accessor: (row) => (
          <Button
            variant='unstyled'
            style={{ cursor: 'pointer' }}
            _hover={{ textDecoration: 'underline', color: 'brand.dark' }}
            onClick={() => handleBatchClick(row)}
            p='0'
          >
            {row?.documentId}
          </Button>
        ),
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
        Header: 'Status',
        accessor: 'status',
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
    ];

    // ✅ Add Actions column only for non-user roles
    if (role !== 'user') {
      cols.push({
        Header: 'Actions',
        accessor: (cell) => (
          <Flex>
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
      });
    }

    return cols;
  }, [role, onModalOpen, onOpen]); // ✅ Add role to deps

  useEffect(() => {
    getBranchData();
  }, []);

  const getBranchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(`document/getMyDocuments`);
      if (response.data.status === 'success') {
        setLoading(false);
        setDocumentData(response.data.documents);
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
            Documents
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
              data={documentData}
              buttonName='Add Document'
              buttonLink='/user/documents/create'
              isButton={false}
              isPagination={true}
            />
          )}
        </Flex>
      </Flex>
      <MainModal isOpen={isOpen} onClose={onClose}>
        <DeleteDocument onClose={onClose} id={deleteId} />
      </MainModal>
      <MainModal isOpen={isModalOpen} onClose={onModalClose}>
        <UpdateDocument
          onClose={onModalClose}
          documentData={selectedDocument}
        />
      </MainModal>
      <MainModal
        isOpen={isDetailModalOpen}
        onClose={onDetailModalClose}
        size='xl'
      >
        <DocumentDetails
          onClose={onDetailModalClose}
          data={singleDocumentData}
          loading={singleLoading}
        />
      </MainModal>
    </Flex>
  );
};

export default DocumentList;
