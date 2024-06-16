import { Helmet } from 'react-helmet-async';

import { ForgotPasswordView } from '@/sections/forgot-password';

// ----------------------------------------------------------------------

export default function ForgotPassword() {
  return (
    <>
      <Helmet>
        <title> Forgot Password | Safeli Escrow </title>
      </Helmet>

      <ForgotPasswordView />
    </>
  );
}
