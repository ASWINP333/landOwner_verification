import { Button, Flex, Link, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RenderDocument } from '../../components';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance';
import dayjs from 'dayjs';
import CertificateDownload from '../../components/CertificateDownload';
import { FiDownload } from 'react-icons/fi';

const Document = () => {
  const [documentData, setDocumentData] = useState({
    documentId: '',
    documentName: '',
    docType: '',
    branchName: '',
    plotOwner: '',
    surveyNumber: '',
    plotAddress: '',
    createdDate: '',
    thandapperNumber: '',
    classOfLand: '',
    plotSize: '',
  });
  const [loading, setLoading] = useState(false);
  const [blockchainData, setBlockchainData] = useState({});

  const { search } = useLocation();
  const toast = useToast();

  const documentId = new URLSearchParams(search).get('docId');
  const branchId = new URLSearchParams(search).get('bId');
  const isUser = new URLSearchParams(search).get('isUser');

  const templateId = '1234';
  const previewSizeMultiplier = 1;

  useEffect(() => {
    let isMounted = true;
    if (isMounted) getDetailsFromBlockchain();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetailsFromBlockchain = async () => {
    setLoading(true);
    try {
      const { data, status, statusText } = await axiosInstance.get(
        `document/get/${documentId}/${branchId}`
      );

      if (status === 200 && statusText === 'OK') {
        const docData = data?.document;
        const formattedDate = dayjs(docData?.createdAt).format('DD MMM YYYY');
        setDocumentData({
          documentId: docData?.documentId,
          documentName: docData?.documentName,
          docType: docData?.docType,
          branchName: docData?.branchDetails?.branchName,
          plotOwner: docData?.plotDetails?.plotOwner,
          surveyNumber: docData?.plotDetails?.surveyNumber,
          plotAddress: docData?.plotDetails?.plotAddress,
          createdDate: formattedDate,
          thandapperNumber: docData?.plotDetails?.thandapperNumber,
          classOfLand: docData?.plotDetails?.classOfLand,
          plotSize: docData?.plotDetails?.plotSize,
        });
        setBlockchainData(docData?.transactionDetails);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: error?.response?.data?.status?.toUpperCase(),
        status: error?.response?.data?.status,
        description: error?.response?.data?.message,
        isClosable: true,
        position: 'top',
        variant: 'top-accent',
      });
    }
  };
  return (
    <Flex w='100%' h='100vh'>
      <Flex
        w='100vw'
        h='100%'
        direction='column'
        alignItems='center'
        gap='12'
        pos='relative'
      >
        {loading ? (
          <Flex w='100%' h='100%'>
            <Spinner
              w='8rem'
              h='8rem'
              alignSelf='center'
              color='#333169'
              thickness='0.6rem'
            />
          </Flex>
        ) : (
          <Flex w='100%' h='100%'>
            <Flex
              w='60%'
              alignItems='center'
              justify='center'
              direction='column'
              gap='8'
            >
              <Flex
                w='25rem'
                h='15rem'
                bg='#646F5D94'
                shadow='xl'
                rounded='1rem'
                p='4'
                direction='column'
                gap='2'
              >
                <Text
                  fontSize='1.4rem'
                  fontWeight='bold'
                  color='white'
                  textAlign='center'
                >
                  Document Details
                </Text>
                <MainDataRow data='Name :' value={documentData?.documentName} />
                <MainDataRow data='Doc Type :' value={documentData?.docType} />
                <MainDataRow data='Branch :' value={documentData?.branchName} />
              </Flex>
              <Flex
                w='25rem'
                h='15rem'
                bg='#646F5D94'
                shadow='xl'
                rounded='1rem'
                p='4'
                direction='column'
                gap='2'
              >
                <Text
                  fontSize='1.4rem'
                  fontWeight='bold'
                  color='white'
                  textAlign='center'
                >
                  Blockchain Details
                </Text>
                <MainDataRow
                  data='Block No :'
                  value={blockchainData?.blockNumber}
                />
                <Flex direction='column' gap='2'>
                  <Text
                    fontSize='1.2rem'
                    fontWeight='semibold'
                    color='white'
                    textAlign='center'
                  >
                    Block Hash
                  </Text>
                  <Text
                    as={Link}
                    href={`https://sepolia.etherscan.io/tx/${blockchainData?.transactionHash}`}
                    target='_blank'
                    fontSize='1rem'
                    fontWeight='semibold'
                    color='white'
                    textAlign='center'
                  >
                    {blockchainData?.transactionHash}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex w='40%' h='100%'>
              <Flex
                w='full'
                h='full'
                p='5'
                bg='#646F5D94'
                borderRadius='5rem 0 5rem 0'
                alignItems='center'
                justify='center'
                direction='column'
                gap='2'
              >
                {isUser ? (
                  <Flex w={{ base: '80%' }}>
                    <CertificateDownload
                      {...{
                        templateId: templateId,
                        documentId: documentData.documentId,
                        documentName: documentData.documentName,
                        docType: documentData.docType,
                        branchName: documentData.branchName,
                        plotOwner: documentData.plotOwner,
                        surveyNumber: documentData.surveyNumber,
                        plotAddress: documentData.plotAddress,
                        createdDate: documentData.createdDate,
                        previewSizeMultiplier: previewSizeMultiplier,
                        thandapperNumber: documentData.thandapperNumber,
                        classOfLand: documentData.classOfLand,
                        plotSize: documentData.plotSize,
                      }}
                      gap='2'
                      rounded='none'
                      bg='app.400'
                      color='app.50'
                      borderRadius='8'
                      size='sm'
                      _hover={{ bg: 'app.400' }}
                    >
                      <FiDownload color='blue' />
                      Download
                    </CertificateDownload>
                  </Flex>
                ) : (
                  <Flex w={{ base: '80%' }}>
                    <RenderDocument
                      {...{
                        templateId: templateId,
                        documentId: documentData.documentId,
                        documentName: documentData.documentName,
                        docType: documentData.docType,
                        branchName: documentData.branchName,
                        plotOwner: documentData.plotOwner,
                        surveyNumber: documentData.surveyNumber,
                        plotAddress: documentData.plotAddress,
                        createdDate: documentData.createdDate,
                        previewSizeMultiplier: previewSizeMultiplier,
                        thandapperNumber: documentData.thandapperNumber,
                        classOfLand: documentData.classOfLand,
                        plotSize: documentData.plotSize,
                      }}
                    />
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

const MainDataRow = ({ data, value }) => (
  <Flex
    flexDir='row'
    w='100%'
    justifyContent='space-between'
    align-items='flex-start'
    p='1'
    gap={{ base: '0.5rem', md: '0.75rem' }}
    h='auto'
    fontSize={{ base: '0.775rem', md: '1rem' }}
    color='brand.white'
    fontWeight='normal'
  >
    <Flex>{data}</Flex>
    <Flex>{value}</Flex>
  </Flex>
);

export default Document;
