import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { profileUser } from "../../api/users/userApi";
import StatusMessage from "../Alert/StatusMessage";

const Dashboard = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryFn: profileUser,
    queryKey: ["profile"],
  });
  if (isLoading) {
    return <StatusMessage type="loading" message="Loading..." />;
  } else if (isError) {
    return (
      <StatusMessage type="error" message={error?.response?.data?.message} />
    );
  } else {
    return (
      <div className="mx-auto p-4 bg-gray-900 w-screen">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          User Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
            <div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="username"
                >
                  Name
                </label>
                <p
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="username"
                >
                  {data?.user?.username}
                </p>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <p
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  id="email"
                >
                  {data?.user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Credit Usage Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Credit Usage</h2>
            <div>
              <p className="mb-4">
                Monthly Credit: {data?.user?.monthlyRequestCount}
              </p>
              <p className="mb-4">Credit Used: {data?.user?.apiRequestCount}</p>
              <p className="mb-4">
                Credit Remaining:{" "}
                {data?.user?.monthlyRequestCount - data?.user?.apiRequestCount}
              </p>
              <p className="mb-4">
                Next Billing Date:{" "}
                {data?.user?.nextBillingDate
                  ? new Date(data?.user?.nextBillingDate).toDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Payment and Plans Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Payment & Plans</h2>
            <div>
              <p className="mb-4">Current Plan: {data?.user?.subscription}</p>
              {data?.user?.subscription === "Trial" && (
                <p className="my-4 leading-tight text-gray-700 border rounded w-full py-2 px-3">
                  Trial:1000 Monthly request
                </p>
              )}
              {data?.user?.subscription === "Free" && (
                <p className="my-4 leading-tight text-gray-700 border rounded w-full py-2 px-3">
                  Free:5 Monthly request
                </p>
              )}
              {data?.user?.subscription === "Basic" && (
                <p className="my-4 leading-tight text-gray-700 border rounded w-full py-2 px-3">
                  Basic:50 Monthly request
                </p>
              )}
              {data?.user?.subscription === "Premium" && (
                <p className="my-4 leading-tight text-gray-700 border rounded w-full py-2 px-3">
                  Premium:100 Monthly request
                </p>
              )}
              <Link
                to="/plans"
                className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upgrade Plan
              </Link>
            </div>
          </div>

          {/* Trial Information Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Trial Information</h2>
            <div>
              <p className="mb-4">
                Trial Status:{" "}
                {data?.user?.trialActive ? (
                  <span className="text-green-500">Active</span>
                ) : (
                  <span className="text-red-500">Not Active</span>
                )}
              </p>
              <p className="mb-4">
                Expires on: {new Date(data?.user?.trialExpires).toDateString()}
              </p>
              <Link
                to="/plans"
                className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upgrade to Premium
              </Link>
            </div>
          </div>

          {/* History Section */}
          <div className="mb-6 bg-white p-4 shadow rounded-lg col-span-1 md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Payment History
            </h2>
            {data?.user?.payment?.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {/* Example History Item */}
                {data?.user?.payment?.map((payment) => (
                  <li key={payment._id} className="py-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="mb-2 sm:mb-0">
                        <p className="text-sm font-medium text-indigo-600">
                          {payment.subscriptionPlan}
                        </p>
                        <p className="text-xs text-gray-500">{new Date(payment.createdAt).toDateString()}</p>
                      </div>
                      <div className="flex items-center">
                        <p className={ `text-sm font-semibold ${payment.status === "success" ? "text-green-500" : "text-red-500"}`}>
                         {payment.status}
                        </p>
                        <p className="text-sm text-gray-700 ml-4">
                          {payment.amount} {payment.currency}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No payment history found.</p>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
