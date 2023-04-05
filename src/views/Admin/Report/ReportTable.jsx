import { createColumnHelper } from '@tanstack/react-table';
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import { useAuthHeader } from 'react-auth-kit';
import Button from '../../../components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import TrashImg from '../../../assets/images/trash.png';
import Dropdown from '../../../components/Dropdown';
import ErrorPage from '../../ErrorPage';
import { deleteReport, getTriwulan } from '../../../api/admin/report';
import ReactLoading from '../../../components/Loading';
import Table from '../../../components/Table';
import Pagination from '../../../components/Pagination';
import getReports from '../../../api/admin/report/getReports';
import formattedDate from '../../../utils/formattedDate';
import { useToastContext } from '../../../context/ToastContext';

const columnHelper = createColumnHelper();
const columns = [
  columnHelper.accessor('id', {
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>,
  }),
  columnHelper.accessor((row) => row.created_at, {
    id: 'created_at',
    cell: (info) => <i>{formattedDate(info.getValue())}</i>,
    header: () => <span>Tanggal</span>,
  }),
  columnHelper.accessor((row) => row.triwulan.name, {
    id: 'Triwulan',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Triwulan</span>,
  }),
  columnHelper.accessor((row) => row.occassion.title, {
    id: 'Urusan',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Urusan</span>,
  }),
  columnHelper.accessor((row) => row.organization.title, {
    id: 'Organisasi',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Organisasi</span>,
  }),
  columnHelper.accessor((row) => row.program.title, {
    id: 'Program',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Program</span>,
  }),
  columnHelper.accessor((row) => row.aksi, {
    id: 'aksi',
    size: 10,
    cell: (props, deleteUserData) => {
      const rowId = props.row.original.id;
      return (
        <div className="flex justify-end">
          <Link to={`edit/${rowId}`}>
            <Button
              className="text-sm font-normal"
              textColor="text-blue-500"
              icon={<PencilIcon className="w-4 h-4" />}
            />
          </Link>
          <Link to={`detail/${rowId}`}>
            <Button
              className="text-sm font-normal"
              textColor="text-blue-500"
              icon={<EyeIcon className="w-4 h-4" />}
            />
          </Link>

          <Dialog>
            <DialogTrigger>
              <Button
                className="text-sm font-normal"
                type="modal"
                textColor="text-red-500"
                icon={<TrashIcon className="w-4 h-4" />}
              />
            </DialogTrigger>

            <DialogContent className="py-12 w-1/3">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="p-6 bg-[#FFDADA] w-fit rounded-lg">
                  <img src={TrashImg} alt="Hapus" />
                </div>

                <div>
                  <h1 className="mt-6 font-semibold text-lg leading-7 text-dark-gray">
                    Apakah Anda yakin menghapus ini?
                  </h1>
                  <div className="flex space-x-3 justify-center">
                    <DialogClose>
                      <Button
                        onClick={() => deleteUserData(rowId)}
                        className="w-full md:w-28 mt-8 border border-[#EB5757]"
                        type="modal"
                        background="bg-white"
                        textColor="text-[#EB5757]"
                      >
                        Ya, hapus
                      </Button>
                    </DialogClose>
                    <DialogClose>
                      <Button
                        className="w-full md:w-28 mt-8"
                        type="modal"
                        background="bg-primary"
                        textColor="text-white"
                      >
                        Batal
                      </Button>
                    </DialogClose>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
    header: () => <div className="text-right">Aksi</div>,
  }),
];

const months = [
  { id: 1, name: 'Januari' },
  { id: 2, name: 'Februari' },
  { id: 3, name: 'Maret' },
  { id: 4, name: 'April' },
  { id: 5, name: 'Mei' },
  { id: 6, name: 'Juni' },
  { id: 7, name: 'Juli' },
  { id: 8, name: 'Agustus' },
  { id: 9, name: 'September' },
  { id: 10, name: 'Oktober' },
  { id: 11, name: 'November' },
  { id: 12, name: 'Desember' },
];

const years = Array.from({ length: 38 }, (_, i) => (2023 + i).toString());

export default function ReportTable() {
  const [triwulanList, setTriwulanList] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState({});
  const [selectedTriwulan, setSelectedTriwulan] = useState({});
  const [selectedYear, setSelectedYear] = useState({});
  const [pageData, setCurrentPageData] = useState({
    rowData: [],
    search: '',
    isLoading: false,
    totalPages: 0,
    totalData: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [resetPage, setResetPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const authHeader = useAuthHeader();
  const { showToastMessage } = useToastContext();

  const fetchTriwulan = async () => {
    setIsLoading(true);

    try {
      const triwulanResponse = await getTriwulan();
      setTriwulanList(triwulanResponse);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const fetchReports = async (pageNumber, search, month, year, triwulan) => {
    setCurrentPageData((prev) => ({
      ...prev,
      isLoading: true,
    }));

    try {
      const reportResponse = await getReports(authHeader, {
        pageNumber,
        search,
        month,
        year,
        triwulan,
      });

      setCurrentPageData((prev) => ({
        ...prev,
        rowData: reportResponse.result,
        isLoading: false,
        totalPages: reportResponse.pages,
        totalData: reportResponse.total,
      }));
    } catch (err) {
      setError(err.message);
      setCurrentPageData((prev) => ({
        ...prev,
        isLoading: false,
      }));
    }
  };

  const deleteReportData = async (reportId) => {
    try {
      const deleteResponse = await deleteReport(authHeader, reportId);
      fetchReports(currentPage, pageData.search);

      showToastMessage(deleteResponse);
    } catch (err) {
      showToastMessage(err.message, 'error');
    }
  };

  useEffect(() => {
    fetchReports(currentPage, pageData.search);
    fetchTriwulan();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setResetPage((prevState) => !prevState);
    setCurrentPageData((prevState) => ({
      ...prevState,
      rowData: [],
      searchLoading: true,
    }));

    fetchReports(
      currentPage,
      pageData.search,
      selectedMonth.value,
      selectedYear.value,
      selectedTriwulan.value
    );
  }, [pageData.search, selectedMonth, selectedYear, selectedTriwulan]);

  const onSelectMonth = useCallback(({ newValue: value, newLabel: label }) => {
    setSelectedMonth({
      value,
      label,
    });
  }, []);

  const onSelectTriwulan = useCallback(
    ({ newValue: value, newLabel: label }) => {
      setSelectedTriwulan({
        value,
        label,
      });
    },
    []
  );

  const onSelectYear = useCallback(({ newValue: value, newLabel: label }) => {
    setSelectedYear({
      value,
      label,
    });
  }, []);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (isLoading) {
    return <ReactLoading />;
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Data Laporan</h1>
      </div>

      <div className="flex justify-between mt-6">
        <div className="flex space-x-3">
          {/* Month Dropdown */}
          <Dropdown
            onSelect={onSelectMonth}
            label="--Pilih Bulan--"
            labelPosition="center"
            selectedItem={selectedMonth}
            minWidth="11rem"
          >
            <Dropdown.Items>
              <li
                key="initial"
                value={null}
                className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                --Pilih Bulan--
              </li>
              {months.map((month) => (
                <li
                  key={month.id}
                  value={month.id}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {month.name}
                </li>
              ))}
            </Dropdown.Items>
          </Dropdown>

          {/* Years Dropdown */}
          <Dropdown
            onSelect={onSelectYear}
            label="--Pilih Tahun--"
            labelPosition="center"
            selectedItem={selectedYear}
            minWidth="11rem"
          >
            <Dropdown.Items>
              <li
                key="initial"
                value={null}
                className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                --Pilih Tahun--
              </li>
              {years.map((year) => (
                <li
                  key={year}
                  value={year}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {year}
                </li>
              ))}
            </Dropdown.Items>
          </Dropdown>

          {/* Triwulan Dropdown */}
          <Dropdown
            onSelect={onSelectTriwulan}
            label="--Pilih Triwulan--"
            labelPosition="center"
            selectedItem={selectedTriwulan}
            minWidth="11rem"
          >
            <Dropdown.Items>
              <li
                key="initial"
                value={null}
                className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
              >
                --Pilih Triwulan--
              </li>
              {triwulanList.map((trw) => (
                <li
                  key={trw.id}
                  value={trw.id}
                  className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {trw.name}
                </li>
              ))}
            </Dropdown.Items>
          </Dropdown>

          <Button background="bg-primary" textColor="text-white">
            Preview
          </Button>
        </div>

        <div className="relative w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={pageData.search}
            onChange={(e) =>
              setCurrentPageData((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
            placeholder="Pencarian"
          />
        </div>
      </div>

      {pageData.searchLoading && (
        <div className="w-full h-full mt-6 bg-white rounded-lg">
          <Table
            columns={columns.map((column) =>
              column.cell
                ? {
                    ...column,
                    cell: (props) => column.cell(props, deleteReportData),
                  }
                : column
            )}
            data={pageData.rowData}
            isLoading={pageData.isLoading}
          />

          <Pagination
            totalRows={pageData.totalData}
            pageChangeHandler={setCurrentPage}
            rowsPerPage={10}
            resetPage={resetPage}
          />
        </div>
      )}
    </>
  );
}
