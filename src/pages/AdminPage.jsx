import { useState, useMemo } from "react";
import AddRestaurantForm from "../components/AddRestaurantForm"
import Table from "../components/Table";
import { useAuthContext } from "../contexts/AuthContext"
import useRestaurants from "../hooks/useRestaurants"

const AdminPage = () => {
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
				Header: "Namn",
				accessor: "name",
			},
			{
				Header: "Gata",
				accessor: "street",
			},
			{
				Header: "Gatunummer",
				accessor: "number",
			},
			{
				Header: "Ort",
				accessor: "city",
			},
			{
				Header: "Om restaurangen",
				accessor: "description",
			},
		];
	}, []);

	const adminColumn = useMemo(() => {
		return [
			{
				Header: 'Namn',
				accessor: 'name'
			},
			{
				Header: 'Email',
				accessor: 'email'
			},
			{
				Header: 'Profilbild',
				accessor: 'img',
			}
		]
	}, [])

	return (
		<div className="container min-h-screen max-w-full bg-darkish-blue text-contrast-color p-5">
			<div className="flex flex-col sm:flex-row justify-between py-3 ">
				<h1 className="font-medium text-3xl p-3">Admins krypin</h1>
			</div>

			<button
				className={
					toggleForm
						? "p-2 m-3 border rounded border-contrast-color bg-contrast-color text-darkish-blue hover:border-contrast-color-dark hover:bg-contrast-color-dark"
						: "p-2 m-3 border rounded border-contrast-color hover:border-contrast-color-dark hover:text-contrast-color-dark"
				}
				onClick={() => setToggleForm(!toggleForm)}>
				Lägg till en restaurang
			</button>

			{toggleForm && <AddRestaurantForm
				col={"restaurants"}
			/>}

			<div className="flex flex-col overflow-x-auto p-3">
				<div className="my-3 flex-shrink-0">
					<h2 className="text-2xl my-2">Restauranger</h2>
					{restaurantIsLoading && <p className="py-5 italic text-2xl">Loading...</p>}

					{restaurantIsError && <p className="py-5 text-2xl">Error! {restaurantError.message}</p>}

					{restaurants &&
						<Table
							collection={'restaurants'}
							columns={columns}
							data={restaurants} />
					}

				</div>
				<div className="my-3 flex-shrink-0">
					<h2 className="text-2xl my-2">Användartips</h2>

					{userTipsIsLoading && <p className="py-5 italic text-2xl">Loading...</p>}

					{userTipsIsError && <p className="py-5 text-2xl">Error! {userTipsError.message}</p>}

					{userTipsIsError && <p>Error! {userTipsError.message}</p>}

					{userTips && <Table collection={'usertips'} columns={columns} data={userTips} />}
				</div>

				<div className="my-3 flex-shrink-0">
					<h2 className="text-2xl my-2">Admins</h2>

					{adminsIsLoading && <p className="py-5 italic text-2xl">Loading...</p>}

					{adminsIsError && <p>Error! {adminsError.message}</p>}

					{admins && <Table collection={'admin'} columns={adminColumn} data={admins} />}
				</div>
			</div>
		</div>
	)
}

export default AdminPage;
