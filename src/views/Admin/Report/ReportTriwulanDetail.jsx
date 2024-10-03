/* eslint-disable no-var */
/* eslint-disable prefer-template */
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-extraneous-dependencies */
import { ArrowDownIcon, ArrowDownTrayIcon, ArrowLeftIcon, ArrowUpIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Timeline } from 'rsuite';
import moment from 'moment';
import { Differ } from 'json-diff-kit';
import ReactLoading from '../../../components/Loading';
import ErrorPage from '../../ErrorPage';
import formattedDate from '../../../utils/formattedDate';
import getTriwulanDetail from '../../../api/user/triwulan/getTriwulanDetail';
import Button from '../../../components/Button';
import formatToRupiah from '../../../utils/formatRupiah';
import downloadTriwulanPdf from '../../../api/admin/report/downloadTriwulanPdf';
import { useToastContext } from '../../../context/ToastContext';
import downloadTriwulanExcel from '../../../api/admin/report/downloadTriwulanExcel';
import { baseUrlAPI } from '../../../utils/constants';
import 'rsuite/dist/rsuite.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
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
    formatter: formattedDate,
  },
  {
    key: 'updated_at',
    label: 'Terakhir Update',
    isFormatted: true,
    formatter: formattedDate,
  },
  { key: 'activity_name', label: 'Nama Kegiatan' },
  { key: 'activity_output_sub', label: 'Nama Output Sub Kegiatan' },
  { key: 'sub_activity', label: 'Sub Kegiatan' },
  { key: 'program', label: 'Nama Program' },
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
  },
  {
    key: 'physical_realization_percentage',
    label: 'Persentase Realisasi Fisik'
  },
  {
    key: 'fund_realization',
    label: 'Realisasi Keuangan',
    isFormatted: true,
    formatter: formatToRupiah,
  },
  {
    key: 'fund_realization_percentage',
    label: 'Persentase Realisasi Sumber Dana'
  },
  { key: 'activity_volume', label: 'Volume Kegiatan' },
  { key: 'activity_output', label: 'Output Kegiatan' },
  {
    key: 'direct_target_group',
    label: 'Manfaat Kegiatan (Kelompok sasaran Langsung)',
  },
  {
    key: 'indirect_target_group',
    label: 'Manfaat Kegiatan (Kelompok sasaran Langsung)',
  },
  { key: 'local_workforce', label: 'Jumlah Tenaga Kerja (Lokal)' },
  { key: 'non_local_workforce', label: 'Jumlah Tenaga Kerja (Non Lokal)' },
  { key: 'problems', label: 'Hambatan dan Permasalahan' },
  { key: 'procurement_type', label: 'Jenis Pengadaan' },
  { key: 'procurement_method', label: 'Cara Pengadaan' },
  { key: 'optional', label: 'Opsi' },
  { key: 'reason', label: 'Alasan Terkait' },
];

const differ = new Differ({
  detectCircular: true,    // default `true`
  maxDepth: Infinity,      // default `Infinity`
  showModifications: true, // default `true`
  ignoreCase: true,
  ignoreCaseForKey: true,
  arrayDiffMethod: 'lcs',  // default `"normal"`, but `"lcs"` may be more useful
});

const ReportTriwulanDetail = () => {
  const { id } = useParams();
  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();

  const [report, setReport] = useState(initialData);
  const [selectedIndexTimeline, setSelectedIndexTimeline] = useState(0);
  // eslint-disable-next-line no-var, camelcase
  const [dataJSON, setDataJSON] = useState([]);
  const [triwulanData, setTriwulanData] = useState({});
  const [diffData, setDiffData] = useState([]);

  /**
   * display icon up / down
   * @param {number} index
   * @param {string} key lookup key
   * @returns {JSX.Element}
   */
  const compareNumber = (index, key) => {
    const [src, dst] = [
      parseFloat((dataJSON[index + 1] ?? { [key]: '' })[key] ?? ''),
      parseFloat((dataJSON[index] ?? { [key]: '' })[key] ?? '')]

    if (src < dst)
      return <ArrowUpIcon color='green' width={20} height={20} />
    if (src > dst)
      return <ArrowDownIcon color='red' width={20} height={20} />
    return <div />
  }

  const fieldContainsNumber = [
    "activity_location",
    "fund_source_total",
    "fund_ceiling",
    "contract_value",
    "physical_realization",
    "physical_realization_percentage",
    "fund_realization",
    "fund_realization_percentage",
    "local_workforce",
    "non_local_workforce"
  ];

  const invokeReport = () => setReport({
    ...triwulanData,
    activity_location: JSON.parse(triwulanData?.activity_location ?? "{}")?.name ?? "",
    fund_source_total: triwulanData?.fund_source_total ?? 0,
    fund_ceiling: triwulanData?.fund_ceiling ?? 0,
    contract_value: triwulanData.contract_value ?? 0,
    physical_realization: triwulanData.physical_realization ?? 0,
    physical_realization_percentage: `${triwulanData?.physical_realization_percentage ?? 0} %`,
    fund_realization: triwulanData.fund_realization ?? 0,
    fund_realization_percentage: `${triwulanData?.fund_realization_percentage ?? 0} %`,
    local_workforce: `${(String(triwulanData?.local_workforce) ?? "0").replace('.00', '') ?? "0"} Orang`,
    non_local_workforce: `${(String(triwulanData?.non_local_workforce) ?? "0").replace('.00', '') ?? "0"} Orang`,
  });

  const { isLoading, isError, error } = useQuery({
    queryKey: ['get_triwulan'],
    queryFn: () => getTriwulanDetail(id, authHeader()),
    /**
     * @param {object} param0
     * @param {Array} param0.data
     */
    onSuccess: ({ data = [] }) => {

      const r = Array.from(data).reduce((prev, curr, index, original) => {
        const diff = differ
          .diff(original[index - 1], original[index])
          .map((e) => e.filter((f) => f.type !== 'equal'));

        return [...prev, diff]
      }, []);

      // console.log(r,'e');
      var u = Array.from(r)
      u.shift()
      setDiffData([...u, r.pop()])


      setDataJSON(Array.from(data) ?? []);
      setTriwulanData(Array.from(data)[selectedIndexTimeline] ?? {});
      invokeReport();

    },
  });

  useEffect(() => {
    if (triwulanData) {
      invokeReport()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triwulanData])


  if (isError) {
    return <ErrorPage errorMessage={error.message} />;
  }

  if (isLoading) {
    return <ReactLoading />;
  }

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
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
        >
          {field.label}
        </th>
        <td className="px-6 py-4 flex">
          {field.isFormatted
            ? field.formatter(report[field.key])
            : report[field.key]}
          {fieldContainsNumber.includes(field.key) ?
            compareNumber(selectedIndexTimeline, field.key) :
            <div />}
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

    const data = (diffData[index] ?? [])
      .flat()
      .map((c) => c.text)
      .filter((t) =>
        !`${t ?? ""}`.includes('sys_period'))
      .map((s, i) => {

        return (<p key={s ?? i} style={{
          textAlign: 'start',
          // paddingTop:'2%',
          // paddingBottom:'2%',
          paddingLeft: '0.5%',
          paddingRight: '0.5%'
        }}>
          {`${s}`
            .split(': ')
            .map((q) => {
              const sIndex = fieldMappings.findIndex((y) => y.key === `${q}`.slice(1, -1))
              if (sIndex !== -1)
                return fieldMappings.at(sIndex).label
              return `${q}`.slice(1, -1)
            })
            .join(' ') ?? `${s}`}
        </p>)
      }) ?? []

    const length = Math.ceil((data.length ?? 0) / 2)
    const [first, last] = [k ? 0 : length, k ? length : data.length]
    return data.slice(first, last)
    // return data
  }

  return (
    <>
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <div>
          <div className="mb-8 cursor-pointer flex justify-between">
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
                className="w-28 lg:w-auto"
                type="submit"
                background="bg-primary"
                textColor="text-white"
                icon={<ArrowDownTrayIcon className="w-6 h-6" />}
                onClick={handleDownloadPDF}
              >
                Unduh Data (PDF)
              </Button>
              <Button
                className="w-28 lg:w-auto"
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

        <div className="relative flex overflow-x-auto">
          <table className="w-full text-sm text-left text-dark-gray">
            <tbody>{renderTableRows()}</tbody>
          </table>
          <div>
            <h1 className="font-semibold text-lg text-dark-gray leading-7" style={{ padding: '2%' }}>
              Histori Data
            </h1>
            <Timeline align='right' key={selectedIndexTimeline + 'r'} isItemActive={(i) => i === selectedIndexTimeline}>
              {dataJSON.map((e) => {

                const currentIndex = dataJSON.indexOf(e);
                const date = (`${e.sys_period}` ?? "")
                  .replace(/[\\[\\"\\)]/g, '')
                  .split(',')

                return (<Timeline.Item
                  key={currentIndex}
                  onClick={() => {
                    setSelectedIndexTimeline(currentIndex);
                    setTriwulanData(e);
                    invokeReport();
                  }}>
                  <div key={currentIndex + '1'} style={{
                    borderStyle: 'groove',
                    borderRadius: '12px',
                    borderWidth: '2px',
                    borderColor: selectedIndexTimeline === currentIndex ?
                      'blue' :
                      'white'
                  }}>
                    <h6 key={currentIndex + '2'} style={{
                      textAlign: 'start',
                      paddingTop: '2%',
                      paddingBottom: '2%',
                      paddingLeft: '0.5%',
                      paddingRight: '0.5%'
                    }}>
                      {moment(date[0] ?? '')
                        .locale('id')
                        .format('dddd, DD MMMM YYYY (HH:mm ZZ)')}</h6>
                    <div key={currentIndex + '3'} style={{ paddingTop: '2%', marginTop: '2%' }}>
                      {currentIndex === dataJSON.length - 1 ? <div /> : (<div>{displayDiffData(currentIndex, true)}
                        <s key={currentIndex + '4'}>{displayDiffData(currentIndex, false)}</s></div>)}
                    </div>
                  </div>
                </Timeline.Item>)
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
              // console.log(file, '.s..s.s.s.s.');

              <img
                key={file}
                src={`${baseUrlAPI}/${file}`}
                alt="file"
                className="w-full h-auto max-h-80 object-cover rounded-lg shadow-md"
                style={{ gridRow: `span ${Math.ceil(Math.random() * 2)}` }} // Adjust for staggered effect
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
