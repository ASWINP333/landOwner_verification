/* eslint-disable no-unused-vars */
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import React from 'react';
import useWidth from '../../helpers/hooks/useWidthHook';
import { DocumentFrame } from '../../assets';

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
  ...rest
}) => {
  const previewRef = useRef(null);
  const resizeFactor = useWidth(previewRef) / 1000;

  const certificateSize = { width: 1123, height: 794 };

  return (
    <Box
      maxWidth={`${certificateSize.width * previewSizeMultiplier}px `}
      maxHeight={`${certificateSize.height * previewSizeMultiplier}px `}
      minWidth='250px'
      userSelect='none'
      fontFamily='Nunito Sans'
      fontSize={resizeFactor * 1 + 'rem'}
      pointerEvents='none'
      htmlFor='achievement-certificate-preview'
      {...rest}
    >
      <Flex w='auto' h='full' alignItems='center' position='relative'>
        <Image
          ref={previewRef}
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
              fontSize={resizeFactor * 1.4 + 'rem'}
            />
            <DocumentDataCard
              keyValue='Owner Name :'
              value={plotOwner}
              fontSize={resizeFactor * 1.4 + 'rem'}
            />
            <DocumentDataCard
              keyValue='Document Name :'
              value={documentName}
              fontSize={resizeFactor * 1.4 + 'rem'}
            />
            <DocumentDataCard
              keyValue='Document Type :'
              value={docType}
              fontSize={resizeFactor * 1.4 + 'rem'}
            />
            <DocumentDataCard
              keyValue='Branch :'
              value={branchName}
              fontSize={resizeFactor * 1.4 + 'rem'}
            />
            <DocumentDataCard
              keyValue='Survey Number :'
              value={surveyNumber}
              fontSize={resizeFactor * 1.4 + 'rem'}
            />
            <DocumentDataCard
              keyValue='Plot Address :'
              value={plotAddress}
              fontSize={resizeFactor * 1.4 + 'rem'}
            />
            <DocumentDataCard
              keyValue='Thandapper Number :'
              value={thandapperNumber}
              fontSize={resizeFactor * 1.4 + 'rem'}
            />
            <DocumentDataCard
              keyValue='Class of Land :'
              value={classOfLand}
              fontSize={resizeFactor * 1.4 + 'rem'}
            />
            <DocumentDataCard
              keyValue='Plot Size :'
              value={plotSize}
              fontSize={resizeFactor * 1.4 + 'rem'}
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
              <Text
                letterSpacing={resizeFactor * 0.2 + 'rem'}
                fontSize={resizeFactor * 1.1 + 'rem'}
              >
                Date :
              </Text>
              <Text fontWeight='semibold' fontSize={resizeFactor * 1.1 + 'rem'}>
                {createdDate}
              </Text>
            </Flex>
            <Flex gap='2'>
              <Text
                letterSpacing={resizeFactor * 0.2 + 'rem'}
                fontSize={resizeFactor * 1.1 + 'rem'}
              >
                Document ID :
              </Text>
              <Text fontWeight='semibold' fontSize={resizeFactor * 1.1 + 'rem'}>
                {documentId}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
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
