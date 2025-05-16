import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import DocumentTemplate from './DocumentTemplate';

const CertificateDownload = ({ templateId, ...rest }) => {
  const documentPreviews = {
    DocumentTemplate: () => <DocumentTemplate {...rest} />,
    default: () => (
      <Flex
        bgColor='white'
        w={{ base: '300px', md: '500px' }}
        p='4'
        h='150px'
        justifyContent='center'
        alignItems='center'
      >
        <Text fontWeight='medium'>
          Document Preview not available, Please select a Template ID!
        </Text>
      </Flex>
    ),
  };

  const renderDocument = (templateId) => {
    if (templateId === '1234') {
      return 'DocumentTemplate';
    }
    return 'default';
  };

  return documentPreviews[renderDocument(templateId)]();
};

export default CertificateDownload;
