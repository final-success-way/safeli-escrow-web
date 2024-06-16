import { Helmet } from 'react-helmet-async';

import SelectMilestoneTypeView from '@/sections/create-milestone/select-milestone-type-view';

// ----------------------------------------------------------------------

export default function SelectMilestoneType() {
  return (
    <>
      <Helmet>
        <title> Select Type | Create Milestone </title>
      </Helmet>

      <SelectMilestoneTypeView />
    </>
  );
}
