import { useCallback, useEffect } from "react"
import { useCookies } from "react-cookie";

const Header = () => {
  const [cookies, setCookies] = useCookies(['reloaded']);

  const alertUser = useCallback((e) => {
    e.preventDefault();
    setCookies('reloaded', 1);
  }, [setCookies]); // Dependency array with setCookies

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, [alertUser]);

  return (
    <div className="font-bold font-3xl font-pricedown">
      {cookies.reloaded ? <h1>Reloaded</h1> : ''}
      <h1>Header</h1>
    </div>
  )
}

export default Header
