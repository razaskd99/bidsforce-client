import { getCookieValue } from "@/lib/scripts";
import { redirect } from "next/navigation";

const Home = async() => {


    // check user is login
    let isLogin = await getCookieValue('loginStatus')
    if (isLogin == true || isLogin == 'true') {
      { redirect("/dashboard") }

    }
    else {
      { redirect("/login") }
    }
  



  return null; // You need to return some JSX, even if it's null
};

export default Home;
