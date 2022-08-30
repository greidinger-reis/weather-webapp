import Head from "next/head";
import CapitalsView from "../components/CapitalsView";
import FormView from "../components/FormView";
import TableView from "../components/TableView";
import { trpc } from "../utils/trpc";

const Home = () => {
  const { data } = trpc.useQuery(["weather.getCapitalsCurrentWeather"]);

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
            <div className="flex gap-8">
              {!data ? (
                <p className="text-white">Carregando...</p>
              ) : (
                <>
                  <TableView>
                    {data.slice(0, 5).map((city) => (
                      <CapitalsView key={city.name} {...city} />
                    ))}
                  </TableView>
                  <TableView>
                    {data.slice(5, 10).map((city) => (
                      <CapitalsView key={city.name} {...city} />
                    ))}
                  </TableView>
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
