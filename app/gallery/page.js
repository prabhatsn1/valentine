"use client";
import { Box, Button, Container, Typography, IconButton } from "@mui/material";
import Image from "next/image";
import { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Sample photos - Replace with your own image paths
// Set objectFit to "cover" to crop the image, or "contain" to show the whole image
const photos = [
  { id: 1, src: "/images/photo1.jpeg", alt: "Photo 1", objectFit: "contain" },
  { id: 2, src: "/images/photo2.jpeg", alt: "Photo 2", objectFit: "cover" },
  { id: 3, src: "/images/photo3.jpg", alt: "Photo 3", objectFit: "cover" },
  { id: 4, src: "/images/photo4.jpg", alt: "Photo 4", objectFit: "cover" },
  { id: 5, src: "/images/photo5.jpg", alt: "Photo 5", objectFit: "cover" },
  { id: 6, src: "/images/photo6.jpg", alt: "Photo 6", objectFit: "cover" },
  { id: 7, src: "/images/photo7.jpg", alt: "Photo 7", objectFit: "contain" },
  { id: 8, src: "/images/photo8.jpg", alt: "Photo 8", objectFit: "cover" },
  { id: 9, src: "/images/photo9.jpg", alt: "Photo 9", objectFit: "cover" },
  { id: 10, src: "/images/photo10.jpg", alt: "Photo 10", objectFit: "contain" },
  { id: 11, src: "/images/photo11.jpg", alt: "Photo 11", objectFit: "cover" },
  { id: 12, src: "/images/photo12.jpg", alt: "Photo 12", objectFit: "cover" },
  { id: 13, src: "/images/photo13.jpg", alt: "Photo 13", objectFit: "cover" },
  { id: 14, src: "/images/photo14.jpg", alt: "Photo 14", objectFit: "contain" },
  { id: 15, src: "/images/photo15.jpg", alt: "Photo 15", objectFit: "cover" },
  { id: 16, src: "/images/photo16.jpg", alt: "Photo 16", objectFit: "contain" },
];

const styles = `
  @keyframes slideIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes slideOut {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  .carousel-container {
    animation: slideIn 0.5s ease-in-out;
  }

  .carousel-image {
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
                0 0 30px rgba(220, 20, 60, 0.2);
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .dot.active {
    background-color: #dc143c;
    transform: scale(1.2);
  }

  .dot.inactive {
    background-color: #cccccc;
  }

  .nav-button {
    transition: all 0.3s ease;
  }

  .nav-button:hover {
    background-color: rgba(220, 20, 60, 0.2);
    transform: scale(1.1);
  }
`;

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1,
    );
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 500000);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 5000);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fff5f7 0%, #ffe0e6 100%)",
        py: 6,
      }}
    >
      <style>{styles}</style>

      <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2 } }}>
        {/* Header */}
        <Typography
          variant="h3"
          component="h1"
          sx={{
            textAlign: "center",
            color: "#dc143c",
            fontWeight: "bold",
            mb: 6,
            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.5rem" },
          }}
        >
          ✨ Photo Gallery ✨
        </Typography>

        {/* Carousel Container */}
        <Box
          className="carousel-container"
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: { xs: 1, sm: 2 },
            mb: 4,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {/* Previous Button */}
          <IconButton
            onClick={goToPrevious}
            className="nav-button"
            sx={{
              color: "#dc143c",
              borderRadius: "50%",
              border: "2px solid #dc143c",
              p: { xs: 1.5, sm: 2 },
              "&:hover": {
                backgroundColor: "rgba(220, 20, 60, 0.1)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            <ChevronLeftIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
          </IconButton>

          {/* Main Image Display */}
          <Box
            sx={{
              position: "relative",
              width: { xs: "280px", sm: "350px", md: "450px" },
              height: { xs: "280px", sm: "350px", md: "450px" },
              maxHeight: "450px",
            }}
          >
            <Image
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              fill
              className="carousel-image"
              style={{
                objectFit: photos[currentIndex].objectFit,
              }}
              priority
            />
          </Box>

          {/* Next Button */}
          <IconButton
            onClick={goToNext}
            className="nav-button"
            sx={{
              color: "#dc143c",
              borderRadius: "50%",
              border: "2px solid #dc143c",
              p: { xs: 1.5, sm: 2 },
              "&:hover": {
                backgroundColor: "rgba(220, 20, 60, 0.1)",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            <ChevronRightIcon sx={{ fontSize: { xs: 24, sm: 32 } }} />
          </IconButton>
        </Box>

        {/* Dots Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 1, sm: 1.5 },
            mb: 6,
            flexWrap: "wrap",
          }}
        >
          {photos.map((_, index) => (
            <Box
              key={index}
              className={`dot ${index === currentIndex ? "active" : "inactive"}`}
              onClick={() => goToIndex(index)}
              sx={{
                backgroundColor: index === currentIndex ? "#dc143c" : "#cccccc",
                cursor: "pointer",
                "&:active": {
                  transform: "scale(0.8)",
                },
              }}
            />
          ))}
        </Box>

        {/* Photo Counter */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#666",
            mb: 4,
            fontSize: { xs: "0.875rem", sm: "1rem" },
          }}
        >
          {currentIndex + 1} / {photos.length}
        </Typography>

        {/* Back Button */}
        <Box sx={{ display: "flex", justifyContent: "center", px: 2 }}>
          <Button
            href="/"
            variant="outlined"
            sx={{
              color: "#dc143c",
              borderColor: "#dc143c",
              textTransform: "none",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              px: { xs: 2, sm: 3 },
              py: { xs: 1, sm: 1.2 },
              "&:hover": {
                backgroundColor: "rgba(220, 20, 60, 0.1)",
                borderColor: "#dc143c",
              },
              "&:active": {
                transform: "scale(0.98)",
              },
            }}
          >
            ← Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
