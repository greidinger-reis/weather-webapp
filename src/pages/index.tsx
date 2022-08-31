import Head from "next/head";
import CapitalsView from "../components/CapitalsView";
import FormView from "../components/FormView";
import TableView from "../components/TableView";
import superjson from "superjson";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "../server/router";
import { CityMinMax } from "../types/CityWeather";
import { trpc } from "../utils/trpc";

export const getStaticProps: GetStaticProps<{
  capitalsCitiesWeatherData: CityMinMax[];
}> = async () => {
  const ssg = await createSSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
  const capitalsCitiesWeatherData = await ssg.fetchQuery(
    "weather.getCapitalsCurrentWeather"
  );
  return {
    props: {
      capitalsCitiesWeatherData,
    },
    revalidate: 60,
  };
};

const Home = ({
  capitalsCitiesWeatherData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { data } = trpc.useQuery([
    "weather.getCityDetailedWeather",
    { city: "Ponta Grossa" },
  ]);
  return (
    <>
      <Head>
        <title>Clima</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-b from-gray-900 to-gray-700">
        <main className="container mx-auto flex h-screen flex-col items-center gap-8 py-16">
          <h1 className="text-4xl font-bold text-white">Previsão do tempo</h1>
          <FormView />
          <span className="h-[1px] w-3/4 bg-gray-500" />
          <div className="flex w-1/2 flex-col gap-4">
            <h2 className="text-3xl font-medium text-white">Capitais</h2>
            <div className="flex justify-center gap-8">
              <TableView>
                {capitalsCitiesWeatherData.slice(0, 5).map((city) => (
                  <CapitalsView key={city.name} {...city} />
                ))}
              </TableView>
              <TableView>
                {capitalsCitiesWeatherData.slice(5, 10).map((city) => (
                  <CapitalsView key={city.name} {...city} />
                ))}
              </TableView>
            </div>
            <button
              onClick={() => console.log(data)}
              className="rounded bg-green-500 px-4 py-2"
            >
              teste
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
