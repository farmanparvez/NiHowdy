import Cookies from "js-cookie";

export const CookieHandler = (set, name, value, expiresIn) => {
  // const Cookies2  = Cookies.noConflict()
  if (set === "get") return Cookies.get(name)
  if (set === "set") Cookies.set(name, value, { expires: expiresIn });
  if (set === "remove") Cookies.remove(name);
  
};
