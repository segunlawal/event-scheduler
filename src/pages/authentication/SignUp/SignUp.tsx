import TopNav from "../../../components/TopNav";

export const SignUp = (): JSX.Element => {
  return (
    <div className="text-center">
      <TopNav />
      <p className="text-xl">Welcome to Habitter</p>
      <p>Create an account to keep track k of your habits</p>
      <div className="flex flex-col">
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          name="first-name"
          className="border-[1px] rounded-sm mx-auto"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          name="last-name"
          className="border-[1px] rounded-sm mx-auto"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="last-name">Email</label>
        <input
          type="email"
          name="last-name"
          className="border-[1px] rounded-sm mx-auto"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className="border-[1px] rounded-sm mx-auto"
        />
      </div>
      <button type="submit" className="text-white px-10 py-2 bg-[#217BF4]">
        Create Account
      </button>
      <p>OR</p>
      <button type="submit" className="px-10 border-2 py-2 border-[#217BF4]">
        Sign Up using Google
      </button>
    </div>
  );
};
