// deno-lint-ignore-file
import { doc, onSnapshot } from "firebase/firestore";
import { FunctionComponent, useEffect, useState } from "react";
import Title from "../components/Common/Title.tsx";
import FilmListViewForBookmarkAndHistory from "../components/FilmListViewForBookmarkAndHistory/FilmListViewForBookmarkAndHistory.tsx";
import Footer from "../components/Footer/Footer.tsx";
import { db } from "../shared/firebase.ts";
import { Item } from "../shared/types.ts";
import { useAppSelector } from "../store/hooks.ts";

interface BookmarkedProps {}

const Bookmarked: FunctionComponent<BookmarkedProps> = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const [bookmarkedFilms, setBookmarkedFilms] = useState<Item[]>([]);

  const [isLoading, setIsLoading] = useState(!Boolean(bookmarkedFilms.length));
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    const unsubDoc = onSnapshot(
      doc(db, "users", currentUser?.uid),
      (doc) => {
        setBookmarkedFilms(doc.data()?.bookmarks.slice().reverse());
        setIsLoading(false);
      },
      (error) => {
        alert(error);
        setBookmarkedFilms([]);
        setIsLoading(false);
        setIsError(true);
      }
    );

    return () => unsubDoc();
  }, [currentUser]);

  if (isError) return <div>ERROR</div>;

  return (
    <>
      <Title value="Bookmark | Moonlight" />

      <FilmListViewForBookmarkAndHistory
        films={bookmarkedFilms}
        isLoading={isLoading}
        pageType="bookmark"
      />
      <Footer />
    </>
  );
};

export default Bookmarked;
