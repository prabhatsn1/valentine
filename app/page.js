"use client";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import mid from "../public/images/mid.gif";
import yes from "/public/images/yes.gif";
import no from "/public/images/no.gif";
import Image from "next/image";
import { useEffect, useState } from "react";
import { event as gtagEvent } from "../lib/gtag";

export default function Home() {
  const answers = [
    "Are you sure?",
    "Are you really sure??",
    "Are you really realy sure???",
    "Think again?",
    "Don't believe in second chances?",
    "Why are you being so cold?",
    "Maybe we can talk about it?",
    "I am not going to ask again!",
    "Ok now this is hurting my feelings!",
    "You are now just being mean!",
    "Why are you doing this to me?",
    "Please give me a chance!",
    "I am begging you to stop!",
    "Ok, Lets just start over..",
  ];
  const [answer, setAnswers] = useState("No");
  const [showImage, setImage] = useState(mid);
  const [size, setSize] = useState(30);
  const [count, setCount] = useState(0);
  const [isYes, setIsYes] = useState(false);

  const total = answers.length;
  const sizes = [25, 30, 45, 40, 50, 75, 85, 100];
  const emoji = "🥰";

  const onNoClicks = () => {
    const randomSize = Math.floor(Math.random() * sizes.length);
    const newCount = count + 1;
    setCount(newCount);
    setSize(size + sizes[randomSize]);
    setImage(no);
    setAnswers(answers[count]);
    // send GA event
    try {
      gtagEvent({
        action: "no_click",
        category: "engagement",
        label: `no_button_${newCount}`,
        value: newCount,
      });
    } catch (e) {
      // ignore if gtag not available
    }
    if (count === total - 1) {
      setSize(50);
      setCount(0);
      setAnswers("No a chance in hell");
    }
  };
  const onYesClicks = () => {
    setImage(yes);
    setIsYes(true);
    try {
      gtagEvent({
        action: "yes_click",
        category: "engagement",
        label: "yes_button",
      });
    } catch (e) {}
  };

  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid item mb={2}>
        <Image width={300} height={300} src={showImage} alt="image"></Image>
      </Grid>
      {isYes ? (
        <Typography variant="h3" mt={4}>
          Yepppie, see you sooonnn Babes {emoji}
        </Typography>
      ) : (
        <Grid
          container
          item
          spacing={2}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item>
            <Button
              variant="contained"
              onClick={onYesClicks}
              sx={{ width: size, height: size, borderRadius: 0 }}
            >
              Yes
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              onClick={onNoClicks}
              color="error"
              size="small"
              sx={{ borderRadius: 0 }}
            >
              {answer}
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
