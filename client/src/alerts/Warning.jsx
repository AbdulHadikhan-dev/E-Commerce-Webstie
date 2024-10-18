import { Alert, AlertIcon, CloseButton } from "@chakra-ui/react";

const Warning = ({ msg, setAlert }) => {
  const onClose = () => {
    setAlert({});
  };
  return (
    <>
      <Alert status="warning">
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

export default Warning;
