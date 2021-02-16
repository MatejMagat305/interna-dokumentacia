import React, {useState} from 'react';
import useDataApi from "../../helpers/useDataApi";
import {FetchError, FetchLoading} from "../Others/FetchComponents";
import SavedTrainings from "../Tables/SavedTrainings";
import SavedDocuments from "../Tables/SavedDocuments";
import EditRecordModal from "../Modals/EditRecordModal";

const SavedRecordsPage = () => {

  const [form, setForm] = useState({
    type: '',
    data: {}
  })

  const [documents, isLoaded, error] = useDataApi('/document/edited');
  const [trainings, isLoaded2, error2] = useDataApi('/training/edited');

  if (error) {
    return <FetchError e={`Error: ${error.message}`} />
  } else if (!isLoaded || documents === undefined) {
    return <FetchLoading/>
  }

  if (error2) {
    return <FetchError e={`Error2: ${error2.message}`} />
  } else if (!isLoaded2 || trainings === undefined) {
    return <FetchLoading/>
  }

  return (
    <>
      <SavedDocuments
        setForm={setForm}
        documents={documents}
      />
      <SavedTrainings
        setForm={setForm}
        trainings={trainings}
      />
      <EditRecordModal
        form={form}
        setForm={setForm}
      />
    </>
  );
};

export default SavedRecordsPage;