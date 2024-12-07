import { useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from 'react-icons/io';
import { IconButton } from '@chakra-ui/react';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <IconButton onClick={() => navigate(-1)} position="fixed" top={4} left={4}>
      <IoMdArrowBack />
    </IconButton>
  );
};

export default BackButton;
