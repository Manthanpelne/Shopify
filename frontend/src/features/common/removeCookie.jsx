import Cookie from "js-cookie"

export const RemoveCookie = (cookieName) =>{
 Cookie.remove(cookieName)
}