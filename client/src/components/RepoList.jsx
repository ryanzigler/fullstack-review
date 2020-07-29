import React from 'react';
import RowView from './RowView.jsx'

const RepoList = (props) => (
  <div>
    <h2> Top {props.repos.length} Starred Repos on GitHub </h2>
    <table>
      <tbody>
        <tr>
          <th>Stars</th>
          <th>Repository</th>
          <th>User</th>
        </tr>
        {props.repos.map(repo => < RowView key={ repo._id } repo={repo} />)}
      </tbody>
    </table>
  </div>
)

export default RepoList;