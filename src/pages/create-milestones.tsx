import { Helmet } from 'react-helmet-async';

import { CreateMilestoneView } from '@/sections/create-milestone';

// ----------------------------------------------------------------------

export default function CreateMilestone() {
  return (
    <>
      <Helmet>
        <title> Add Milestones | Create Milestone </title>
      </Helmet>

      <CreateMilestoneView />
    </>
  );
}
