import { createContext, useContext, useEffect, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebase";
import { useJsApiLoader } from "@react-google-maps/api";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const googleAPI = import.meta.env.VITE_GOOGLE_MAP_API;
  const [libraries] = useState(["places"]);

  const [infoCardRestaurant, setInfoCardRestaurant] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 55.59712105786678,
    lng: 12.997431424230891,
  });

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${googleAPI}`,
    libraries,
  });

  const [setFilteredRestaurantsNew, filteredRestaurantsNew] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userPhotoUrl, setUserPhotoUrl] = useState(null);
  const [city, setCity] = useState("");

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const reloadUser = async () => {
    await auth.currentUser.reload();
    setCurrentUser(auth.currentUser);
    setUserEmail(auth.currentUser.email);
    setUserPhotoUrl(auth.currentUser.photoURL);
    return true;
  };

  const setPassword = (newPassword) => {
    return updatePassword(currentUser, newPassword);
  };

  const setEmail = (email) => {
    return updateEmail(currentUser, email);
  };

  const setProfilePicture = async (photo) => {
    console.log(auth.currentUser.photoURL);
    console.log(photo);
    let photoURL = auth.currentUser.photoURL;

    if (photo) {
      const fileRef = ref(
        storage,
        `img/${auth.currentUser.email}/${photo.name}`
      );

      const uploadResult = await uploadBytes(fileRef, photo);

      photoURL = await getDownloadURL(uploadResult.ref);

      console.log("DownloadURL:", photoURL);
    }

    return updateProfile(auth.currentUser, {
      photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserPhotoUrl(user?.photoURL);
      setUserEmail(user?.email);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const contextValues = {
    currentUser,
    login,
    logout,
    reloadUser,
    setPassword,
    setEmail,
    setProfilePicture,
    userEmail,
    userPhotoUrl,
    infoCardRestaurant,
    setInfoCardRestaurant,
    setMapCenter,
    mapCenter,
    setCity,
    isMapLoaded: isLoaded,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {loading ? <h3>Loading...</h3> : children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider as default, useAuthContext };
