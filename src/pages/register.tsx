import { Helmet } from 'react-helmet-async';

import { RegisterView } from '@/sections/register';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title> Register | Safeli Escrow </title>
      </Helmet>

      <RegisterView />
    </>
  );
}
