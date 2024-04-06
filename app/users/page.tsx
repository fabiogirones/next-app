import React from 'react';
import UserTable from './UserTable';

interface Props {
  searchParams: {sortOrder: string}
}

const UsersPage = async ({searchParams: {sortOrder}}: Props) => {
  return (
    <>
      <h1>Users</h1>
      <p>{new Date().toLocaleTimeString()}</p>
      <UserTable sortOrder={sortOrder} />
    </>
  )
}

export default UsersPage
