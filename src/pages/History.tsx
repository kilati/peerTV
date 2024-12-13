// deno-lint-ignore-file
import { doc, onSnapshot } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import Title from "../components/Common/Title.tsx";
import FilmListViewForBookmarkAndHistory from "../components/FilmListViewForBookmarkAndHistory/FilmListViewForBookmarkAndHistory.tsx";
import Footer from "../components/Footer/Footer.tsx";
import { db } from "../shared/firebase.ts";
import { Item } from "../shared/types.ts";
import { useAppSelector } from "../store/hooks.ts";

interface HistoryProps {}

const History: FunctionComponent<HistoryProps> = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [recentlyWatchFilms, setRecentlyWatchFilms] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(
    !Boolean(recentlyWatchFilms.length)
  );
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const unsubDoc = onSnapshot(
      doc(db, "users", currentUser?.uid),
      (doc) => {
        setRecentlyWatchFilms(doc.data()?.recentlyWatch.slice().reverse());
        setIsLoading(false);
      },
      (error) => {
        alert(error);
        setRecentlyWatchFilms([]);
        setIsLoading(false);
        setIsError(true);
      }
    );

    return () => unsubDoc();
  }, [currentUser]);

  if (isError) return <div>ERROR</div>;

  return (
    <>
      <Title value="History | Moonlight" />
      <FilmListViewForBookmarkAndHistory
        films={recentlyWatchFilms}
        isLoading={isLoading}
        pageType="history"
      />

      <Footer />
    </>
  );
};

export default History;
