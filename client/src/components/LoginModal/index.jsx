import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    // ModalFooter, if i want a signup link
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  function BasicUsage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen}>Open Modal</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
<ModalBody>
  <FormControl>
    <FormLabel>Email</FormLabel>
    <Input placeholder='Enter your email' />
  </FormControl>

  <FormControl mt={4}>
    <FormLabel>Password</FormLabel>
    <Input placeholder='Enter your password' type='password' />
  </FormControl>
</ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }
