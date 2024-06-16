import { Helmet } from 'react-helmet-async';

import { VerifyEmailView } from '@/sections/verify-email';

// ----------------------------------------------------------------------

export default function VerifyEmail() {
  return (
    <>
      <Helmet>
        <title> Verify Email | Safeli Escrow </title>
      </Helmet>

      <VerifyEmailView />
    </>
  );
}
