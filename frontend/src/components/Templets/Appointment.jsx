import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Sidenav from '../../components/Sidenav'
import AppointmentViewForDoctor from './AppointmentViewForDoctor'
import AppointmentViewForPatient from './AppointmentViewForPatient'
import axios from "axios";

// import jwtDecode from "jwt-decode";
// import Cookies from "js-cookie";

// const getUserRoleFromToken = ()=>{
//   const token = Cookies.get("accessToken");

//   if(!token) return null;
//   console.log(token)

//   try {
//     const decodedToken = jwtDecode(token);
//     console.log("Decoded Token:", decodedToken); // Check the structure of the decoded token
//     return decodedToken.role; // Return user role
//   } catch (err) {
//     console.error("Failed to decode token:", err);
//     return null;
//   }
  
// }

const fetchUserRole = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/auth/me", {
      withCredentials: true, // Include cookies
    });
    console.log(response.data.data.user.role)
    return response.data.data.user.role; // Return the user's role
  } catch (err) {
    console.error("Failed to fetch user role:", err);
    return null;
  }
};

const Appointment = ()=>{
    const navigate = useNavigate();
    const [role, setRole] = useState(null);
    const [appointments ,setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      console.log("Running useEffect");

      // fetch appointment from backend
      const fetchAppointments = async ()=>{
        try{
            const fetchedRole = await fetchUserRole();
            setRole(fetchedRole);

            if(fetchedRole){
                const response = await axios.get("http://localhost:8080/api/book/all-appointments",{
                  withCredentials : true, // include cookies
                })
                // console.log("Fetched Appointments:", response.data); // Debug log
                setAppointments(response.data.appointments);
            } else {
              console.error("No role found, redirecting to login...");
              navigate("/SigninInfo"); // Redirect if no role
            }           
        } catch(err){
          console.error("Failed to fetch appointments:", err);
        } finally {
          setLoading(false); // End loading state
        }

      };

      fetchAppointments();
    }, [navigate]);


      return (
          <div className="w-screen h-screen bg-zinc-300 flex">
          {/* Sidenav is independent of loading state */}
          <div className="w-[25%]">
            <Sidenav />
          </div>

          {/* Main content area */}
          <div className="w-[75%] bg-white-700 h-full text-center">
            {loading ? (
              // Show loading state in the main content area only
              <div>Loading Appointments...</div>
            ) : (
              <>
                {role === "doctor" && <AppointmentViewForDoctor appointments={appointments} />}
                {role === "patient" && <AppointmentViewForPatient appointments={appointments} />}
              </>
            )}
          </div>
        </div>
    );
    
  }

export default Appointment
