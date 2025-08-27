const apiPaths = () => {
  return (
    <ul>
      <li>
        <code>/api/v1/courses</code> - Get all courses
      </li>
      <li>
        <code>/api/v1/courses/:id</code> - Get course by ID
      </li>
      <li>
        <code>/api/v1/users</code> - Get all users
      </li>
      <li>
        <code>/api/v1/users/:id</code> - Get user by ID
      </li>
    </ul>
  );
};

export default apiPaths;
