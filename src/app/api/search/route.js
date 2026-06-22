import { searchMovies } from "../../../lib/tmdb";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const query = searchParams.get("query");

  if(!query){
    return Response.json({ results:[] });
  }

  try{
    const data = await searchMovies(query);

    return Response.json(data);
  }
  catch(error){
    return Response.json(
      { results:[] },
      { status:500 }
    );
  }
}