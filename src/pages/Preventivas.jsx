import React from "react";
import Nav from "../components/nav/Nav";
import Button from "../components/button/Button";
import useFetch from "../hooks/useFecth";
import "./Preventivas.scss";

const Preventivas = () => {
  const { request, loading } = useFetch();
  const [prevs, setPrevs] = React.useState(null);
  const baseUrl = "https://drive.google.com/file/d/";

  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlllr7_81xa2FAcKRdqYWRUUWGiwAG4UvPDqrbqsKBzbT6k57u9s6Bq8XeTeEOSa6ThfFu3p5dtExL/pub?output=csv";

  React.useEffect(() => {
    const getData = async () => {
      const { json } = await request(url);
      setPrevs(json);
    };

    getData();
  }, []);

  return (
    <section className="container">
      <h2>Preventivas de Caixas - BA:</h2>
      <Nav>
        <Button to={"/"}>Resumo</Button>
        <Button to={"/preventivas"}>Preventivas</Button>
      </Nav>
      <ul className="prev-list">
        {loading ? (
          <p>carregando</p>
        ) : (
          prevs &&
          prevs.map((prev, index) => {
            return (
              <li key={index}>
                <div>
                  <p>
                    Caixa: <span> {prev.Caixa}</span>
                  </p>
                  <p>
                    Data: <span>{prev["Data Execução"]}</span>
                  </p>
                  <p>
                    Supervisor: <span>{prev.Supervisor}</span>
                  </p>
                </div>
                <div>
                  <div>
                    <span>Antes</span>
                    <div>
                      {prev["Foto - Antes"].map((url, index) => {
                        const id = url.match(/id=([^&]+)/)[1];
                        return (
                          <iframe
                            key={index}
                            src={baseUrl + id + "/preview"}
                            width={"160"}
                            height={"180"}
                          ></iframe>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <span>Depois</span>
                    <div>
                      {prev["Foto - Depois"].map((url, index) => {
                        const id = url.match(/id=([^&]+)/)[1];
                        return (
                          <iframe
                            key={index}
                            src={baseUrl + id + "/preview"}
                            width={"160"}
                            height={"180"}
                          ></iframe>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
};

export default Preventivas;
