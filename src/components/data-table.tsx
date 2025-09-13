import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import SelectRows from "./overlay-panel";

export const DTable = () => {
  interface ApiItem {
    pagination: {
      total: number;
      limit: number;
    };
    data: {
      id: string;
      title: string;
      place_of_origin: string;
      artist_display: string;
      inscriptions: string;
      date_start: string;
      date_end: string;
    }[];
  }

  type Artwork = {
    id: string;
    title: string;
    place_of_origin: string;
    artist_display: string;
    inscriptions: string;
    date_start: string;
    date_end: string;
  };

  const [apiData, setApiData] = useState<ApiItem>();
  const [selectedData, setSelectedData] = useState<Artwork>();
  const [loading, setLoading] = useState<boolean>(false);
  const [first, setFirst] = useState<number>(0);
  const op = useRef<OverlayPanel>(null);

  const [showOverlay, setShowOverlay] = useState<boolean>(false);

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData(1);
  }, []);

  const loadData = async (event: { first: number; rows: number }) => {
    setFirst(event.first);
    const pageNumber = event.first / event.rows + 1;
    getApiData(pageNumber);
  };

  return (
    <div className="card">
      <DataTable
        value={apiData?.data || []}
        paginator
        first={first}
        lazy
        onPage={loadData}
        loading={loading}
        rows={12}
        totalRecords={apiData?.pagination?.total}
        tableStyle={{ minWidth: "20rem" }}
        selection={selectedData}
        dataKey="id"
        onSelectionChange={(e) => setSelectedData(e.value)}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
        ></Column>

        <Column
          field="title"
          header={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <span>Title</span>
              <span style={{ cursor: "pointer" }}>
                <i
                  className="pi pi-chevron-down"
                  onClick={(e) => op.current?.toggle(e)}
                ></i>
              </span>
              <span>
                <OverlayPanel ref={op}>
                  <SelectRows />
                </OverlayPanel>
              </span>
            </div>
          }
        />

        <Column field="place_of_origin" header="Place of origin"></Column>
        <Column field="artist_display" header="Artist display"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
      </DataTable>
    </div>
  );
};
