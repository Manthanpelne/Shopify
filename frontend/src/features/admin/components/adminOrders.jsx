import { useState, useEffect } from "react";
import { ITEMS_PER_PAGE, discountedPrice } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductsByFiltersAsync } from "../../product/productListSlice";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../orders/orderSlice";
import {
  XMarkIcon,
  EyeIcon,
  PencilIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/solid";
import { Pagination } from "../../common/pagination";
import { selectUserInfo, selectUserOrders } from "../../user/userSlice";

export const AdminOrders = () => {
  const [editOrderId, setEditOrderId] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});

  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  //console.log(orders);
  const totalOrders = useSelector(selectTotalOrders);


  const handlePage = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  const handleEdit = (order) => {
    setEditOrderId(order.id);
  };

  const handleShow = () => {};

  const handleStatus = async (e, order) => {
    //console.log(order);
    dispatch(updateOrderAsync({ ...order, status: e.target.value }));
    setEditOrderId(true);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <div className=" flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
          <div className="w-full">
            <div className="bg-white shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left"
                      onClick={(e) =>
                        handleSort({
                          sort: sort?._sort === "id" ? "-id" : "id",
                        })
                      }
                    >
                      Order NO. {"  "}
                      {sort._sort === "id" ? (
                        <ArrowUpIcon className="w-4 h-4 inline cursor-pointer"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline cursor-pointer"></ArrowDownIcon>
                      )}
                    </th>
                    <th className="py-3 px-6 text-left">Items</th>
                    <th
                      className="py-3 px-6 text-center"
                      onClick={(e) =>
                        handleSort({
                          sort:
                            sort?._sort === "totalAmount"
                              ? "-totalAmount"
                              : "totalAmount",
                        })
                      }
                    >
                      Total Amount{" "}
                      {sort._sort === "totalAmount" ? (
                        <ArrowUpIcon className="w-4 h-4 inline cursor-pointer"></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline cursor-pointer"></ArrowDownIcon>
                      )}
                    </th>
                    <th className="py-3 px-6 text-center">Ship. Address</th>
                    <th className="py-3 px-6 text-center">Status</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders && orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                              />
                            </div>
                            <span>
                              {item.title} - qty:{item.quantity} - ${discountedPrice(item.product)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          {order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="items-center justify-center">
                          <div>
                            <strong>{order.selectedAddress.name}</strong>,
                          </div>
                          <div>{order.selectedAddress.street},</div>
                          {order.selectedAddress.city},
                          {order.selectedAddress.state}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        {order.id === editOrderId ? (
                          <select
                            onChange={(e) => handleStatus(e, order)}
                            value={order.status}
                            name=""
                            id=""
                          >
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon
                              onClick={(e) => handleShow(order)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              onClick={(e) => handleEdit(order)}
                              className="w-4 h-4 cursor-pointer"
                            />
                          </div>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        />
      </div>
    </div>
  );
};
