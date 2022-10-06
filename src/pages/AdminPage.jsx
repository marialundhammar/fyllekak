import { useState, useMemo } from "react";
import AddRestaurantForm from "../components/AddRestaurantForm"
import Table from "../components/Table";
import { useAuthContext } from "../contexts/AuthContext"
import useRestaurants from "../hooks/useRestaurants"

const AdminPage = () => {
	const { currentUser } = useAuthContext()

	const {
		data: restaurants,
		error: restaurantError,
		isError: restaurantIsError,
		isLoading: restaurantIsLoading,
	} = useRestaurants('restaurants')
	const {
		data: userTips,
		error: userTipsError,
		isError: userTipsIsError,
		isLoading: userTipsIsLoading,
	} = useRestaurants('usertips')
	const {
		data: admins,
		error: adminsError,
		isError: adminsIsError,
		isLoading: adminsIsLoading
	} = useRestaurants('admin')

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

	const adminColumn = useMemo(() => {
		return [
			{
				Header: 'Identifier',
				accessor: 'identifier'
			},
			{
				Header: 'Img',
				accessor: 'img-path'
			},
			{
				Header: 'Uid',
				accessor: 'uid'
			}
		]
	}, [])

	return (
		<div className="container min-h-screen max-w-full	 bg-darkish-blue text-contrast-color p-5">
			<div className="flex flex-col sm:flex-row justify-between py-3 ">
				<h1 className="font-medium text-3xl p-3">Admins krypin</h1>

				<div className="p-3">
					<p className="py-1">Inloggad användare:</p>
					<p className="py-1 italic">{currentUser.email}</p>
				</div>
			</div>

			<button
				className={
					toggleForm
						? "p-2 m-3 border rounded border-contrast-color bg-contrast-color text-darkish-blue hover:border-contrast-color-dark hover:bg-contrast-color-dark"
						: "p-2 m-3 border rounded border-contrast-color hover:border-contrast-color-dark hover:text-contrast-color-dark"
				}
				onClick={() => setToggleForm(!toggleForm)}>
				Lägg till hak
			</button>

			{toggleForm && <AddRestaurantForm
				col={"restaurants"}
			/>}

			<div className="p-3">
				<h2 className="text-2xl">Lista på Restauranger</h2>

				{restaurantIsLoading && <p className="py-5 italic text-2xl">Loading...</p>}

				{restaurantIsError && <p className="py-5 text-2xl">Error! {restaurantError.message}</p>}

				{restaurants &&
					<Table
						collection={'restaurants'}
						columns={columns}
						data={restaurants} />
				}
			</div>
			<div className="p-3">
				<h2 className="text-2xl">Lista på Användar tips</h2>

				{userTipsIsLoading &&
					<p className="py-5 italic text-2xl">Loading...</p>
				}

				{userTipsIsError &&
					<p className="py-5 text-2xl">Error! {userTipsError.message}</p>
				}

				{userTipsIsError && <p>Error! {userTipsError.message}</p>}

				{userTips && <Table collection={'usertips'} columns={columns} data={userTips} />}

				<h1 className="py-8 px-4 text-3xl">Lista över admins</h1>

				{adminsIsLoading && <p>Loading...</p>}

				{adminsIsError && <p>Error! {adminsError.message}</p>}

				{admins && <Table collection={'admin'} columns={adminColumn} data={admins} />}
			</div>
			);
};

			export default AdminPage;
