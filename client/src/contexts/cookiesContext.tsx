import { Charity, CharityMembership } from '@/models/charity';
import { login } from '@/redux/authSlice';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import React, { createContext, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'universal-cookie';

interface UserToken extends JwtPayload {
  user: any;
}
  
interface CookiesToken extends UserToken {
  firstname: string;
  useremail: string;
  userType: string;
  loggedInCharity?: Charity;
  charity: CharityMembership[];
  projects: any[];
  exp: number;
  iat: number;
}

const CookiesContext = createContext<CookiesToken | undefined>(undefined);

export const CookiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const cookies = new Cookies();
  const dispatch = useDispatch();

  //CHECK EXISTENCE OF COOKIES FROM PREVIOUS SESSION
  //if exists a cookie then log in without having to log in
  const cookie = cookies.get("jwt_authorisation");

  const decoded = cookie
  ? jwtDecode<CookiesToken>(cookie)
  : undefined;

  console.log(decoded);

  if (cookie) {

    console.log(cookie);
    dispatch(
      login({
        token: cookie,
        firstname: decoded?.user.firstname,
        email: decoded?.user.email,
        userType: decoded?.user.userType,
        charity: decoded?.user.loggedInCharity ?? null,
        charities: decoded?.user.charity,
        projects: decoded?.user.projects,
      })
    );
    //navigate(from);
  }

  return (
    <CookiesContext.Provider value={decoded}>
      {children}
    </CookiesContext.Provider>
  );
};