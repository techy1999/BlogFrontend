import React from "react";
import Container from "@mui/material/Container";

import { Box, Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { FOOTER_MENUS } from '../constants/footer/footer.constants'

import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  return (
    <>
      <Paper
        sx={{
          marginTop: "calc(10% + 60px)",
          width: "100%",
          background: "#3C76D2",
        }}
        component="footer"
        square
        variant="outlined"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              my: 1,
              alignItems: "center"
            }}
          ></Box>

          <Box
            sx={{
              mb: 2,
            }}
          >

            <Box sx={{ marginTop: "30px" }}>
              <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {FOOTER_MENUS.map((footer_item, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index} color={"white"}>
                    <a style={{ cursor: "pointer", color: "white" }} href={footer_item.URL}> {footer_item.TEXT} </a>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box style={{ marginTop: "30px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>

              <Box>
                <IconButton color="white">
                  <YouTubeIcon />
                </IconButton>
                <IconButton color="white">
                  <LinkedInIcon />
                </IconButton>
                <IconButton color="white">
                  <InstagramIcon />
                </IconButton> 
                <IconButton color="white">
                  <FacebookIcon />
                </IconButton>
              </Box>
              <Typography variant="caption" color="white" textAlign={"center"}>
                Copyright ©{new Date().getFullYear()}.  NOMADS.SOLUTIONS
              </Typography>
            </Box>

          </Box>
        </Container>
      </Paper>
    </>
  );
};

export default Footer;
