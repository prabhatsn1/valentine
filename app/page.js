"use client";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import mid from "../public/images/mid.gif";
import yes from "/public/images/yes.gif";
import no from "/public/images/no.gif";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { event as gtagEvent } from "../lib/gtag";

const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  @keyframes heartbeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.15); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(220, 20, 60, 0.5), 0 0 40px rgba(255, 192, 203, 0.3); }
    50% { box-shadow: 0 0 30px rgba(220, 20, 60, 0.8), 0 0 60px rgba(255, 192, 203, 0.5); }
  }

  @keyframes fall {
    0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }

  @keyframes shimmer {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  @keyframes rotate-continuous {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .heart-container {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    overflow: hidden;
  }

  .falling-heart {
    position: absolute;
    font-size: 2rem;
    animation: fall linear infinite;
    opacity: 0.7;
  }

  .stethoscope-icon {
    display: inline-block;
    animation: rotate-continuous 8s linear infinite;
    margin: 0 10px;
  }

  .yes-button-animated {
    animation: float 3s ease-in-out infinite, heartbeat 1.5s ease-in-out infinite !important;
  }

  .no-button-shake {
    animation: pulse-glow 0.5s ease-in-out !important;
  }

  .romantic-bg {
    background: linear-gradient(135deg, #fff5f7 0%, #ffe4e9 50%, #fff0f3 100%);
    min-height: 100vh;
    position: relative;
    overflow: hidden;
  }

  .romantic-bg::before {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(255, 192, 203, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    top: -50px;
    left: -50px;
    animation: shimmer 4s ease-in-out infinite;
  }

  .romantic-bg::after {
    content: '';
    position: absolute;
    width: 200px;
    height: 200px;
    background: radial-gradient(circle, rgba(220, 20, 60, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    bottom: -50px;
    right: -50px;
    animation: shimmer 4s ease-in-out infinite;
  }
`;

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
  const [hearts, setHearts] = useState([]);

  const total = answers.length;
  const sizes = [25, 30, 45, 40, 50, 75, 85, 100];
  const emoji = "❤️";

  useEffect(() => {
    if (isYes) {
      const interval = setInterval(() => {
        const newHeart = {
          id: Math.random(),
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 2 + Math.random() * 1,
        };
        setHearts((prev) => [...prev, newHeart]);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isYes]);

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
    <>
      <style>{styles}</style>
      <Box className="romantic-bg">
        <Grid
          container
          sx={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minHeight: "100vh",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Grid item mb={3}>
            <Typography
              variant="h4"
              sx={{
                background: "linear-gradient(135deg, #dc143c, #ff69b4)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: "bold",
                letterSpacing: 2,
                textAlign: "center",
                mb: 2,
              }}
            >
              To the doctor who stole my heart, Dr Dhriti Ghosh,
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "#dc143c",
                fontWeight: "500",
                textAlign: "center",
                mb: 3,
              }}
            >
              My heart belongs to you, always{" "}
              <span className="stethoscope-icon">🩺</span>
            </Typography>
          </Grid>

          <Grid item mb={4}>
            <Box
              sx={{
                position: "relative",
                animation: isYes ? "heartbeat 1s ease-in-out infinite" : "none",
              }}
            >
              <Image
                width={300}
                height={300}
                src={showImage}
                alt="image"
                style={{
                  borderRadius: "20px",
                  boxShadow: isYes
                    ? "0 0 40px rgba(220, 20, 60, 0.8)"
                    : "0 10px 30px rgba(0, 0, 0, 0.2)",
                  transition: "all 0.3s ease",
                }}
              ></Image>
            </Box>
          </Grid>

          {isYes ? (
            <Stack
              spacing={3}
              sx={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  background: "linear-gradient(135deg, #dc143c, #ff1493)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontWeight: "bold",
                  textAlign: "center",
                  animation: "heartbeat 1s ease-in-out infinite",
                }}
              >
                Yepppie, see you sooonnn Babes {emoji}
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  color: "#666",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Now let me take your vitals... with my heart 💕
              </Typography>
              <Box
                sx={{
                  fontSize: "3rem",
                  animation: "float 2s ease-in-out infinite",
                }}
              >
                💉 🩺 💊
              </Box>
              <Link href="/gallery" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  sx={{
                    background: "linear-gradient(135deg, #ff1493, #dc143c)",
                    color: "white",
                    padding: "6px 16px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    borderRadius: "25px",
                    boxShadow: "0 8px 20px rgba(220, 20, 60, 0.4)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 30px rgba(220, 20, 60, 0.6)",
                      transform: "scale(1.05)",
                      filter: "brightness(1.1)",
                    },
                  }}
                >
                  Little Surprise 🎞️
                </Button>
              </Link>
            </Stack>
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
                <Box
                  onClick={onYesClicks}
                  className="yes-button-animated"
                  sx={{
                    width: size,
                    height: size,
                    background: "linear-gradient(135deg, #ff1493, #dc143c)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    color: "white",
                    clipPath:
                      "polygon(50% 100%, 100% 50%, 100% 25%, 75% 0%, 50% 25%, 25% 0%, 0% 25%, 0% 50%)",
                    boxShadow: "0 8px 20px rgba(220, 20, 60, 0.4)",
                    "&:hover": {
                      boxShadow: "0 12px 30px rgba(220, 20, 60, 0.6)",
                      transform: "scale(1.05)",
                      filter: "brightness(1.1)",
                    },
                  }}
                >
                  Yes
                </Box>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={onNoClicks}
                  color="error"
                  size="small"
                  sx={{
                    borderRadius: "20px",
                    padding: "10px 20px",
                    fontWeight: "600",
                    background: "linear-gradient(135deg, #ff6b6b, #ff5252)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateX(-10px)",
                      boxShadow: "0 5px 15px rgba(255, 0, 0, 0.4)",
                    },
                  }}
                >
                  {answer}
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>

        {/* Falling hearts animation when Yes is clicked */}
        <div className="heart-container">
          {hearts.map((heart) => (
            <div
              key={heart.id}
              className="falling-heart"
              style={{
                left: `${heart.left}%`,
                animation: `fall ${heart.duration}s linear forwards`,
                animationDelay: `${heart.delay}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}
