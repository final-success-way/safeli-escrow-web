import { Helmet } from 'react-helmet-async';

import { MilestoneDetailView } from '@/sections/milestone-detail';

// ----------------------------------------------------------------------

export default function MilestoneDetailPage() {
  return (
    <>
      <Helmet>
        <title> Milestone Detail | Safeli Escrow </title>
      </Helmet>

      <MilestoneDetailView />
    </>
  );
}
