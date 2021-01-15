import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable/DataTable";
import Header from "../components/Header";
import { connect } from "react-redux";
import LoadingIndicator from "../components/LoadingIndicator";
import getMappers from "../redux/helpers/getMappers";
import DataList from "../components/DataList";
import Container from "../components/Responsive/Container";
import Row from "../components/Responsive/Row";
import Column from "../components/Responsive/Column";

export default function makeDataPage({
  pageHeader,
  columns,
  primaryProperty,
  Editor,
  entity,
  endpoint,
}) {
  const Component = ({
    data,
    status,
    lastPage,
    currentPage,
    editedData,
    fetchData,
    selectPage,
    selectItem,
    selectedId,
    setEditedData,
    updateEditedData,
    commitData,
  }) => {
    const [mode, setMode] = useState("view");
    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const changePage = (page) => {
      selectPage(page);
    };

    const editEntry = (id) => {
      setMode("edit");
      setEditedData(id);
    };

    const saveEntry = () => {
      commitData(editedData);
    };

    const newEntry = () => {
      setMode("edit");
      setEditedData(-1);
      selectItem(null);
    };

    return (
      <div>
        <Header>{pageHeader}</Header>
        <LoadingIndicator show={status === "loading"} />
        {status !== "loading" && (
          <React.Fragment>
            <Container>
              <Row>
                <button onClick={newEntry}>New</button>
              </Row>
              {mode === "view" && (
                <DataTable
                  pageData={{
                    current: currentPage,
                    last: lastPage,
                  }}
                  data={data}
                  columns={columns}
                  onPageChange={changePage}
                  onSelect={(id) => {
                    editEntry(id);
                    selectItem(id);
                  }}
                  selected={selectedId}
                />
              )}
              {mode === "edit" && (
                <Row>
                  <Column width={25}>
                    <DataList
                      data={data}
                      primaryProperty={primaryProperty}
                      selected={selectedId}
                      onSelect={(id) => {
                        editEntry(id);
                        selectItem(id);
                      }}
                    />
                  </Column>
                  <Column width={75}>
                    {Editor && (
                      <React.Fragment>
                        <Editor
                          onUpdate={updateEditedData}
                          data={editedData}
                          onSave={saveEntry}
                        />
                        <Column width={100}>
                          <button
                            style={{ float: "right" }}
                            onClick={saveEntry}
                          >
                            Save
                          </button>
                          <button
                            style={{ float: "right" }}
                            onClick={() => setMode("view")}
                          >
                            Cancel
                          </button>
                        </Column>
                      </React.Fragment>
                    )}
                  </Column>
                </Row>
              )}
            </Container>
          </React.Fragment>
        )}
      </div>
    );
  };
  const { mapStateToProps, mapDispatchToProps } = getMappers(entity, endpoint);

  return connect(mapStateToProps, mapDispatchToProps)(Component);
}
