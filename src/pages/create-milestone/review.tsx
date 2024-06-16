import { Helmet } from 'react-helmet-async';

import ReviewView from '@/sections/create-milestone/review-view';

// ----------------------------------------------------------------------

export default function Review() {
  return (
    <>
      <Helmet>
        <title> Review | Create Milestone </title>
      </Helmet>

      <ReviewView />
    </>
  );
}
