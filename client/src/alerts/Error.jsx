import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";

const Error = ({ msg, setAlert }) => {
  const onClose = () => {
    setAlert({});
  };
  
  return (
    <>
      <Alert status="error">
        <AlertIcon />
        {msg}
        <CloseButton
          alignSelf="flex-start"
          position="absolute"
          right={2}
          top={2}
          onClick={onClose}
        />
      </Alert>
    </>
  );
};

export default Error;
