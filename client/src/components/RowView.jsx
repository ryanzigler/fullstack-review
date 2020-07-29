import React from 'react';

var RowView = ({ repo }) => (
  <tr>
    <td>{repo.starCount}</td>
    <td><a href={`${repo.repoURL}`}>{repo.repoName}</a></td>
    <td>{repo.userLogin}</td>
  </tr>
)

export default RowView;