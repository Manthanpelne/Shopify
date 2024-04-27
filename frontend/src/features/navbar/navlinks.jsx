import React from "react";

import { links } from "./links";
import { useState } from "react";

export const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  return (
    <>
      {links.map((Link) => {
        return (
          <div className="text-white">
            <div className="group">
              <h1
                className=" cursor-pointer p-3 hover:bg-slate-700"
                onClick={() =>
                  heading !== Link.name ? setHeading(Link.name) : setHeading("")
                }
              >
                {Link.name}
                <span className="ml-2">
                      <ion-icon
                        name={`${
                          subHeading === Link.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
              </h1>

              {Link.submenu && (
                <div>
                  <div className="absolute hidden sm:group-hover:block hover:block">
                    <div className="bg-white p-5 gap-15 grid grid-cols-4 my-3 mr-12">
                      {Link.sublinks.map((mysublink) => (
                        <div>
                          <h1
                            className="font-semibold text-gray-800 text-sm cursor-pointer">
                            {mysublink.Head}
                          </h1>
                          {mysublink.sublink.map((slink) => (
                            <li className="sm:text-sm text-gray-600 my-2.5 cursor-pointer">
                              {slink.name}
                            </li>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/*mobile view */}
            <div
              className={`
            ${heading === Link.name ? "md:hidden" : "hidden"}
            `}
            >

              {/*sublinks*/}

              {Link.sublinks?.map((item) => (
                <div>
                  <div className="md:hidden font-bold text-left ml-24">
                    <h1  onClick={() =>
                              subHeading !== item.Head
                                ? setSubHeading(item.Head)
                                : setSubHeading("")
                            } className="mt-3 pt-1 cursor-pointer hover:bg-slate-700">{item.Head}
                             <span className="ml-2">
                      <ion-icon
                        name={`${
                          subHeading === item.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
                            </h1>

                    <div className={`${subHeading===item.Head?"md:hidden":"hidden"}`}>
                      {item.sublink.map((items) => (
                        <div className="pt-2 py-2 text-left ml-24 font-thin cursor-pointer">
                          <li className="hover:bg-slate-700">{items.name}</li>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};
