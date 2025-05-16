import { Button, chakra, Flex, Text, useToast } from '@chakra-ui/react';
import { FormInput } from '../../components';
import axiosInstance from '../../config/axiosInstance';
import { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateDocument = ({ onClose, documentData }) => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [documentName, setDocumentName] = useState(
    documentData?.documentName || ''
  );
  const [docType, setDocType] = useState(documentData?.docType || '');
  const [plotOwner, setPlotOwner] = useState(
    documentData?.plotDetails?.plotOwner || ''
  );
  const [surveyNumber, setSurveyNumber] = useState(
    documentData?.plotDetails?.surveyNumber || ''
  );
  const [plotAddress, setPlotAddress] = useState(
    documentData?.plotDetails?.plotAddress || ''
  );

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnLoading(true);

      const updatedData = {
        documentName: documentName || documentData?.documentName,
        docType: docType || documentData?.docType,
        plotDetails: {
          plotOwner: plotOwner || documentData?.plotOwner,
          surveyNumber: surveyNumber || documentData?.surveyNumber,
          plotAddress: plotAddress || documentData?.plotAddress,
        },
        status: 'pending',
      };

      const response = await axiosInstance.put(
        `document/update/${documentData?.documentId}`,
        updatedData
      );

      if (response.status === 200) {
        toast({
          title: 'success',
          description: response?.data?.message || 'User updated successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setBtnLoading(false);
        onClose();
      }
    } catch (error) {
      setBtnLoading(false);
      toast({
        title: 'error',
        description: error?.response?.data?.message || 'Failed to update user',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
    }
  };

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
      <Text color='brand.mainBg' fontSize='1.5rem' fontWeight='semibold'>
        Update Document
      </Text>
      <Flex
        as={chakra.form}
        w='100%'
        direction='column'
        gap='6'
        onSubmit={handleSubmit}
      >
        <FormInput
          label='Document Id'
          id='documentId'
          type='text'
          isRequired={true}
          value={documentData?.documentId}
          isDisabled={true}
        />
        <FormInput
          label='Document Name'
          id='documentName'
          type='text'
          isRequired={true}
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
        />
        <FormInput
          label='Doc Type'
          id='docType'
          type='text'
          isRequired={true}
          value={docType}
          onChange={(e) => setDocType(e.target.value)}
        />
        <FormInput
          label='Survey Number'
          id='surveyNumber'
          type='text'
          isRequired={true}
          value={surveyNumber}
          onChange={(e) => setSurveyNumber(e.target.value)}
        />
        <FormInput
          label='Plot Owner'
          id='plotOwner'
          type='text'
          isRequired={true}
          value={plotOwner}
          onChange={(e) => setPlotOwner(e.target.value)}
        />
        <FormInput
          label='Plot Address'
          id='plotAddress'
          type='text'
          isRequired={true}
          value={plotAddress}
          onChange={(e) => setPlotAddress(e.target.value)}
        />
        <Flex w='full' justify='space-between'>
          <Button
            w='48%'
            type='button'
            bg={'#EEB82D'}
            color='black'
            mt='4'
            px={{ base: '4', md: '6' }}
            onClick={onClose}
            _hover={{ bg: 'yellow.300' }}
            borderRadius='0.7rem'
            size='sm'
          >
            Cancel
          </Button>
          <Button
            w='48%'
            px={{ base: '4', md: '6' }}
            bg='brand.secondaryBg'
            _hover={{ background: '#5B4ED0' }}
            color='brand.white'
            type='submit'
            mt='4'
            borderRadius='0.7rem'
            size='sm'
            isLoading={btnLoading}
            loadingText='Updating'
            spinnerPlacement='start'
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

UpdateDocument.propTypes = {
  documentData: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};
export default UpdateDocument;
