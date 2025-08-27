const Login = () => {
  return (
    <div>
      <h1 className="text-5xl">Login to QueazyLearn</h1>
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="border p-2" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" className="border p-2" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
