import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { ITEMS_PER_PAGE } from "../../app/constants";

export const Pagination = ({ handlePage, page, setPage, totalItems}) => {
    const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE)
    return (
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <div
            onClick={()=>handlePage(page>1? page-1 : page)}
            className="relative inline-flex items-center cursor-pointer rounded-md hover:bg-gray-300 border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
          >
            Previous
          </div>
          <div
          onClick={()=>handlePage(page<totalPage? page+1 : page)}
            className="relative ml-3 inline-flex cursor-pointer hover:bg-gray-300 items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700"
          >
            Next
          </div>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">
                {(page - 1) * ITEMS_PER_PAGE + 1}
              </span>{" "}
              to <span className="font-medium">{page * ITEMS_PER_PAGE > totalItems ? totalItems : page*ITEMS_PER_PAGE}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </p>
          </div>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <div
                onClick={()=>handlePage( page>1? page-1 : page)}
              
                className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </div>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {Array.from({length:totalPage }).map(
                (el,index) => (
                  <div
                  key={index}
                    onClick={() => handlePage(index + 1)}
                    aria-current="page"
                    className={`relative inline-flex items-center cursor-pointer rounded-r-md px-3 py-2 ${index+1===page?" text-white bg-gray-700":"bg-white text-gray-800"} ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}   >
                    {index + 1}
                  </div>
                )
              )}
              <div
              onClick={()=>handlePage(page<totalPage? page+1 : page)}
                className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  };