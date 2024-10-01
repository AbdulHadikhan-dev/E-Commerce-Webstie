import {
  FiEdit2,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  // FiShoppingBag,
  // FiDollarSign,
  // FiHeart,
} from "react-icons/fi";

import { motion } from "framer-motion";
// import { useSelector, useDispatch } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";

const UserDashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [isEditing, setIsEditing] = useState(false);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  console.log(isAuthenticated, user);

  return (
    <>
      {isAuthenticated && (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-xl rounded-lg overflow-hidden"
            >
              <div className="p-6 sm:p-10">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <img
                      className="h-24 w-24 rounded-full object-cover mr-6 border-4 border-blue-200"
                      src={user.picture}
                      alt={user.name}
                    />
                    <div>
                      <h1 className="text-3xl font-bold text-gray-800">
                        {user.name}
                      </h1>
                      <p className="text-blue-500"></p>
                    </div>
                  </div>
                  <button
                    // onClick={toggleEdit}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                  >
                    <FiEdit2 className="mr-2" />
                    {/* {isEditing ? "Save Profile" : "Edit Profile"} */}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center">
                    <FiMail className="text-blue-400 mr-3" />
                    <span className="text-gray-800">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <FiPhone className="text-blue-400 mr-3" />
                    <span className="text-gray-800">03403552447</span>
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="text-blue-400 mr-3" />
                    <span className="text-gray-800">Los Angeles, USA</span>
                  </div>
                  <div className="flex items-center">
                    <FiCalendar className="text-blue-400 mr-3" />
                    <span className="text-gray-800">{user.updated_at}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-blue-50 p-6 rounded-lg shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <stat.icon className="text-blue-500 mr-3" size={24} />
                          <span className="text-gray-700 font-medium">
                            {stat.label}
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-gray-800">
                          {stat.value}
                        </span>
                      </div>
                    </motion.div>
                  ))} */}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDashboard;
