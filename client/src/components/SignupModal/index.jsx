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
            <ModalHeader>Sign Up!</ModalHeader>
            <ModalCloseButton />
<ModalBody>
<FormControl>
    <FormLabel>Username</FormLabel>
    <Input placeholder='Choose a Username' />
  </FormControl>

  <FormControl>
    <FormLabel>First Name</FormLabel>
    <Input placeholder='Enter first name' />
  </FormControl>

  <FormControl>
    <FormLabel>Last Name</FormLabel>
    <Input placeholder='Enter last name' />
  </FormControl>

  <FormControl>
    <FormLabel>Email</FormLabel>
    <Input placeholder='Enter your email' />
  </FormControl>

  <FormControl mt={4}>
    <FormLabel>Password</FormLabel>
    <Input placeholder='Choose a password' type='password' />
  </FormControl>
</ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  pass
  usen
  fir
  la
  em