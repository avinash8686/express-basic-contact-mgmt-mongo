import React, { useEffect, useMemo } from "react";
import {
  FormErrorMessage,
  Flex,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import { contactForm } from "@/utils/forms/contactForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IoLogOut } from "react-icons/io5";

interface Props {
  getAllContacts: Function;
  isEditing: Boolean;
  contactData: any;
  setIsEditing: Function;
}

type IContactForm = yup.InferType<typeof contactForm>;

const defaultValues: IContactForm = {
  name: "",
  phone: "",
};

const CreateOrEditContact: React.FC<Props> = ({
  getAllContacts,
  isEditing,
  contactData,
  setIsEditing,
}) => {
  const router = useRouter();
  const values = isEditing ? contactData[0] : defaultValues;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    unregister,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<IContactForm>({
    resolver: yupResolver(contactForm),
    mode: "onChange",
    reValidateMode: "onChange",
    // @ts-ignore
    defaultValues: defaultValues,
    values: values,
  });

  const name = watch("name");
  const phone = watch("phone");

  const createContact = (data: IContactForm) => {
    const accessToken = localStorage.getItem("token");
    axios
      .post("http://localhost:5000/api/contacts/", data, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response: any) {
        reset(defaultValues);
        getAllContacts();
        onClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const editContact = (data: IContactForm) => {
    const accessToken = localStorage.getItem("token");
    axios
      .put(`http://localhost:5000/api/contacts/${data._id}`, data, {
        headers: {
          "Content-Type": "application/json",
          "auth-token": accessToken,
        },
      })
      .then(function (response: any) {
        reset(defaultValues);
        getAllContacts();
        onClose();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = (data: IContactForm) => {
    isEditing ? editContact(data) : createContact(data);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    router.replace("/");
  };

  const createOrEditContact = () => {
    onOpen();
  };

  useEffect(() => {
    if (isEditing) {
      createOrEditContact();
    }
  }, [isEditing]);

  const onModalCloseHandler = () => {
    setIsEditing(false);
    onClose();
  };

  return (
    <>
      <Button textAlign={"center"} type="submit" onClick={createOrEditContact}>
        Create Contact
      </Button>
      <Modal onClose={onModalCloseHandler} size={"lg"} isOpen={isOpen}>
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="80%"
          backdropBlur="2px"
        />
        <ModalContent
          p="8"
          mx="auto"
          mt="10%"
          backgroundColor={"white"}
          borderRadius={"20px"}
          width="50%"
        >
          <Box display={"flex"} justifyContent={"space-between"} w="100%">
            <Text
              width="300px"
              display={"block"}
              fontSize={"24px"}
              fontWeight={700}
            >
              {isEditing ? "Edit" : "Create"} a Contact
            </Text>
            <ModalCloseButton />
          </Box>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  border="1px solid lightgrey"
                  borderRadius="14px"
                  p="6"
                  placeholder="Contact Name"
                  {...register("name")}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  border="1px solid lightgrey"
                  borderRadius="14px"
                  p="6"
                  type="number"
                  placeholder="Phone no:"
                  {...register("phone")}
                />
                <FormErrorMessage>{`${errors?.phone?.message}`}</FormErrorMessage>
              </FormControl>

              <Button
                mt="4"
                backgroundColor="black"
                color="white"
                px="12"
                py="6"
                borderRadius="14px"
                type="submit"
                isDisabled={!isValid}
                _disabled={{ backgroundColor: "grey" }}
                _hover={{
                  bg: "black.500",
                  _disabled: {
                    backgroundColor: "grey",
                    cursor: "not-allowed",
                  },
                }}
              >
                {isEditing ? "Update" : "Add"}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateOrEditContact;
