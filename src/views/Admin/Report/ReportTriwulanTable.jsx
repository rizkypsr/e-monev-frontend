import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import ErrorPage from '../../ErrorPage';
import Table from '../../../components/Table';
import Pagination from '../../../components/Pagination';
import { useToastContext } from '../../../context/ToastContext';
import getTriwulanReport from '../../../api/admin/report/getTriwulanReport';
import deleteTriwulanReport from '../../../api/admin/report/deleteTriwulanReport';
import useFileDownloader from '../../../hooks/useFileDownloader';
import columns from './components/columns';

const initialParams = {
  limit: 10,
  page: 1,
  search: '',
  sort: 'terbaru',
  month: null,
  year: null,
  fund_source_id: null,
};

const ReportTriwulanTable = () => {
  const [searchParams] = useSearchParams();
  const { downloadFile } = useFileDownloader();

  const [filterParams, setFilterParams] = useState(initialParams);

  useEffect(() => {
    setFilterParams(Object.fromEntries(searchParams.entries()));
  }, [searchParams]);

  const queryClient = useQueryClient();
  const authHeader = useAuthHeader();
  const authUser = useAuthUser();
  const { showToastMessage } = useToastContext();

  const { isLoading, isError, error, data } = useQuery({
    queryKey: ['get_triwulan_reports', filterParams],
    queryFn: () => getTriwulanReport(filterParams, authHeader()),
    // keepPreviousData: true,
  });

  const deleteMutation = useMutation(deleteTriwulanReport);

  const deleteReportData = (id) => {
    deleteMutation.mutate(
      {
        id,
        token: authHeader(),
      },
      {
        onSuccess: (result) => {
          queryClient.invalidateQueries('get_triwulan_reports');
          showToastMessage(result.message);
        },
        onError: (err) => {
          showToastMessage(err.message, 'error');
        },
      }
    );
  };

  const onPaginationChange = (currentPage) => {
    setFilterParams({
      ...filterParams,
      page: currentPage,
    });
  };

  const handleDownloadFile = ({ fileUrl, isFetch }) => {
    downloadFile({
      fileUrl,
      authToken: authHeader(),
      isFetch,
    });
  };

  if (isError) {
    return <ErrorPage errorMessage={error.message} />;
  }

  return (
    <div className="w-full h-full mt-6 bg-white rounded-lg">
      <Table
        columns={columns.map((column) =>
          column.cell
            ? {
                ...column,
                cell: (props) =>
                  column.cell(
                    props,
                    deleteReportData,
                    authUser().role?.name,
                    handleDownloadFile
                  ),
              }
            : column
        )}
        rows={data}
        isLoading={isLoading}
      />
      <Pagination
        totalRows={data?.data.total || 0}
        pageChangeHandler={onPaginationChange}
        rowsPerPage={filterParams?.limit ?? 10}
      />
    </div>
  );
};

export default ReportTriwulanTable;
