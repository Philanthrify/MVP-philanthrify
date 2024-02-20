import PageBox from "@/components/PageBox";
import { CharityPagePayload } from "@/models/charity";
import { setCharity } from "@/redux/charitySlice";
import { RootState } from "@/redux/store";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const CharityPage = () => {
  const dispatch = useDispatch();
  const { ukCharityNumber } = useParams<{ ukCharityNumber: string }>();
  const charity = useSelector((state: RootState) => state.charity.charity);

  useEffect(() => {
    console.log("🚀 ~ CharityPage ~ ukCharityNumber:", ukCharityNumber);
    const loadCharity = async () => {
      try {
        const response = await axios.get<CharityPagePayload>(
          `${import.meta.env.VITE_API_URL}/charity/${ukCharityNumber}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              projects: true,
            },
          }
        );
        console.log("🚀 ~ loadCharity ~ response:", response);
        dispatch(setCharity(response.data));
      } catch (error: any) {
        console.error("Failed to load Charity:", error.message);
      }
    };
    if (ukCharityNumber) {
      loadCharity();
    }
  }, [dispatch, ukCharityNumber]);
  // if not found the project yet then return loading screen
  if (!charity) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <>
      <PageBox backgroundColor="primary.700">
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography variant="h2" color="white.light">
              {charity.charityName.toUpperCase()}
            </Typography>
          </Grid>

          <Grid item></Grid>
        </Grid>
      </PageBox>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item></Grid>
      </Grid>
    </>
  );
};

export default CharityPage;
