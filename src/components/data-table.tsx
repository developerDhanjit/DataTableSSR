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
  const [selectedData, setSelectedData] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [first, setFirst] = useState<number>(0);
  const op = useRef<OverlayPanel>(null);

  const [pendingSelections, setPendingSelections] = useState<number>(0);

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

  useEffect(() => {
    if (pendingSelections > 0 && apiData?.data?.length) {
      const count = Math.min(pendingSelections, 12);
      const selected = apiData.data.slice(0, count);
      setSelectedData((prev) => [...prev, ...selected]);
      setPendingSelections((prev) => prev - count);
    }
  }, [apiData]);

  useEffect(() => {
    console.log("Pending Selections:", pendingSelections);
  }, [pendingSelections]);

  const loadData = async (event: { first: number; rows: number }) => {
    setFirst(event.first);
    const pageNumber = event.first / event.rows + 1;
    getApiData(pageNumber);
  };

  const selectRows = (count: number) => {
    if (count > 12) {
      setPendingSelections(count - 12);
    }
    if (apiData?.data) {
      const selected = apiData.data.slice(0, count);
      setSelectedData((prev) => [...prev, ...selected]);

      if (count > 12) {
        setPendingSelections(count - 12);
      } else {
        setPendingSelections(0);
      }

      op.current?.hide();
    }
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
        cellSelection
        selectionMode="multiple"
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
                justifyContent: "space-around",
                alignItems: "center",
                gap: "4rem",
              }}
            >
              <span>Title</span>
              <span style={{ cursor: "pointer" }}>
                <i
                  className="pi pi-chevron-down"
                  onClick={(e) => op.current?.toggle(e)}
                ></i>
                <span>
                  <OverlayPanel ref={op}>
                    <SelectRows
                      onSubmit={(count: number) => {
                        selectRows(count);
                      }}
                    />
                  </OverlayPanel>
                </span>
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
