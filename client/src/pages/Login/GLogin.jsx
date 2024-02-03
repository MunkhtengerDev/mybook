//  import React, { useEffect, useState } from 'react';
//  import { jwtDecode } from 'jwt-decode';
//  import {toast} from "react-hot-toast"
//  import { useNavigate } from 'react-router-dom';


// const GOOGLE_CLIENT_ID = '981812106667-o6bto88cks6riumjr9pc4t3cso6u7245.apps.googleusercontent.com'

// const GLogin = (props) => {
//   const [user, setUser] = useState({});
//   const navigate = useNavigate();

//   const handleCallBackResponse = async (response) => {
//     try {
//       const userObject = jwtDecode(JSON.stringify(response.credential));
  
//       // Extracting name and email from the userObject
//       const { given_name, name, email } = userObject;
  
//       // Create a new object with only the required properties
//       const userInformation = { given_name, email, name };
  
//       // Store the extracted user information in localStorage
//       localStorage.setItem('auth', JSON.stringify({user: userInformation}));
  
//       setUser(userInformation);
//       toast.success('User Logged In Successfully');
//       console.log(userObject)
//       navigate('/books');
//     } catch (error) {
//       console.error(error);
//       toast.error('An error occurred during Google authentication');
//     }
//   };
  



  

//   useEffect(() => {
//     // global google
//       window.google.accounts.id.initialize({
//         client_id: GOOGLE_CLIENT_ID,
//         callback: handleCallBackResponse,
//       });
  
//       window.google.accounts.id.renderButton(
//         document.getElementById('signInDiv'), {
//         theme: 'outline',
//         size: 'large',
//       });
  

  
//       // window.google.accounts.id.prompt();
//     }, );

//   return (
//     <div>
//       <form action="http://localhost:8080/auth/google">
//       <button type='submit' onClick={handleCallBackResponse} id="signInDiv"></button>
//       </form>
      

      

//       {user && (
//         <div id="profile">
//           {/* <img
//             className="rounded-full w-24 h-24 my-3 ml-3 "
//             src={user.picture}
//             alt="userPicture"
//           /> */}
//           <p>{user.name}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GLogin;
