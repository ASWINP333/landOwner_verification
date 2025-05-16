import { Button, chakra, Flex, Heading, useToast } from '@chakra-ui/react';
import { FormInput, SelectInput } from '../../components';
import { useState } from 'react';
import axiosInstance from '../../config/axiosInstance';
import { useNavigate } from 'react-router-dom';

const CreatePlot = () => {
  const [plotOwner, setPlotOwner] = useState('');
  const [surveyNumber, setSurveyNumber] = useState('');
  const [plotAddress, setPlotAddress] = useState('');
  const [thandapperNumber, setThandapperNumber] = useState('');
  const [classOfLand, setClassOfLand] = useState('');
  const [plotSize, setPlotSize] = useState('');

  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);

      const plotData = {
        plotOwner,
        surveyNumber,
        plotAddress,
        thandapperNumber,
        classOfLand,
        plotSize,
      };

      const response = await axiosInstance.post(
        `document/plot/create`,
        plotData
      );

      if (response.status === 201) {
        toast({
          title: 'success',
          description: response?.data?.message || 'Plot Created successfully',
          status: 'success',
          position: 'top',
          duration: 1500,
          isClosable: true,
        });
        setloading(false);
        navigate('/user/plots');
      }
    } catch (error) {
      setloading(false);
      toast({
        title: 'error',
        description: error?.response?.data?.message || 'Failed to create Plot',
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
            Add Plot Details
          </Heading>
        </Flex>

        <Flex
          as={chakra.form}
          w='100%'
          p='10'
          direction='column'
          gap='8'
          onSubmit={handleSubmit}
        >
          <Flex w='full'>
            <FormInput
              label='Plot Owner'
              id='plotOwner'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setPlotOwner(e.target.value)}
            />
            <FormInput
              label='Survey Number'
              id='surveyNumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setSurveyNumber(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <FormInput
              label='Plot Address'
              id='plotAddress'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setPlotAddress(e.target.value)}
            />
            <FormInput
              label='Thandapper Number'
              id='thandapperNumber'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setThandapperNumber(e.target.value)}
            />
          </Flex>
          <Flex w='full'>
            <SelectInput
              id='classOfLand'
              name='classOfLand'
              validator={{
                required: 'Choose Class Of Land',
              }}
              w='90%'
              options={[
                {
                  label: 'Dry',
                  value: 'Dry',
                },
                {
                  label: 'Wet',
                  value: 'Wet',
                },
                {
                  label: 'Commercial',
                  value: 'Commercial',
                },
              ]}
              optionProps={{
                background: '#2A264E',
                color: '#ffffff',
              }}
              onChange={(e) => setClassOfLand(e.target.value)}
            >
              Class Of Land
            </SelectInput>
            <FormInput
              label='Plot Size'
              id='plotSize'
              type='text'
              isRequired={true}
              w='90%'
              labelColor='brand.mainBg'
              onChange={(e) => setPlotSize(e.target.value)}
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
                navigate('/user/plots');
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

export default CreatePlot;
