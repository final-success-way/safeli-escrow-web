import { Helmet } from 'react-helmet-async';

import MilestoneDescriptionView from '@/sections/create-milestone/milestone-description-view';

// ----------------------------------------------------------------------

export default function MilestoneDescription() {
  return (
    <>
      <Helmet>
        <title> Description | Create Milestone </title>
      </Helmet>

      <MilestoneDescriptionView />
    </>
  );
}
