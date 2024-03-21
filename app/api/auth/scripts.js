"use client"

import { getDesignationRecordByIDAction } from "../admin-panel/actions/user";
import { getToken } from "../util/script";
import { hideMainLoader102, showMainLoader102 } from "../util/utility";
import { loginAction } from "./actions/auth";

const users = [
  { username: "sales@gmail.com", password: "sales123", role: "sales" },
  { username: "manager@gmail.com", password: "manager123", role: "admin" }
]


export const loginSubmit = async (e, active, setActive, hide, setHide, router, tenantID,homeurl) => {
  e.preventDefault();
  const emailInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  let username = '';
  let password = '';
  try {
    username = emailInput.value;
    password = passwordInput.value;
  }
  catch (err) { }
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    
    if (user.role === 'sales') {
      router.push('/rfx');
      setActive('block');

      setHide('hidden');

    } else if (user?.role === 'admin') {
      router.push('/bids');
      setActive('block');
      setHide('hidden');
    }
    else {
      router.push('/dashboard');
    }

  } else {

    let res = await loginAction(username, password, tenantID,homeurl);

    setUserData(res.user, res.access_token);

    const alertElement = document.getElementById('login-alert');

    if (res.statusCode !== "200") {

      alertElement.classList.remove('hidden');
      alertElement.classList.add('block');
      alertElement.innerText = 'Username or Password is Invalid!';

    } else {
      alertElement.classList.remove('block');
      alertElement.classList.add('hidden');
      alertElement.innerText = '';

      try{
        const welcomeMsg = document.getElementById('welcome-msg');
        welcomeMsg.textContent = `Welcome ${res.user?.first_name}   ${res.user?.last_name} !`;
      } catch {}

      // get user designation
      let designation = ''
      try {
        const r1= await getDesignationRecordByIDAction(res?.user?.designation_id);
        designation = r1.returnData.title;
      } catch {  }

      // Use optional chaining and nullish coalescing
      const profilePic = res?.user?.user_profile_photo ?? '/images/users/profile.jpg';
      // Set the src attribute of the image
      document.getElementById('welcome-profile-pic').src = profilePic;
      if (designation === 'sales representative') {
        router.push('/rfx');
        setActive('block');
        setHide('hidden');

      } else if (designation === 'bid manager') {
        router.push('/bids');
        setActive('block');
        setHide('hidden');
      }
      else {
        router.push('/dashboard');
        setActive('block');
        setHide('hidden');
      }      
    }
  }
};

const setUserData = (userData, accessToken) => {
  localStorage.setItem('user_data', JSON.stringify(userData));
  localStorage.setItem('access_token', accessToken);
};

// Get user data from localStorage
export const getUserData = () => {
  const userDataString = localStorage.getItem('user_data');
  return userDataString ? JSON.parse(userDataString) : null;
};

// Get access token from localStorage
export function getAccessTokenData() { }