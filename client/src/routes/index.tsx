import AdminLayout from "@/layout/AdminLayout";
import { ProtectedLayout } from "@/layout/auth/ProtectedLayout";
import { PublicOnlyLayout } from "@/layout/auth/PublicOnlyLayout";
import { RoleGuardLayout } from "@/layout/auth/RoleguardLayout";
import CustomerLayout from "@/layout/CustomerLayout";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminOrders from "@/pages/admin/orders";
import AdminProducts from "@/pages/admin/products";
import AdminSettings from "@/pages/admin/settings";
import AdminCoupons from "@/pages/admin/promos";
import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";
import CollectionPage from "@/pages/customer/collection";
import CollectionDetailPage from "@/pages/customer/collection-detail";
import { StoreHome } from "@/pages/customer/home";
import CustomerOrderSuccessPage from "@/pages/customer/order-success";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerLayout />,
    children: [
      {
        index: true,
        element: <StoreHome />,
      },
      {
        element: <PublicOnlyLayout />,
        children: [
          {
            path: "sign-in/*",
            element: <SignInPage />,
          },
          {
            path: "sign-up/*",
            element: <SignUpPage />,
          },
          {
            path: "collections",
            element: <CollectionPage />,
          },
          {
            path: "collection/:id",
            element: <CollectionDetailPage />,
          },
        ],
      },
      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "order-success",
            element: <CustomerOrderSuccessPage />,
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        element: <RoleGuardLayout allow={["admin"]} />,
        children: [
          {
            path: "/admin",
            element: <AdminLayout />,

            children: [
              {
                index: true,
                element: <AdminDashboard />,
              },
              {
                path: "products",
                element: <AdminProducts />,
              },
              {
                path: "coupons",
                element: <AdminCoupons />,
              },
              {
                path: "orders",
                element: <AdminOrders />,
              },
              {
                path: "settings",
                element: <AdminSettings />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
