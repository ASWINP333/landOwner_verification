import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { FormInput } from '../../components';
import { useEffect, useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const CreateDocument = () => {
  const [documentId, setDocumentId] = useState('');
  const [documentName, setDocumentName] = useState('');
  const [docType, setDocType] = useState('');
  const [plotOwner, setPlotOwner] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [plotAddress, setPlotAddress] = useState('');
  const [thandapperNumber, setThandapperNumber] = useState('');
  const [classOfLand, setClassOfLand] = useState('');
  const [plotSize, setPlotSize] = useState('');
  const [plotOwnerId, setPlotOwnerId] = useState();
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { plotId } = useParams();

  useEffect(() => {
    getPlotData();
  }, []);

  const getPlotData = async () => {
    try {
      const { data, status, statusText } = await axiosInstance.get(
        `document/plot/get/${plotId}`
      );

      if (status === 200 && statusText === 'OK') {
        setPlotOwner(data?.plot?.plotOwner);
        setSurveyNumber(data?.plot?.surveyNumber);
        setPlotAddress(data?.plot?.plotAddress);
        setThandapperNumber(data?.plot?.thandapperNumber);
        setClassOfLand(data?.plot?.classOfLand);
        setPlotSize(data?.plot?.plotSize);
        setPlotOwnerId(data?.plot?.plotOwnerId);
      }
      if (statusText === 'Not Found') {
        toast({
          title: 'error',
          description: 'Plot not found',
          status: 'error',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);

      const documentData = {
        documentId: documentId,
        documentName,
        docType,
        plotDetails: plotId,
        plotOwnerId: plotOwnerId,
      };

      const response = await axiosInstance.post(
        `document/create`,
        documentData
      );

      if (response.status === 201) {
        toast({
          title: 'success',
          description:
            response?.data?.message || 'Document Created successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setloading(false);
        navigate('/user/documents');
      }
    } catch (error) {
      setloading(false);
      toast({
        title: 'error',
        description:
          error?.response?.data?.message || 'Failed to create Document',
        status: 'error',
        position: 'top',
        duration: 1500,
        isClosable: true,
      });
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
            Create Document
          </Heading>
        </Flex>

        <Flex
          as={chakra.form}
          w='100%'
          p='10'
          direction='column'
          gap='4'
          onSubmit={handleSubmit}
        >
          <Flex w='full'>
            <FormInput
              label='Document Id'
              id='documentId'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setDocumentId(e.target.value)}
            />
            <FormInput
              label='Document Name'
              id='documentName'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setDocumentName(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Doc Type'
              id='docType'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setDocType(e.target.value)}
            />
            <FormInput
              label='Plot Owner'
              id='plotOwner'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              value={plotOwner}
              defaultValue={plotOwner}
              isDisabled={true}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Survey Number'
              id='surveyNumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              value={surveyNumber}
              defaultValue={surveyNumber}
              isDisabled={true}
            />
            <FormInput
              label='Plot Address'
              id='plotAddress'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              value={plotAddress}
              defaultValue={plotAddress}
              isDisabled={true}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Thandapper Number'
              id='thandapperNumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              value={thandapperNumber}
              defaultValue={thandapperNumber}
              isDisabled={true}
            />
            <FormInput
              label='Class Of Land'
              id='classOfLand'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              value={classOfLand}
              defaultValue={classOfLand}
              isDisabled={true}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Plot Size'
              id='plotSize'
              type='text'
              isRequired={true}
              w='45%'
              labelColor='brand.mainBg'
              value={plotSize}
              defaultValue={plotSize}
              isDisabled={true}
            />
          </Flex>
          <Flex w='95%' justify='space-between'>
            <Button
              w='48%'
              type='button'
              bg={'#EEB82D'}
              color='black'
              mt='4'
              px={{ base: '4', md: '6' }}
              _hover={{ bg: 'yellow.300' }}
              borderRadius='0.7rem'
              size='sm'
              onClick={() => {
                navigate('/user/documents');
              }}
            >
              Back
            </Button>
            <Button
              w='48%'
              px={{ base: '4', md: '6' }}
              bg='brand.secondaryBg'
              color='brand.white'
              type='submit'
              mt='4'
              _hover={{ background: '#5B4ED0' }}
              borderRadius='0.7rem'
              size='sm'
              isLoading={loading}
              loadingText='Creating..'
              spinnerPlacement='start'
            >
              Create
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CreateDocument;
