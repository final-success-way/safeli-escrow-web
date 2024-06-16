import { Helmet } from 'react-helmet-async';

import AddContractView from '@/sections/create-milestone/add-contract-view';

// ----------------------------------------------------------------------

export default function AddContract() {
  return (
    <>
      <Helmet>
        <title> Add Contract | Create Milestone </title>
      </Helmet>

      <AddContractView />
    </>
  );
}
