"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  Icon,
  Text,
  Flex,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import axios from "axios";
import { TbUvIndex } from "react-icons/tb";
import { PiWindmillFill } from "react-icons/pi";
import { FaWater } from "react-icons/fa";
import moment from "moment";
import Sidebar from "@/components/Sidebar";
import CreateOrEditContact from "@/components/CreateOrEditContact";
import { BsThreeDotsVertical } from "react-icons/bs";

// interface Props {
//   setWeeklyForeCast: Function;
// }

// const Contacts: React.FC<Props> = ({ setWeeklyForeCast }) => {
const Contacts = ({}) => {
  const [allContactsData, setAllContactsData] = useState<any>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [contactData, setContactData] = useState<any>();

  const getAllContacts = async () => {
    const accessToken = localStorage.getItem("token");

    try {
      const response = await axios.get(`http://localhost:5000/api/contacts`, {
        headers: {
          "auth-token": accessToken,
        },
      });
      setAllContactsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  const editContact = (contactId: string) => {
    const contact = allContactsData.filter(
      (contact: any) => contact._id === contactId
    );
    setContactData(contact);
    setIsEditing(true);
  };

  const deleteContact = async (contactId: string) => {
    const accessToken = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/contacts/${contactId}`,
        {
          headers: {
            "auth-token": accessToken,
          },
        }
      );
      getAllContacts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Flex w="full" className="frost-effect" p="8" justifyContent={"center"}>
        <Text fontSize={"32px"} color="white" fontWeight={"bold"}>
          Welcome to admin panel
        </Text>
      </Flex>
      <Flex maxW="90%" mx="auto" gap="4" mt="4">
        <Sidebar />
        <Box w="100%" h="90vh" className="frost-effect" p="6">
          <CreateOrEditContact
            isEditing={isEditing}
            getAllContacts={getAllContacts}
            contactData={contactData}
            setIsEditing={setIsEditing}
          />
          {!allContactsData ||
            (allContactsData.length === 0 && (
              <Text
                fontSize={"2xl"}
                textAlign="center"
                fontWeight={500}
                color="white"
              >
                No Contacts added!
              </Text>
            ))}
          {allContactsData && allContactsData.length > 0 && (
            <TableContainer mt="4">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th fontSize={"lg"} fontWeight={"semibold"} color="white">
                      Name
                    </Th>
                    <Th fontSize={"lg"} fontWeight={"semibold"} color="white">
                      Phone
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {allContactsData &&
                    allContactsData.map((contact: any) => (
                      <Tr>
                        <Td
                          fontSize={"sm"}
                          fontWeight={"semibold"}
                          color="white"
                        >
                          {contact.name}
                        </Td>
                        <Td
                          fontSize={"sm"}
                          fontWeight={"semibold"}
                          color="white"
                        >
                          {contact.phone}
                        </Td>
                        <Td>
                          <Menu>
                            <MenuButton
                              p="0"
                              _hover={{
                                backgroundColor: "transparent",
                                border: "1px solid white",
                              }}
                              bgColor="transparent"
                              as={Button}
                            >
                              <Icon
                                as={BsThreeDotsVertical}
                                color="white"
                                zIndex={50}
                                boxSize="6"
                              />
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                onClick={() => editContact(contact._id)}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => deleteContact(contact._id)}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Flex>
    </>
  );
};

export default Contacts;
