import { useState, useMemo } from "react";
import AddRestaurantForm from "../components/AddRestaurantForm";
import Table from "../components/Table";
import { useAuthContext } from "../contexts/AuthContext";
import useRestaurants from "../hooks/useRestaurants";
import useUserTips from "../hooks/useUsertips";

const AdminPage = () => {
  const { currentUser } = useAuthContext();
  const {
    data: restaurants,
    error: restaurantError,
    isError: restaurantIsError,
    isLoading: restaurantIsLoading,
  } = useRestaurants();
  const {
    data: userTips,
    error: userTipsError,
    isError: userTipsIsError,
    isLoading: userTipsIsLoading,
  } = useUserTips();

  const [toggleForm, setToggleForm] = useState(false);

  const columns = useMemo(() => {
    return [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Street",
        accessor: "street",
      },
      {
        Header: "Number",
        accessor: "number",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Website",
        accessor: "website",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Facebook",
        accessor: "facebook",
      },
      {
        Header: "Instagram",
        accessor: "instagram",
      },
      {
        Header: "Vego",
        accessor: "vego",
      },
    ];
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>

      <p>Inloggad användare: {currentUser.email}</p>

      <button onClick={() => setToggleForm(!toggleForm)}>
        Show add hak form
      </button>

      {toggleForm && <AddRestaurantForm col={"restaurants"} />}

      <h1 className="py-8 px-4 text-3xl">Lista på Restauranger</h1>

      {restaurantIsLoading && <p>Loading...</p>}

      {restaurantIsError && <p>Error! {restaurantError.message}</p>}

      {restaurants && <Table columns={columns} data={restaurants} />}

      <h1 className="py-8 px-4 text-3xl">Lista på Användar tips</h1>

      {userTipsIsLoading && <p>Loading...</p>}

      {userTipsIsError && <p>Error! {userTipsError.message}</p>}

      {userTips && <Table columns={columns} data={userTips} />}
    </div>
  );
};

export default AdminPage;
