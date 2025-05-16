/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import React from 'react';
import { DocumentFrame } from '../../assets';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const DocumentTemplate = ({
  documentId,
  documentName,
  docType,
  branchName,
  plotOwner,
  surveyNumber,
  plotAddress,
  createdDate,
  previewSizeMultiplier,
  thandapperNumber,
  classOfLand,
  plotSize,
  children,
  ...rest
}) => {
  // const certificateSize = { width: 1123, height: 794 };
  const certificateSize = { width: 1123, height: 1123 };
  // const certificateSize = { width: 841.89, height: 595.28 };
  const certificateRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const downloadPDF = useCallback(async () => {
    setIsProcessing(true);
    const certificateElement = certificateRef.current;

    try {
      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        useCORS: true,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: [certificateSize.width, certificateSize.height],
      });

      pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        certificateSize.width,
        certificateSize.height
      );

      pdf.setProperties({
        title: 'LandOwner',
        subject: 'Blockchain verifiable certificate',
        author: 'land verifier',
        keywords: 'Blockchain, Verified',
      });

      pdf.save('land.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return (
    <Flex direction='column' gap='2'>
      <Box
        maxWidth={`${certificateSize.width}px`}
        maxHeight={`${certificateSize.height - 1}px`}
        ref={certificateRef}
        minWidth='250px'
        userSelect='none'
        fontFamily='Nunito Sans'
        id='certificate-preview'
        bg='white'
      >
        <Flex w='auto' h='full' alignItems='center' position='relative'>
          <Image
            src={DocumentFrame}
            alt='certificate'
            draggable='false'
            w='auto'
            h='full'
          />
          <Flex
            position='absolute'
            w='full'
            h='full'
            flexDirection='column'
            top='25%'
          >
            <Flex
              w='100%'
              alignItems='center'
              justify='center'
              direction='column'
              gap='4'
            >
              <DocumentDataCard
                keyValue='Document ID :'
                value={documentId}
                fontSize='0.8rem'
              />
              <DocumentDataCard
                keyValue='Owner Name :'
                value={plotOwner}
                fontSize='0.8rem'
              />
              <DocumentDataCard
                keyValue='Document Name :'
                value={documentName}
                fontSize='0.8rem'
              />
              <DocumentDataCard
                keyValue='Document Type :'
                value={docType}
                fontSize='0.8rem'
              />
              <DocumentDataCard
                keyValue='Branch :'
                value={branchName}
                fontSize='0.8rem'
              />
              <DocumentDataCard
                keyValue='Survey Number :'
                value={surveyNumber}
                fontSize='0.8rem'
              />
              <DocumentDataCard
                keyValue='Plot Address :'
                value={plotAddress}
                fontSize='0.8rem'
              />
              <DocumentDataCard
                keyValue='Thandapper Number :'
                value={thandapperNumber}
                fontSize='0.8rem'
              />
              <DocumentDataCard
                keyValue='Class of Land :'
                value={classOfLand}
                fontSize='0.8rem'
              />
              <DocumentDataCard
                keyValue='Plot Size :'
                value={plotSize}
                fontSize='0.8rem'
              />
            </Flex>
            <Flex
              htmlFor='signature-date'
              position='absolute'
              w='30%'
              left='60%'
              top='60%'
              flexDir='column'
              gap='2'
            >
              <Flex gap='2'>
                <Text letterSpacing='0.1rem' fontSize='0.6rem'>
                  Date :
                </Text>
                <Text fontWeight='semibold' fontSize='0.6rem'>
                  {createdDate}
                </Text>
              </Flex>
              <Flex gap='2'>
                <Text letterSpacing='0.1rem' fontSize='0.6rem'>
                  Document ID :
                </Text>
                <Text fontWeight='semibold' fontSize='0.6rem'>
                  {documentId}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        as={Button}
        p='2'
        alignItems='center'
        justifyContent='center'
        onClick={downloadPDF}
        isLoading={isProcessing}
        cursor='pointer'
        {...rest}
      >
        {children}
      </Flex>
    </Flex>
  );
};

const DocumentDataCard = ({ keyValue, value, fontSize }) => (
  <Flex w='60%' justify='space-between' alignItems='center'>
    <Text fontSize={fontSize}>{keyValue}</Text>
    <Text fontWeight='semibold' fontSize={fontSize}>
      {value}
    </Text>
  </Flex>
);

export default DocumentTemplate;
