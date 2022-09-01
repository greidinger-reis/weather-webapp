import Head from "next/head";
import CapitalsView from "../components/CapitalsView";
import FormView from "../components/FormView";
import TableView from "../components/TableView";
import superjson from "superjson";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSSGHelpers } from "@trpc/react/ssg";
import { appRouter } from "../server/router";
import { CityMinMax } from "../types/CityWeather";
import CityWeatherCard from "../components/CityWeatherCard";
import { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

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
  const [city, setCity] = useState<string>();
  const [parent] = useAutoAnimate<HTMLElement>();
  return (
    <>
      <Head>
        <title>Clima</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-to-b from-gray-900 to-gray-700">
        <main
          ref={parent}
          className="mx-auto flex h-screen flex-col xs:container xs:items-center xs:gap-8 xs:py-16"
        >
          <h1 className="bg-gray-900 p-4 text-center text-4xl font-bold text-white drop-shadow-lg xs:p-0">
            Previsão do tempo
          </h1>
          {city ? <CityWeatherCard city={city} /> : null}
          <FormView setCity={setCity} />
          <div className="mt-8 flex flex-col gap-4 md:w-1/2 xs:mt-0">
            <h2 className="ml-4 text-3xl font-medium text-white lg:ml-16 xl:ml-32 2xl:ml-48">
              Capitais
            </h2>
            <div className="flex gap-4 self-center">
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
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
