import { Helmet } from 'react-helmet-async';

import { AddMilestonesView } from '@/sections/create-milestone/add-milestones-view';

// ----------------------------------------------------------------------

export default function AddMilestones() {
  return (
    <>
      <Helmet>
        <title> Add Milestones | Create Milestone </title>
      </Helmet>

      <AddMilestonesView />
    </>
  );
}
