import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";

export const DTable = () => {
  const [apiData, setApiData] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();

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
    getApiData(event.page + 1);
  };

  return (
    <div className="card">
      <DataTable
        className="tailwind"
        value={apiData?.data}
        paginator
        lazy
        onPage={loadData}
        loading={loading}
        rows={12}
        totalRecords={apiData?.pagination?.total}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Place of  origin"></Column>
        <Column field="artist_display" header="Artist display"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
      </DataTable>
    </div>
  );
};
