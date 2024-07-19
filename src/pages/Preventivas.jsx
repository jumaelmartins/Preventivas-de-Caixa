import React from "react";
import Nav from "../components/nav/Nav";
import Button from "../components/button/Button";
import Pagination from "../components/pagination/Pagination";
import SearchBar from "../components/searchBar/SearchBar";
import useFetch from "../hooks/useFecth";
import "./Preventivas.scss";

const Preventivas = () => {
  const { request, loading } = useFetch();
  const [prevs, setPrevs] = React.useState([]);
  const [filteredPrevs, setFilteredPrevs] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5; // Quantidade de itens por página
  const baseUrl = "https://drive.google.com/file/d/";

  const url =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQlllr7_81xa2FAcKRdqYWRUUWGiwAG4UvPDqrbqsKBzbT6k57u9s6Bq8XeTeEOSa6ThfFu3p5dtExL/pub?output=csv";

  React.useEffect(() => {
    const getData = async () => {
      const { json } = await request(url);
      setPrevs(json);
      setFilteredPrevs(json);
    };

    getData();
  }, []);

  React.useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = prevs.filter(
      (prev) =>
        prev.Caixa.toLowerCase().includes(lowerCaseSearchTerm) ||
        prev["Data Execução"].toLowerCase().includes(lowerCaseSearchTerm) ||
        prev.Supervisor.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredPrevs(filtered);
    setCurrentPage(1); // Reseta a página atual para 1 ao filtrar
  }, [searchTerm, prevs]);

  // Calcule o índice inicial e final dos itens da página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPrevs.slice(indexOfFirstItem, indexOfLastItem);

  // Calcule o número total de páginas
  const totalPages = Math.ceil(filteredPrevs.length / itemsPerPage);

  return (
    <section className="container">
      <h2>Preventivas de Caixas - BA:</h2>
      <Nav>
        <Button to={"/"}>Resumo</Button>
        <Button to={"/preventivas"}>Preventivas</Button>
      </Nav>

      <SearchBar onSearch={setSearchTerm} />

      <ul className="prev-list">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          currentItems.map((prev, index) => {
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
                    <div key={index}>
                      {prev["Foto - Antes"].map((url, index) => {
                        const id = url.match(/id=([^&]+)/)[1];
                        return (
                          <iframe
                            key={index + 1}
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
                            key={index + 1}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
};

export default Preventivas;
