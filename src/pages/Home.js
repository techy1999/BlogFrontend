import React, { useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField, Button, Container, Typography, Avatar, TextareaAutosize } from '@mui/material'
import heroImage1 from './../assets/undraw_educator.svg';
import heroImage2 from './../assets/undraw_content_team.svg';
import Team1 from './../assets/undraw_meet_the_team.svg';
import engineeringService from './../assets/undraw_engineering_team.svg';
import contactUs from './../assets/undraw_contact_us.svg';

const Content = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 20px', // Adjust as needed
});
const ContentCenter = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: "20px",
});


const Image = styled('img')({
    maxWidth: '100%',
    height: 'auto',
});

const Home = () => {

    const [messageObj,setMessageObj] = useState({
        name:"",
        email:"",
        message:"",
    })

    const handleContactUs = (event) => {
        const { name, value } = event.target;
        setMessageObj(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmitContactUs = (event) => {
        event.preventDefault();

        // Perform any form validation here before submitting the data
        console.log("Form submitted:", messageObj); // Log the form data
        setMessageObj({
            name: "",
            email: "",
            message: ""
        });
    }
    

    return (
        <>
            <Container>
                <Grid container spacing={4} mt={4}>
                    <Grid item xs={12} md={6}>
                        <Image
                            src={heroImage1}
                            alt={"Not Found"}
                            loading="lazy"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Content>
                            <Typography variant="h2" mt={2}>
                                What we provide <span style={{ color: "#1976D2" }}>at Nomads ?</span>
                            </Typography>
                            <Typography variant="body1" mt={2}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos
                            </Typography>
                        </Content>
                    </Grid>
                </Grid>

                <Grid container spacing={4} mt={4}>

                    <Grid item xs={12} md={6}>
                        <Content>
                            <Typography variant="h2" mt={2}>
                                Invovative team <span style={{ color: "#1976D2" }}>at Nomads ?</span>
                            </Typography>
                            <Typography variant="body1" mt={2}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid. Reprehenderit,
                                quia. Quo neque error repudiandae fuga? Ipsa laudantium molestias eos.
                                <Typography variant="h6">   Responsiblity of team <span style={{ color: "#1976D2" }}>at Nomads ?</span> </Typography>
                            </Typography>
                        </Content>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Image
                            src={heroImage2}
                            alt={"Not Found"}
                            loading="lazy"
                        />
                    </Grid>

                </Grid>


                <ContentCenter >
                    <Typography variant="h2" mt={4}>
                        Meet our team <span style={{ color: "#1976D2" }}>at Nomads ?</span>
                    </Typography>
                </ContentCenter>
                <Grid container spacing={4} mt={4}>


                    <Grid item xs={12} md={4}>
                        <Content>

                            <Avatar
                                alt="Remy Sharp"
                                src={Team1}
                                sx={{ width: 200, height: 150 }}
                            />
                            <Typography variant="h6" mt={4}>
                                Arun Pandit, <span style={{ color: "#1976D2" }}>Founder && CE0</span>
                            </Typography>

                            <Typography variant="body1" mt={2}>

                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis

                            </Typography>
                        </Content>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Content>
                            <Avatar
                                alt="Remy Sharp"
                                src={Team1}
                                sx={{ width: 200, height: 150 }}
                            />
                            <Typography variant="h6" mt={4}>
                                Shradha Patiel, <span style={{ color: "#1976D2" }}>Marketing Head &&  Co-founder</span>
                            </Typography>
                            <Typography variant="body1" mt={2}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            </Typography>
                        </Content>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Content>
                            <Avatar
                                alt="Remy Sharp"
                                src={Team1}
                                sx={{ width: 200, height: 150 }}
                            />
                            <Typography variant="h6" mt={4}>
                                Piyush raj, <span style={{ color: "#1976D2" }}>Content Course Management </span>
                            </Typography>

                            <Typography variant="body1" mt={2}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            </Typography>
                        </Content>
                    </Grid>

                </Grid>

                <ContentCenter >
                    <Typography variant="h2" mt={4}>
                        Services provided <span style={{ color: "#1976D2" }}>at Nomads ?</span>
                    </Typography>
                </ContentCenter>
                <Grid container spacing={4} mt={4}>


                    <Grid item xs={12} md={4}>
                        <Content>

                            <Avatar
                                alt="Remy Sharp"
                                src={engineeringService}
                                sx={{ width: 200, height: 150 }}
                            />
                            <Typography variant="h6" mt={4}>
                                Software Project, <span style={{ color: "#1976D2" }}>Handling</span>
                            </Typography>

                            <Typography variant="body1" mt={2}>

                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis

                            </Typography>
                        </Content>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Content>
                            <Avatar
                                alt="Remy Sharp"
                                src={engineeringService}
                                sx={{ width: 200, height: 150 }}
                            />
                            <Typography variant="h6" mt={4}>
                                Learning Material, <span style={{ color: "#1976D2" }}>Platform</span>
                            </Typography>
                            <Typography variant="body1" mt={2}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            </Typography>
                        </Content>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Content>
                            <Avatar
                                alt="Remy Sharp"
                                src={engineeringService}
                                sx={{ width: 200, height: 150 }}
                            />
                            <Typography variant="h6" mt={4}>
                                Blog , <span style={{ color: "#1976D2" }}>page provider </span>
                            </Typography>

                            <Typography variant="body1" mt={2}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                            </Typography>
                        </Content>
                    </Grid>

                </Grid>


                <Grid container spacing={4} mt={4}>
                    <Grid item xs={12} md={6}>
                        <Image
                            src={contactUs}
                            alt={"Not Found"}
                            loading="lazy"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Content>

                            <form >
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    margin="auto"
                                    marginTop={5}
                                    padding={3}
                                >
                                    <Typography variant="h4">
                                        <span style={{ color: "#1976D2" }}>Contact Us?</span>
                                    </Typography>

                                    <TextField
                                        placeholder="Name"
                                        name="name"
                                        type={"text"}
                                        sx={{ marginTop: 3 }}
                                        value={messageObj.name}
                                        onChange={handleContactUs}
                                        required
                                    />
                                    <TextField
                                        placeholder="Email"
                                        name="email"
                                        type={"email"}
                                        sx={{ marginTop: 3 }}
                                        value={messageObj.email}
                                        onChange={handleContactUs}
                                        required
                                    />
                                      <TextareaAutosize
                                        placeholder="Message"
                                        name="message"
                                        type={"text"}
                                        style={{marginTop:"20px",width:"100%",padding:"10px"}}
                                        value={messageObj.message}
                                        onChange={handleContactUs}
                                        minRows={5}

                                        required
                                    />

                                    <Button
                                        sx={{ borderRadius: 3, marginTop: 3 }}
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmitContactUs}
                                    >
                                        Submit
                                    </Button>

                                </Box>
                            </form>
                        </Content>
                    </Grid>
                </Grid>

            </Container>
        </>
    );
};

export default Home;
