import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { Children } from 'react'
import {Text} from '@chakra-ui/react'

const ProfileModal = ({user, children}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}

      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader fontSize="40px" fontfamily="work sans" d="flex" className='dr' justifyContent="center">{ user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" classname='dr' flexDir="column" alignItems="center" justifyContent="space-between">
            <Image borderRadius="full" boxSize="150px" src={user.pic} alt={user.name} />
            <Text fontSize={{base: "28px", md: "30px"}} fontFamily="work sans" />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;