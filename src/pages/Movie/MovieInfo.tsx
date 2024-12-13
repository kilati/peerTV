import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import FilmDetail from "../../components/FilmDetail/FilmDetail.tsx";
import { getMovieFullDetail } from "../../services/movie.ts";
import { FilmInfo } from "../../shared/types.ts";
import Error from "../Error.tsx";

const MovieInfo: FC = () => {
  const { id } = useParams();
  const { data, isError } = useQuery<FilmInfo, Error>(["movieDetail", id], () =>
    getMovieFullDetail(Number(id as string))
  );

  // if (isError) return <div>ERROR: {error.message}</div>;
  if (isError) return <Error />;
  // if (isLoading) return <div>Loading...</div>;

  return <FilmDetail {...data} />;
};

export default MovieInfo;
