import { Button, Flex, Link, Spinner, Text, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { GoLink } from 'react-icons/go';
import axiosInstance from '../../config/axiosInstance';
import dayjs from 'dayjs';
import { getItemFromLocalStorage } from '../../functions/localStorage';

const DocumentDetails = ({ data, onClose, loading }) => {
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [revokeLoading, setRevokingLoading] = useState(false);
  const toast = useToast();

  console.log(data?.plotDetails?._id);

  const user = getItemFromLocalStorage('user');

  const handleCertificateVerify = async (e) => {
    e.preventDefault();
    try {
      setVerifyLoading(true);
      const response = await axiosInstance.post(
        `document/verify/${data?.documentId}/${data?.plotDetails?._id}`
      );

      if (response.status === 200) {
        toast({
          title: 'success',
          description:
            response?.data?.message || 'Document Verified successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        setVerifyLoading(false);
        onClose();
      }
    } catch (error) {
      setVerifyLoading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to verify Document',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const handleCertificateRevoke = async (e) => {
    e.preventDefault();
    try {
      setRevokingLoading(true);
      const response = await axiosInstance.delete(
        `document/revoke/${data?.documentId}`
      );

      if (response.status === 200) {
        toast({
          title: 'success',
          description:
            response?.data?.message || 'Document Revoked Successfully',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        });
        setRevokingLoading(false);
        onClose();
      }
    } catch (error) {
      setRevokingLoading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to Revoked Document',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const appLink =
    user?.role === 'user'
      ? `http://localhost:5174/document?docId=${data?.documentId}&bId=${data?.branchDetails?.bId}&isUser=true`
      : `http://localhost:5174/document?docId=${data?.documentId}&bId=${data?.branchDetails?.bId}`;
  return (
    <Flex
      height='100%'
      direction='column'
      width='100%'
      justify='center'
      align='center'
      gap='4'
      p='5'
    >
      {loading ? (
        <Spinner
          w='8rem'
          h='8rem'
          alignSelf='center'
          color='brand.secondaryBg'
          thickness='0.6rem'
        />
      ) : (
        <>
          <Text
            color='brand.secondaryBg'
            fontSize='1.5rem'
            fontWeight='semibold'
          >
            Document Details
          </Text>
          <Flex w='full' direction='column' gap='4'>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Document Id : </Text>
              <Text>{data?.documentId}</Text>
            </Flex>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Document Name : </Text>
              <Text>{data?.documentName}</Text>
            </Flex>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Document Type : </Text>
              <Text>{data?.docType}</Text>
            </Flex>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Branch Name: </Text>
              <Text>{data?.branchDetails?.branchName}</Text>
            </Flex>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Plot Owner: </Text>
              <Text>{data?.plotDetails?.plotOwner}</Text>
            </Flex>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Plot Address: </Text>
              <Text>{data?.plotDetails?.plotAddress}</Text>
            </Flex>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Survey Number: </Text>
              <Text>{data?.plotDetails?.surveyNumber}</Text>
            </Flex>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Issued By: </Text>
              <Text>{`${data?.issuedBy?.firstName} ${data?.issuedBy?.lastName}`}</Text>
            </Flex>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Blockchain Status: </Text>
              <Text>{data?.status}</Text>
            </Flex>
            <Flex color='brand.black' gap='2' fontSize='1.1rem'>
              <Text>Created At: </Text>
              <Text>
                {dayjs(data?.createdAt).format('DD MMM YYYY, h:mm A')}
              </Text>
            </Flex>

            <Flex w='100%' alignItems='center' justify='space-between' mt='4'>
              <Flex
                as={Link}
                href={appLink}
                target='_blank'
                bg='brand.mainBg'
                p='2'
                w='15rem'
                alignSelf='center'
                alignItems='center'
                justify='center'
                gap='2'
                borderRadius='1rem'
                color='brand.white'
              >
                View More Details
                <GoLink />
              </Flex>
              {user?.role === 'Verifier' && (
                <Flex alignItems='center' gap='2' color='brand.white'>
                  <Button
                    bg='green.300'
                    color='brand.white'
                    alignItems='center'
                    minW='5rem'
                    justify='center'
                    px='2'
                    py='1'
                    borderRadius='1rem'
                    onClick={handleCertificateVerify}
                    isLoading={verifyLoading}
                    loadingText='Loading..'
                    isDisabled={data?.status === 'pending' ? false : true}
                  >
                    Approve
                  </Button>
                  <Button
                    bg='red.400'
                    color='brand.white'
                    alignItems='center'
                    minW='5rem'
                    justify='center'
                    px='2'
                    py='1'
                    borderRadius='1rem'
                    onClick={handleCertificateRevoke}
                    isLoading={revokeLoading}
                    loadingText='Loading..'
                    isDisabled={
                      data?.status === 'revoked'
                        ? true
                        : data?.status === 'verified'
                          ? true
                          : false
                    }
                  >
                    Reject
                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

DocumentDetails.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};
export default DocumentDetails;
