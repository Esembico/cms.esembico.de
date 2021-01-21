import React, { useEffect, useState } from "react";
import DataTable from "../components/DataTable/DataTable";
import Header from "../components/Header";
import { connect } from "react-redux";
import LoadingIndicator from "../components/LoadingIndicator";
import DataList from "../components/DataList";
import Container from "../components/Responsive/Container";
import Row from "../components/Responsive/Row";
import Column from "../components/Responsive/Column";
import Button from "../components/Material/Button";
import StateRegister from "../register/StateRegister";
import stateRegister from "../register/StateRegister";

export default function makeDataPage({
  columns,
  primaryProperty,
  Editor,
  entity,
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
    const [errors, setErrors] = useState({});
    const validateData = stateRegister.getOption(entity, "validateData");
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
      const errors = validateData(editedData);
      if (!errors) {
        commitData(editedData);
      }
      setErrors(errors || {});
    };

    const newEntry = () => {
      setMode("edit");
      setEditedData(-1);
      selectItem(null);
    };

    return (
      <div>
        <Header>{StateRegister.getOption(entity, "header")}</Header>
        <LoadingIndicator show={status === "loading"} />
        {status !== "loading" && (
          <React.Fragment>
            <Container>
              <Row>
                <Button onClick={newEntry}>New</Button>
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
                          errors={errors}
                          onUpdate={updateEditedData}
                          data={editedData}
                        />
                        <Column width={100}>
                          <Button onClick={saveEntry}>Save</Button>
                          <Button onClick={() => setMode("view")}>
                            Cancel
                          </Button>
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
  const { mapStateToProps, mapDispatchToProps } = StateRegister.getMappers(
    entity
  );

  return connect(mapStateToProps, mapDispatchToProps)(Component);
}
