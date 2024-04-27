import React, { useState } from "react";
import { NavLinks } from "./navlinks";
import { SearchBar } from "./searchBar";


export const NavBar = ({children}) => {
    const [open, setOpen] = useState(false)
  return (
    <div>
      <div>
        <div className="flex bg-zinc-400 justify-between">
          <div>
            <img
              className="h-12 w-17 sm: pl-7"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATQAAACkCAMAAAAuTiJaAAAAflBMVEUAAAD////8/PwEBATi4uKkpKT29vba2tre3t75+fnt7e2cnJzo6Oh6enowMDC9vb1QUFDJyck9PT21tbVcXFxsbGwiIiJPT09mZmbV1dWurq43NzdFRUWRkZHCwsLPz8+IiIgUFBSCgoJ1dXUcHBwoKCgTExM7OzteXl6YmJiA6yXRAAAErUlEQVR4nO3da3OiMBQGYJJwESxV0HrFSrV1t///D25CABOUFbfMxuD7fNm203FOz+RycoF1HAAAAAAAAAAAAAAAAAAAAAAAAAAAALDb2PVHO9NB2CX1ifCyMB2ITaIiZ5S4pgOxyI6QMmux6VDssSaVd9Oh2MOtk7Y3HYo9kjppM9Oh2GPHRzM5ps1Nh2KP12oemJiOxCYTQkVbQ87uwZtaOPGWjsNMR2ITPn++mo7BOhNCpqZjsM6IENMh2Icv1k2HYBnmTAlZm47CMswZo9y42yKkZGM6CNvkvLBNTAdhF1Ys2LFUv1PIkzY2HYRlvsRa/c10FJbxeEMLTAdhG9E7Y6zV7yP20lLTQVhGbEH6poOwzRjbj90wZ3GIP+U4Js6isC/UhWhe8mj4U3z1YToeG3ji/IkSj38Z85xFpuOxQVofdDqZjyGtG688s6MkDnFG3NGsamjykLjopnBDXidNZu1oOiAruFUbk6kzHY4lAiVnGNI62qhJW5qOxg6p2jsJrtp28DXWcoYbCR1klOhJW5mOyAIj0oAy7aZDM2e4CX+bf5E09M9bvMucoandkIZXkoYLyn/3QumVpOFZsnasmAUocZuZw/n636zlEJY3KjUUHa2Y3EgTt6rWekvDkr2dLNHEKcoKSevoi1SnKXxC0JKGK32t1kpNFmMi6IA5R7G77Z7kt6mWtNxkZA9NPHR9Pqxz1aThhL3FkQ9ob+p3ZxT3rFqMCDlUX58SrXdi7XkVE8d25+uO2hEBtzUY2gOLtXu1jdoWz67rmHyIs5g5zz8N9JxR7HNomEhZlhRrzfNPmy2NkNBYhA9p45KQKEnjWVxebqrhtpWCp+gr/SaB785DKvtg2e70DupjS033+r399F8dNi8uPH5EF82sGNZC7A81sPrf1dX9bpm23GSIj6hMW17fr7qSNTJa4I0JTax+gVWbEKvQBnaxzX05I+DJsqbGfm34fuXgGO9Q0zF9OPP46DVuTqXiN7CPW2LORx6ovXFTPnCxzRtrKi5CH5WmWqmRyDtpcqbMJqE2utFisxKz6MKjSkpGF8vzg37Qwhvb06/gFzN1ogyuXhJaJdqFb/rsB8hjtZWt25tQdpy5anIXT9pF+V89j5RJc5aVu0Vt0v25uYW//1ucD8ZTepzfpd5fKlXIc259nNR6IukyJbLibWqVZ3zx7a+65OfNrPsTUMrxu/t0w1qm1GazeyqvNKpzHT3VUwbM+RXWc+b+3kO693oapbEj8/0UbW7rV7NmML3zT+a//LavMl48pJdOBr9pdBJn6XWd8Y9l6rH6gM1vZxd8Fj/LTv0F+XACJ5iV/cuf/2vP2r5UvTuSj4RmAQkHexjPnPd1WZqR9U+Gos1LWRhHQZDsR8OuQXbVo8ObzQ8H8FXxQXVPH/B7FaaRbGZeD31pVWeMDvfNkdN4Qkko3lUibqP1UCYsz7Ve/vNPe0Tfdaugvb0DofjvCsTN06ynD3ww83NfCsc9VaNMrvlpPtjyNqrKeNLntg7/UHfAqyl5aTsUmzo9NotvcetvoM1MyNY0yZy053ZxuP0rFhtwcwAAAAAAAAAAAAAAAAAAAAAAAAAAgEH7A6KLIlS4zbJsAAAAAElFTkSuQmCC"
              alt=""
            />
          </div>
          <div className="text-black sm:flex hidden justify-evenly space-x-9 m-4 mr-20">
            <p>Find a store</p>
            <p>Help</p>
            <p>Join Us</p>
            <p>Sign in</p>
          </div>
          <p className="md:hidden mt-3 px-11">Sign In</p>
        </div>
        <div className="flex justify-between h-14 bg-gray-700">
          <div className="z-50 md:w-auto w-full flex justify-between">
             <div className="p-3 cursor-pointer hover:bg-slate-700 rounded-lg md:hidden text-3xl" onClick={()=>setOpen(!open)}>
          <ion-icon name={`${open?"close":"menu"}`}></ion-icon>
          </div>
          </div>
          <div className="mr-46">
            <ul className="md:flex hidden items-center gap-10 mt-5 ml-20">
              <NavLinks />
            </ul>
          </div>
           <SearchBar/>
        </div>
        {/*mobile*/}
        <ul className={`md:hidden bg-black absolute w-full h-full text-left mt-5 ml-4 duration-500 ${open?"left-0":"left-[-100%]"}`}>
              <NavLinks />
            </ul>

      </div>
    </div>
  );
};
