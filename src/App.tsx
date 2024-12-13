import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Protected from "./components/Common/Protected.tsx";
import Auth from "./pages/Auth.tsx";
import Bookmarked from "./pages/Bookmarked.tsx";
import Error from "./pages/Error.tsx";
import Explore from "./pages/Explore.tsx";
import History from "./pages/History.tsx";
import Home from "./pages/Home.tsx";
import MovieInfo from "./pages/Movie/MovieInfo.tsx";
import MovieWatch from "./pages/Movie/MovieWatch.tsx";
import Profile from "./pages/Profile.tsx";
import Search from "./pages/Search.tsx";
import TVInfo from "./pages/TV/TVInfo.tsx";
import TVWatch from "./pages/TV/TVWatch.tsx";
import { auth, db } from "./shared/firebase.ts";
import { useAppDispatch } from "./store/hooks.ts";
import { setCurrentUser } from "./store/slice/authSlice.ts";

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [isSignedIn, setIsSignedIn] = useState<boolean>(
    Number(localStorage.getItem("isSignedIn")) ? true : false
  );

  useEffect(() => {
    let unSubDoc: () => void;
    const unSubAuth: () => void = onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(setCurrentUser(null));
        setIsSignedIn(false);
        localStorage.setItem("isSignedIn", "0");
        return;
      }

      setIsSignedIn(true);
      localStorage.setItem("isSignedIn", "1");

      if (user.providerData[0].providerId === "google.com") {
        unSubDoc = onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(
            setCurrentUser({
              displayName:
                doc.data()?.lastName + " " + doc.data()?.firstName || "",
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: doc.data()?.photoUrl || "",
              uid: user.uid,
            })
          );
        });
      } else if (user.providerData[0].providerId === "facebook.com") {
        unSubDoc = onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(
            setCurrentUser({
              displayName:
                doc.data()?.lastName + " " + doc.data()?.firstName || "",
              email: user.email,
              emailVerified: user.emailVerified,
              photoURL: doc.data()?.photoUrl || "",
              // user.photoURL + "?access_token=" + doc.data()?.token || "",
              // doc.data()?.photoUrl.startsWith("https://i.ibb.co") ?
              uid: user.uid,
            })
          );
        });
      } else {
        unSubDoc = onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(
            setCurrentUser({
              displayName:
                doc.data()?.lastName + " " + doc.data()?.firstName || "",
              photoURL: doc.data()?.photoUrl || "",
              email: user.email,
              emailVerified: user.emailVerified,
              uid: user.uid,
            })
          );
        });
      }
    });

    return () => {
      unSubAuth();
      unSubDoc();
    };
  }, [dispatch]);

  useEffect(() => {
    globalThis.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname, location.search]);

  return (
  <>
    <Routes>
      <Route index element={<Home />} />
      <Route path="movie/:id" element={<MovieInfo />} />
      <Route path="tv/:id" element={<TVInfo />} />
      <Route path="movie/:id/watch" element={<MovieWatch />} />
      <Route path="tv/:id/watch" element={<TVWatch />} />
      <Route path="explore" element={<Explore />} />
      <Route path="search" element={<Search />} />
      <Route path="auth" element={<Auth />} />
      <Route
        path="bookmarked"
        element={
          <Protected isSignedIn={isSignedIn}>
            <Bookmarked />
          </Protected>
        }
      />
      <Route
        path="history"
        element={
          <Protected isSignedIn={isSignedIn}>
            <History />
          </Protected>
        }
      />
      <Route
        path="profile"
        element={
          <Protected isSignedIn={isSignedIn}>
            <Profile />
          </Protected>
        }
      />
      <Route path="*" element={<Error />} />
    </Routes>
    
    </>
  );

}

export default App;
 