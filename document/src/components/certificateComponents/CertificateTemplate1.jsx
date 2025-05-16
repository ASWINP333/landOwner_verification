/* eslint-disable no-unused-vars */
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useRef } from 'react';
import React from 'react';
// import useWidth from '../../../../../certi_verifier/certificate/src/helpers/hooks/useWidthHook';
// import { certificateFrame2 } from '../../../../../certi_verifier/certificate/src/assets';

const CertificateTemplate1 = ({
  fullName,
  certificateId,
  issuedDate,
  issuedBy,
  certificateType,
  previewSizeMultiplier,
  grade,
  ...rest
}) => {
  const previewRef = useRef(null);
  const resizeFactor = useWidth(previewRef) / 1000;

  const textCenterStyle = {
    w: '80%',
    mx: 'auto',
    textAlign: 'center',
  };

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
          src={certificateFrame2}
          alt='certificate'
          draggable='false'
          w='auto'
          h='full'
        />
        <Flex position='absolute' w='full' h='full' flexDirection='column'>
          <Text
            htmlFor='heading'
            fontWeight='light'
            fontSize={resizeFactor * 2.4 + 'rem'}
            letterSpacing={resizeFactor * 0.2 + 'rem'}
            textTransform='uppercase'
            mt='20%'
            {...textCenterStyle}
          >
            FULL STACK DEVELOPMENT
          </Text>
          <Text
            htmlFor='certificate-for'
            fontWeight='bold'
            fontSize={resizeFactor * 1.8 + 'rem'}
            fontFamily='Poppins'
            {...textCenterStyle}
          >
            Certificate of Completion
          </Text>
          <Text
            htmlFor='full-name'
            fontWeight='semibold'
            fontSize={resizeFactor * 2.5 + 'rem'}
            textTransform='capitalize'
            {...textCenterStyle}
          >
            {fullName}
          </Text>
          <Text
            htmlFor='description'
            fontSize={resizeFactor * 1.1 + 'rem'}
            {...textCenterStyle}
          >
            This is to certify that the recipient has successfully completed the{' '}
            {certificateType} program, demonstrating a high level of dedication.
            The candidate has achieved an outstanding grade of {grade} ,
            reflecting their exceptional understanding of the subject matter.
            This certificate is proudly issued on {issuedDate}.
          </Text>
          <Flex
            htmlFor='signature-date'
            position='absolute'
            w='30%'
            left='70%'
            top='72%'
            fontSize={resizeFactor * 0.69 + 'rem'}
            flexDir='column'
            gap='2'
          >
            <Flex gap='2'>
              <Text
                letterSpacing={resizeFactor * 0.2 + 'rem'}
                fontSize={resizeFactor * 0.8 + 'rem'}
              >
                Date :
              </Text>
              <Text fontWeight='semibold' fontSize={resizeFactor * 0.8 + 'rem'}>
                {issuedDate}
              </Text>
            </Flex>
            <Flex gap='2'>
              <Text
                letterSpacing={resizeFactor * 0.2 + 'rem'}
                fontSize={resizeFactor * 0.8 + 'rem'}
              >
                Certificate ID :
              </Text>
              <Text fontWeight='semibold' fontSize={resizeFactor * 0.8 + 'rem'}>
                {certificateId}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CertificateTemplate1;
