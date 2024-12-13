import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import FilmWatch from "../../components/FilmWatch/FilmWatch.tsx";
import { getWatchMovie } from "../../services/movie.ts";
import { getWatchReturnedType } from "../../shared/types.ts";
import Error from "../Error.tsx";

const MovieWatch: FC = () => {
  const { id } = useParams();
  const { data, error } = useQuery<getWatchReturnedType, Error>(
    ["watchMovie", id],
    () => getWatchMovie(Number(id as string))
  );

  // if (error) return <div>ERROR: {error.message}</div>;
  if (error) return <Error />;

  // if (!data) return <div>Loading...</div>;

  return <FilmWatch {...data} media_type="movie" />;
};

export default MovieWatch;
