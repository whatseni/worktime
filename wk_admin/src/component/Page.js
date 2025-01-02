import { Box } from "@mui/material";
import { forwardRef } from "react";
import { Helmet } from "react-helmet-async";

const Page = forwardRef(({ children, title = '', ...other}, ref) => {
  return (
  <Box ref={ref} {...other}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </Box>
  )
})

export default Page;