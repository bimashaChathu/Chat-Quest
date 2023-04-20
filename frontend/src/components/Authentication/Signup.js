import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Signup()  {
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [image, setImage] = useState();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [loading, setloading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    

    const postDetails = (pics) => {
        setloading(true);
        if (pics === undefined) {
            toast({
                title: "Please select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            return;
        
        };
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "Chat-Quest");
            data.append("cloud_name", "dnpkrypai")
            fetch("https://api.cloudinary.com/v1_1/dnpkrypai/image/upload", {
                method: "post",
                body: data
            }).then((res) => res.json())
                .then((data) => {
                    setImage(data.url.toString());
                    console.log(data.url.toString());
                    setloading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setloading(false);
                })
        } else {
            toast({
                title: "Please select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom"
            });
            setloading(false);
            return;
        }
    }
  


    const submitHandler = async (e) => {
        e.preventDefault();
        setloading(true);
        if (!fname || !lname || !email || !password || !confirmpassword) {
            toast({
              title: "Please fill all the fields!",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setloading(false);
            return;
        }

        if (password !== confirmpassword) {
            toast({
              title: "Passwords not matched!",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };
            const { data } = await axios.post("/api/user", {
                fname, lname, email, password, image
            },
                config
            );
            toast({
              title: "Registration Seccessful!",
              status: "success",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setloading(false);
            history.push("/chats")
        } catch (error) {
            toast({
              title: "Error Occured!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            setloading(false);
        }
  };

    return (
      <VStack spacing="5px">
        <form onSubmit={submitHandler}>
          <FormControl id="first-name" isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              required
              placeholder="First Name"
              onChange={(e) => setFname(e.target.value)}
            />
          </FormControl>

          <FormControl id="last-name" isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              required
              placeholder="Last Name"
              onChange={(e) => setLname(e.target.value)}
            />
          </FormControl>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              required
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                required
                type={show ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  height="1.75rem"
                  size="sm"
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="confirm-password" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <Input
                required
                type={show1 ? "text" : "password"}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <InputRightElement>
                <Button
                  height="1.75rem"
                  size="sm"
                  onClick={() => setShow1(!show1)}
                >
                  {show1 ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <FormControl id="image" isRequired>
            <FormLabel>Upload Your Picture</FormLabel>
            <Input
              required
              type="file"
              padding={1.5}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="green"
            width={"100%"}
            style={{ marginTop: 15 }}
            // onClick={submitHandler}
            isLoading={loading}
          >
            Sign Up
          </Button>
        </form>
      </VStack>
    );
}


export default Signup;
