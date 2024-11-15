/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuthHeader } from 'react-auth-kit';
import { Timeline } from 'rsuite';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment-timezone';
import { Differ } from 'json-diff-kit';
import {
  ArrowDownIcon,
  ArrowDownTrayIcon,
  ArrowLeftIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/solid';

import Button from '@/components/Button';
import ReactLoading from '@/components/Loading';

import { useToastContext } from '@/context/ToastContext';

import getTriwulanDetail from '@/api/user/triwulan/getTriwulanDetail';
import downloadTriwulanPdf from '@/api/admin/report/downloadTriwulanPdf';
import downloadTriwulanExcel from '@/api/admin/report/downloadTriwulanExcel';

import ErrorPage from '@/views/ErrorPage';
import formattedDate from '@/utils/formattedDate';
import formatToRupiah from '@/utils/formatRupiah';
import { baseUrlAPI } from '@/utils/constants';
// eslint-disable-next-line import/no-extraneous-dependencies
import _ from 'lodash';

import 'rsuite/dist/rsuite.min.css';
import 'moment/dist/locale/id';

const initialData = {
  id: 0,
  activity_output_sub: '',
  activity_name: '',
  sub_activity: '',
  program: '',
  activity_location: '',
  fund_source_id: 0,
  fund_source_total: 0,
  fund_ceiling: 0,
  management_organization: '',
  kepala_dinas_name: '',
  pptk_name: '',
  contract_number_date: '',
  contractor_name: '',
  implementation_period: '',
  contract_value: 0,
  physical_realization: 0,
  fund_realization: 0,
  activity_volume: '',
  activity_output: '',
  direct_target_group: '',
  indirect_target_group: '',
  local_workforce: 0,
  non_local_workforce: 0,
  problems: '',
  solution: '',
  procurement_type: '',
  procurement_method: '',
  user_id: 0,
  file: null,
  created_at: '',
  contract_date: '',
  pic_name: '',
  optional: '',
  reason: '',
  leader_name: '',
  updated_at: '',
};

const fieldMappings = [
  {
    key: 'created_at',
    label: 'Tanggal Dibuat',
    isFormatted: true,
    formatter: (v) => formattedDate(v, true),
  },
  {
    key: 'updated_at',
    label: 'Terakhir Update',
    isFormatted: true,
    formatter: (v) => formattedDate(v, true),
  },
  { key: 'activity_name', label: 'Nama Kegiatan' },
  { key: 'activity_output_sub', label: 'Nama Output Sub Kegiatan' },
  { key: 'createdBy', label: 'Diinput Oleh' },
  // { key: 'sub_activity', label: 'Sub Kegiatan' },
  // { key: 'program', label: 'Nama Program' },
  {
    key: 'activity_location',
    label: 'Lokasi Kegiatan',
  },
  {
    key: 'fund_source_id',
    label: 'Sumber Dana',
  },
  {
    key: 'fund_source_total',
    label: 'Total Sumber Dana',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  {
    key: 'fund_ceiling',
    label: 'Pagu Dana',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  { key: 'management_organization', label: 'OPD Organisasi' },
  { key: 'kepala_dinas_name', label: 'Nama Kepala Dinas' },
  { key: 'pptk_name', label: 'Nama PPTK' },
  { key: 'contract_number_date', label: 'Nomor Kontrak' },
  { key: 'contract_date', label: 'Tanggal Kontrak' },
  { key: 'contractor_name', label: 'Nama Penyedia' },
  { key: 'pic_name', label: 'Nama Penanggung Jawab' },
  { key: 'implementation_period', label: 'Jangka Waktu Pelaksanaan' },
  {
    key: 'contract_value',
    label: 'Nilai Kontrak',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  {
    key: 'physical_realization',
    label: 'Realisasi Fisik',
    isFormatted: true,
    formatter: formatToRupiah,
    className: 'text-green-500',
  },
  {
    key: 'physical_realization_percentage',
    label: 'Persentase Realisasi Fisik',
    cellFn: (value) => (
      <span className={Number(value) <= 25 ? 'text-red-500' : ''}>
        {value} %
      </span>
    ),
  },
  {
    key: 'fund_realization',
    label: 'Realisasi Keuangan',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  {
    key: 'fund_realization_percentage',
    label: 'Persentase Realisasi Sumber Dana',
  },
  { key: 'activity_volume', label: 'Volume Kegiatan' },
  { key: 'activity_output', label: 'Output Kegiatan' },
  {
    key: 'direct_target_group',
    label: 'Manfaat Kegiatan (Kelompok sasaran Langsung)',
  },
  {
    key: 'indirect_target_group',
    label: 'Manfaat Kegiatan (Kelompok sasaran tidak Langsung)',
  },
  { key: 'local_workforce', label: 'Jumlah Tenaga Kerja (Lokal)' },
  { key: 'non_local_workforce', label: 'Jumlah Tenaga Kerja (Non Lokal)' },
  { key: 'problems', label: 'Hambatan dan Permasalahan' },
  { key: 'procurement_type', label: 'Jenis Pengadaan' },
  { key: 'procurement_method', label: 'Cara Pengadaan' },
  { key: 'activity_form', label: 'Bentuk Pengadaan' },
  { key: 'optional', label: 'Opsi' },
  { key: 'reason', label: 'Alasan Terkait' },
];

const differ = new Differ({
  detectCircular: true, // default `true`
  maxDepth: Infinity, // default `Infinity`
  showModifications: true, // default `true`
  ignoreCase: true,
  ignoreCaseForKey: true,
  arrayDiffMethod: 'lcs', // default `"normal"`, but `"lcs"` may be more useful
});

const ReportTriwulanDetail = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [report, setReport] = useState(initialData);
  const [selectedIndexTimeline, setSelectedIndexTimeline] = useState(0);
  const [selectedTriwulanTabs, setSelectedTriwulanTabs] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [dataJSON, setDataJSON] = useState([]);
  const [triwulanData, setTriwulanData] = useState({});
  const [formattedTriwulanData, setFormattedTriwulanData] = useState([]);
  const [diffData, setDiffData] = useState([]);

  moment.tz.setDefault('Asia/Jayapura');

  /**
   * display icon up / down
   * @param {number} index
   * @param {string} key lookup key
   * @returns {JSX.Element}
   */
  const compareNumber = (index, key) => {
    const currData = (formattedTriwulanData[selectedTriwulanTabs]?.data ?? [])
    const [src, dst] = [
      parseFloat((currData[index + 1] ?? { [key]: '' })[key] ?? ''),
      parseFloat((currData[index] ?? { [key]: '' })[key] ?? ''),
    ];

    if (src < dst) return <ArrowUpIcon color="green" width={20} height={20} />;
    if (src > dst) return <ArrowDownIcon color="red" width={20} height={20} />;
    return <div />;
  };

  const fieldContainsNumber = [
    'activity_location',
    'fund_source_total',
    'fund_ceiling',
    'contract_value',
    'physical_realization',
    'physical_realization_percentage',
    'fund_realization',
    'fund_realization_percentage',
    'local_workforce',
    'non_local_workforce',
  ];

  const invokeReport = () =>
    setReport({
      ...triwulanData,
      activity_location:
        JSON.parse(triwulanData?.activity_location ?? '{}')?.name ?? '',
      fund_source_total: triwulanData?.fund_source_total ?? 0,
      fund_ceiling: triwulanData?.fund_ceiling ?? 0,
      contract_value: triwulanData.contract_value ?? 0,
      physical_realization: triwulanData.physical_realization ?? 0,
      physical_realization_percentage:
        triwulanData?.physical_realization_percentage ?? 0,
      fund_realization: triwulanData.fund_realization ?? 0,
      fund_realization_percentage: `${triwulanData?.fund_realization_percentage ?? 0
        } %`,
      local_workforce: `${(String(triwulanData?.local_workforce ?? "0") ?? '0').replace('.00', '') ?? '0'
        } Orang`,
      non_local_workforce: `${(String(triwulanData?.non_local_workforce ?? "0") ?? '0').replace('.00', '') ??
        '0'
        } Orang`
    });

  const formatToTriwulan = (data) => _(Array.from(data))
    .groupBy((e) => moment(e.updated_at).quarter())
    .map((value, key) => ({ triwulan: Number(key), data: value }))
    .orderBy((e) => e.triwulan, 'asc')
    .value();

  /**
   *
   * @param {Array<object>} formattedTriwulanSrc
   * @param {number} selectedTabTriwulan
   */
  const formatDiffData = (formattedTriwulanSrc, selectedTabTriwulan) => {
    /** reformat object for historical data change */
    const currentDataArray = formattedTriwulanSrc[selectedTabTriwulan]?.data;
    const cpData = Array.from(currentDataArray).map((e) => ({
      ...e,
      activity_location: JSON.parse(e?.activity_location)?.name ?? '',
    }));
    var r = Array.from(cpData).map((e) => {
      delete e.createdBy;
      delete e.user_id;
      delete e.updated_at;
      delete e.file;
      return e;
    }).reduce((prev, curr, index, original) => {
      const diff = differ
        .diff(original[index - 1], original[index])
        .map((e) => e.filter((f) => f.type !== 'equal'));

      return [...prev, diff];
    }, []);
    var u = Array.from(r)
    u.shift();
    setDiffData([...u, r.pop()]);
  }

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_triwulan'],
    queryFn: () => getTriwulanDetail(id, authHeader()),

    /**
     * @param {object} param0
     * @param {Array} param0.data
     */
    onSuccess: ({ data = [] }) => {
      /** format data to triwulan by updated_at */
      const trwln = formatToTriwulan(data)
      const listAvailTriwulanNum = Array.from(trwln).map((e) => e.triwulan)
      const agTrwln = [
        ...([1, 2, 3, 4].map((e) => !listAvailTriwulanNum.includes(e) ?
          ({ triwulan: e, data: [] }) :
          ({ triwulan: null, data: null }))), ...trwln]
        .filter((f) => f?.triwulan !== null)
        .sort((f1, f2) => f1.triwulan - f2.triwulan)
      const defaultSelectedTriwulanTabs = Math.max(...Array.from(trwln.map((e) => e.triwulan))) - 1;

      setSelectedTriwulanTabs(defaultSelectedTriwulanTabs);
      setFormattedTriwulanData(agTrwln);

      formatDiffData(agTrwln, defaultSelectedTriwulanTabs);
      const currentDataArray = agTrwln[defaultSelectedTriwulanTabs]?.data ?? []

      /** save original data */
      setDataJSON(
        Array.from(data).map((e) => ({ ...e, createdBy: e.createdBy?.name, })) ?? []);
      setTriwulanData(
        Array.from(currentDataArray).map((e) => ({ ...e, createdBy: e.createdBy?.name, }))[selectedIndexTimeline] ?? {});
      invokeReport();
    },
  });

  useEffect(() => {
    if (triwulanData) {
      invokeReport();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triwulanData]);

  if (isError) {
    return <ErrorPage errorMessage={error.message} />;
  }

  if (isLoading) {
    return <ReactLoading />;
  }

  const accessObj = (path, data) => path.split('.').reduce((o, i) => o[i], data);

  const renderFieldValue = (field, data) => {
    const value = accessObj(field.key, data);

    if (field.isFormatted && typeof field.formatter === 'function') {
      return field.formatter(value);
    }

    if (field.cellFn && typeof field.cellFn === 'function') {
      return field.cellFn(value);
    }

    return value;
  };

  const renderTableRows = () =>
    fieldMappings.map((field) => (
      <tr
        key={field.key}
        className={
          fieldMappings.indexOf(field) % 2 === 0 ? 'bg-white' : 'bg-light-blue'
        }
      >
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          {field.label}
        </th>
        <td className="px-6 py-4 flex">
          {renderFieldValue(field, report)}
          {fieldContainsNumber.includes(field.key) ? (
            compareNumber(selectedIndexTimeline, field.key)
          ) : (
            <div />
          )}
        </td>
      </tr>
    ));

  const handleDownloadPDF = async () => {
    const fileName = 'Data Kegiatan.pdf';
    const res = await downloadTriwulanPdf(null, authHeader(), id);

    if (res) {
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(res);

      // Create a link element
      const link = document.createElement('a');

      // Set the href and download attributes to trigger the download
      link.href = blobUrl;
      link.download = fileName;

      // Programmatically click the link to trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up the URL and remove the link from the DOM
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } else {
      showToastMessage('Terjadi kesalahan saat mengunduh file', 'error');
    }
  };

  const handleDownloadExcel = async () => {
    const fileName = 'Data Triwulan.xlsx';
    const res = await downloadTriwulanExcel(null, authHeader(), id);

    if (res) {
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(res);

      // Create a link element
      const link = document.createElement('a');

      // Set the href and download attributes to trigger the download
      link.href = blobUrl;
      link.download = fileName;

      // Programmatically click the link to trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up the URL and remove the link from the DOM
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(link);
    } else {
      showToastMessage('Terjadi kesalahan saat mengunduh file', 'error');
    }
  };

  /**
   * display text diffs
   * @param {number} index
   * @param {boolean} k
   * @returns {JSX.Element[]}
   */
  const displayDiffData = (index = 0, k = false) => {
    const data =
      (diffData[index] ?? [])
        .flat()
        .map((c) => c.text)
        .filter((t) => !`${t ?? ''}`.includes('sys_period'))
        .map((s, i) => (
          <p
            key={s ?? i}
            style={{
              textAlign: 'start',
              // paddingTop:'2%',
              // paddingBottom:'2%',
              paddingLeft: '0.5%',
              paddingRight: '0.5%',
            }}
          >
            {`${s}`
              .split(': ')
              .map((q) => {
                const sIndex = fieldMappings.findIndex(
                  (y) => y.key === `${q}`.slice(1, -1)
                );
                if (sIndex !== -1) return fieldMappings.at(sIndex).label;
                return `${q}`.slice(1, -1);
              })
              .join(' ') ?? `${s}`}
          </p>
        )) ?? [];

    const length = Math.ceil((data.length ?? 0) / 2);
    const [first, last] = [k ? 0 : length, k ? length : data.length];
    return data.slice(first, last);
  };

  return (
    <>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <div>
          <div className="mb-8 cursor-pointer flex flex-col lg:flex-row lg:justify-between">
            <div className="flex space-x-3 items-center">
              <button
                type="button"
                className="flex space-x-3 items-center mb-8"
                onClick={() => navigate(-1)}
              >
                <ArrowLeftIcon className="w-6 h-6" />
                <h1 className="font-semibold text-lg text-dark-gray leading-7">
                  Detail Kegiatan
                </h1>
                <h1 className="font-semibold text-lg text-dark-gray leading-7">
                  &quot;{triwulanData.activity_name}&rdquo;
                </h1>
              </button>
            </div>

            <div className="flex space-x-2">
              <Button
                className="w-full"
                type="submit"
                background="bg-primary"
                textColor="text-white"
                icon={<ArrowDownTrayIcon className="w-6 h-6" />}
                onClick={handleDownloadPDF}
              >
                Unduh Data (PDF)
              </Button>
              <Button
                className="w-full"
                type="submit"
                background="bg-primary"
                textColor="text-white"
                icon={<ArrowDownTrayIcon className="w-6 h-6" />}
                onClick={handleDownloadExcel}
              >
                Unduh Data (XLS)
              </Button>
            </div>
          </div>
        </div>

        <h6 className='m-auto p-2'>Triwulan</h6>
        {Array.from({ length: formattedTriwulanData.length }).map((e, i) => (
          <button
            key={`${e ?? i}`}
            onClick={() => {
              setSelectedIndexTimeline(0);
              setSelectedTriwulanTabs(i);
              setTriwulanData((formattedTriwulanData[i]?.data ?? [])
                .map((x) => ({ ...x, createdBy: x.createdBy?.name, }))[0] ?? {});
              formatDiffData(formattedTriwulanData, i);
              invokeReport();
            }}
            type='button'
            className={i === selectedTriwulanTabs ?
              'm-auto mr-2 border bg-white border-blue-700 text-blue rounded-md p-2' :
              'm-auto mr-2 border bg-white border-gray-300 border-solid text-blue rounded-md p-2'}>
            Triwulan {i + 1}
          </button>))}
        <div className="relative flex overflow-x-auto">

          <table className="w-full text-sm text-left text-dark-gray">
            <tbody>{renderTableRows()}</tbody>
          </table>
          <div>
            <h1
              className="font-semibold text-lg text-dark-gray leading-7"
              style={{ padding: '2%' }}
            >
              Histori Triwulan {selectedTriwulanTabs + 1}
            </h1>
            <Timeline
              align="right"
              key={`${selectedIndexTimeline}r`}
              isItemActive={(i) => i === selectedIndexTimeline}
            >
              {(formattedTriwulanData[selectedTriwulanTabs]?.data ?? []).map((e) => {
                const currData = (formattedTriwulanData[selectedTriwulanTabs]?.data ?? [])
                const currentIndex = currData.indexOf(e);
                // const date = (`${e.sys_period}` ?? '')
                //   .replace(/[\\[\\"\\)]/g, '')
                //   .split(',');
                const date = e.updated_at;

                return (
                  <Timeline.Item
                    key={currentIndex}
                    onClick={() => {
                      setSelectedIndexTimeline(currentIndex);
                      setTriwulanData((currData ?? [])
                        .map((x) => ({ ...x, createdBy: x.createdBy?.name, }))[currentIndex] ?? {});
                      invokeReport();
                    }}
                  >
                    <div
                      key={`${currentIndex}1`}
                      style={{
                        borderStyle: 'groove',
                        borderRadius: '12px',
                        borderWidth: '2px',
                        borderColor:
                          selectedIndexTimeline === currentIndex
                            ? 'blue'
                            : 'white',
                      }}
                    >
                      <h6
                        key={`${currentIndex}2`}
                        style={{
                          textAlign: 'start',
                          paddingTop: '2%',
                          paddingBottom: '2%',
                          paddingLeft: '0.5%',
                          paddingRight: '0.5%',
                        }}
                      >
                        {moment(date ?? new Date())
                          .locale('id')
                          .format('dddd, DD MMMM YYYY HH:mm (Z)')}
                      </h6>
                      <div
                        key={`${currentIndex}3`}
                        style={{ paddingTop: '2%', marginTop: '2%' }}
                      >
                        {currentIndex === currData.length - 1 ? (
                          <div />
                        ) : (
                          <div>
                            {displayDiffData(currentIndex, true)}
                            <s key={`${currentIndex}4`}>
                              {displayDiffData(currentIndex, false)}
                            </s>
                          </div>
                        )}
                      </div>
                    </div>
                  </Timeline.Item>
                );
              })}
            </Timeline>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 bg-white rounded-lg p-9 overflow-hidden">
        <h1 className="font-semibold text-lg text-dark-gray leading-7">
          Daftar Gambar
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[minmax(100px, auto)] mt-6">
          {report.file && report.file.length > 0 ? (
            report.file.map((file) => (
              <img
                key={file}
                src={`${baseUrlAPI}/${file}`}
                alt="file"
                className="w-full h-auto max-h-80 object-cover rounded-lg shadow-md"
                style={{ gridRow: `span ${Math.ceil(Math.random() * 2)}` }}
              />
            ))
          ) : (
            <p className="text-dark-gray">Tidak ada gambar</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportTriwulanDetail;
