import React from "react";
import "./Resumo.scss";
import Nav from "../components/nav/Nav";
import Button from "../components/button/Button";
import useFetch from "../hooks/useFecth";
import generateResumo from "../utils/generateResumo";
import LineChart from "../components/lineChart/LineChart";
import Card from "../components/card/Card";
import BarChart from "../components/barChart/BarChart";

const Resumo = () => {
  const { request, loading } = useFetch();
  const [data, setData] = React.useState(null);
  const [totalManutencoes, setTotalManutencoes] = React.useState(null);
  const [manutencoesPorSupervisor, setManutencoesPorSupervisor] =
    React.useState(null);
  const [manutencoesPorData, setManutencoesPorData] = React.useState(null);
  const [supervisores, setSupervisores] = React.useState(null);
  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlllr7_81xa2FAcKRdqYWRUUWGiwAG4UvPDqrbqsKBzbT6k57u9s6Bq8XeTeEOSa6ThfFu3p5dtExL/pub?output=csv";

  React.useEffect(() => {
    const getData = async () => {
      const { json } = await request(url);
      const { totalManutencoes, manutencoesPorSupervisor, manutencoesPorData } =
        generateResumo(json);
      setData(json);
      setTotalManutencoes(totalManutencoes);
      setManutencoesPorData(manutencoesPorData);
      setManutencoesPorSupervisor(manutencoesPorSupervisor);
      setSupervisores(Object.keys(manutencoesPorSupervisor));
    };
    getData();
  }, []);

  const handleChange = ({ target }) => {
    const filteredData = data.filter((data) => data.Supervisor == target.value);
    if (target.value !== "Selecione") {
      const { totalManutencoes, manutencoesPorSupervisor, manutencoesPorData } =
        generateResumo(filteredData);
      setTotalManutencoes(totalManutencoes);
      setManutencoesPorData(manutencoesPorData);
      setManutencoesPorSupervisor(manutencoesPorSupervisor);
    }
    if (target.value === "Selecione") {
      const { totalManutencoes, manutencoesPorSupervisor, manutencoesPorData } =
        generateResumo(data);
      setTotalManutencoes(totalManutencoes);
      setManutencoesPorData(manutencoesPorData);
      setManutencoesPorSupervisor(manutencoesPorSupervisor);
    }
  };

  return (
    <>
      <section className="container">
        <h2>Preventivas de Caixas - BA:</h2>
        <Nav>
          <Button to={"/"}>Resumo</Button>
          <Button to={"/preventivas"}>Preventivas</Button>
        </Nav>
        {loading ? (
          <div className="loading-component">Carregando ...</div>
        ) : (
          <div className="dashboard-container">
            <Card value={totalManutencoes} title={"Total de Preventivas"} />
            {manutencoesPorSupervisor && (
              <div className={"chart-container"}>
                <BarChart
                  title={"Preventivas Por Supervisor"}
                  categories={Object.keys(manutencoesPorSupervisor)}
                  data={Object.values(manutencoesPorSupervisor)}
                />
              </div>
            )}
            {
              <form>
                <fieldset>
                  <h2>Filtrar pro mês</h2>
                  <input type="month" id="monthFilter"></input>
                </fieldset>
                <fieldset>
                  <h2>Filtrar por supervisor</h2>
                  <select name="supervisor" onChange={handleChange}>
                    <option>Selecione</option>
                    {supervisores &&
                      supervisores.map((sup) => {
                        return (
                          <option key={sup} value={sup}>
                            {sup}
                          </option>
                        );
                      })}
                  </select>
                </fieldset>
              </form>
            }

            {manutencoesPorData && (
              <div className="chart-container">
                <LineChart
                  title={"Preventivas Por Dia"}
                  categories={Object.keys(manutencoesPorData)}
                  data={Object.values(manutencoesPorData)}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default Resumo;
