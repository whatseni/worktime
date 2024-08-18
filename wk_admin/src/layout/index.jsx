
import Box from '@mui/material/Box';
import Header from './Header';
import Nav from './Nav';
import Main from './Main';
import { useState } from 'react';


// ----------------------------------------------------------------------

export default function MainLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  return (
    <>
      <Header  onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)}/>
        <Main>{children}</Main>
      </Box>
    </>
  );
}
