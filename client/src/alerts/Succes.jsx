import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";

const Success = ({ msg, setAlert }) => {
  const onClose = () => {
    setAlert({});
  };
  return (
    <>
      <Alert status="success">
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

export default Success;
