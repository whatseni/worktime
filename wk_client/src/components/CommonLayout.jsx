import { Box, Container } from "@mui/material";

export default function CommonLayout({ children }) {
  return (
    <Container sx={{
      position: "absolute",
      top: "45%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        width="100%"
        height="100%"
      >
        {children}
      </Box>
    </Container>
  )
}