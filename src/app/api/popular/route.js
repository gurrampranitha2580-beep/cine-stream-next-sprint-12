import { getPopularMovies } from "../../../lib/tmdb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page") || 1;

  try{
    const data = await getPopularMovies(page);

    return Response.json(data);
  }
  catch(error){
    return Response.json(
      { results:[] },
      { status:500 }
    );
  }
}