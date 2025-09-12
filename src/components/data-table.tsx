import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";

export const DTable = () => {
  const [apiData, setApiData] = useState();
  const [selectedData, setSelectedData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [first, setFirst] = useState(0);

  const getApiData = async (pageNumber: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_ENDPOINT}?page=${pageNumber}`
      );
      const data = await response.json();

      if (data) {
        setApiData(data);
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData(1);
  }, []);

  const loadData = async (event) => {
    setFirst(event.first);
    const pageNumber = event.first / event.rows + 1;
    getApiData(pageNumber);
  };

  return (
    <div className="card">
      <DataTable
        className="tailwind"
        value={apiData?.data}
        paginator
        first={first}
        lazy
        onPage={loadData}
        loading={loading}
        rows={12}
        totalRecords={apiData?.pagination?.total}
        tableStyle={{ minWidth: "50rem" }}
        selection={selectedData}
        onSelectionChange={(e) => setSelectedData(e.value)}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Place of origin"></Column>
        <Column field="artist_display" header="Artist display"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
      </DataTable>
    </div>
  );
};
