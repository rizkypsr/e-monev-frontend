import {
  ArrowLeftIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/solid';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import InfiniteScroll from 'react-infinite-scroll-component';
import { animated, useTransition } from '@react-spring/web';
import Label from '../../../components/Label';
import Button from '../../../components/Button';
import { useToastContext } from '../../../context/ToastContext';
import getPurpose from '../../../api/admin/purpose/getPurpose';
import ErrorPage from '../../ErrorPage';
import updatePurpose from '../../../api/admin/purpose/updatePurpose';
import ReactLoading from '../../../components/Loading';
import getReport from '../../../api/admin/report/getReport';
import Dropdown from '../../../components/Dropdown';
import { getTriwulan } from '../../../api/admin/report';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../../components/DialogContent';
import List from '../../../components/List';
import SelectInputModal from '../../../components/SelectInputModal';
import { createOccasion, getOccasions } from '../../../api/admin/occasion';
import {
  createOrganization,
  getOrganizations,
} from '../../../api/admin/organization';
import { createProgram, getPrograms } from '../../../api/admin/program';
import updateReport from '../../../api/admin/report/updateReport';
import TextInput from '../../../components/TextInput';

export default function ReportEdit() {
  const { id } = useParams();
  const [report, setReport] = useState({
    createdAt: '',
    triwulan: {
      value: 0,
      label: '',
    },
    occasion: '',
    organization: '',
    program: '',
    activity: '',
    indicator: '',
  });
  const [triwulan, setTriwulan] = useState([]);
  const [occasions, setOccasions] = useState({
    items: [],
    hasMore: true,
    isLoading: false,
    totalPages: 0,
    currentPage: 1,
  });
  const [openOccasionDialog, setOpenOccasionDialog] = useState(false);

  const [organizations, setOrganizations] = useState({
    items: [],
    hasMore: true,
    isLoading: false,
    totalPages: 0,
    currentPage: 1,
  });
  const [openOrganizationDialog, setOpenOrganizationDialog] = useState(false);

  const [programs, setPrograms] = useState({
    items: [],
    hasMore: true,
    isLoading: false,
    totalPages: 0,
    currentPage: 1,
  });
  const [openProgramDialog, setOpenProgramDialog] = useState(false);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openCreateOpd, setOpenCreateOpd] = useState(false);
  const [openCreateOccasion, setOpenCreateOccasion] = useState(false);
  const [openCreateProgram, setOpenCreateProgram] = useState(false);

  const authHeader = useAuthHeader();
  const navigate = useNavigate();
  const { showToastMessage } = useToastContext();
  const transationConfig = {
    config: {
      duration: 120,
    },
    from: {
      scale: 0,
      opacity: 0,
    },
    enter: {
      scale: 1,
      opacity: 1,
    },
    leave: {
      scale: 0,
      opacity: 0,
    },
  };
  const transitionCreateOpd = useTransition(openCreateOpd, transationConfig);
  const transitionCreateOccasion = useTransition(
    openCreateOccasion,
    transationConfig
  );
  const transitionCreateProgram = useTransition(
    openCreateProgram,
    transationConfig
  );

  useEffect(() => {
    const fetchReport = async (reportId) => {
      setIsLoading(true);

      try {
        const reportResponse = await getReport(authHeader, reportId);
        setReport({
          createdAt: reportResponse.created_at,
          triwulan: {
            value: reportResponse.triwulan.id,
            label: reportResponse.triwulan.name,
          },
          occasion: {
            id: reportResponse.occassion.id,
            title: reportResponse.occassion.title,
          },
          organization: {
            id: reportResponse.organization.id,
            title: reportResponse.organization.title,
          },
          program: {
            id: reportResponse.program.id,
            title: reportResponse.program.title,
          },
        });

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };

    const fetchTriwulan = async () => {
      setIsLoading(true);

      try {
        const triwulanResponse = await getTriwulan();
        setTriwulan(triwulanResponse);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchReport(id);
    fetchTriwulan();
  }, []);

  async function fetchOccasions(page) {
    try {
      const occasionsResponse = await getOccasions(authHeader, {
        limit: 15,
        pageNumber: page,
      });

      setOccasions((prevData) => ({
        ...prevData,
        items: [...prevData.items, ...occasionsResponse.result],
        totalPages: occasionsResponse.pages,
      }));
    } catch (err) {
      setError(err.message);
    }
  }
  useEffect(() => {
    fetchOccasions(occasions.currentPage);
  }, [occasions.currentPage]);

  async function fetchOrganizations(page) {
    try {
      const organizationResponse = await getOrganizations(authHeader, {
        limit: 15,
        pageNumber: page,
      });
      setOrganizations((prevData) => ({
        ...prevData,
        items: [...prevData.items, ...organizationResponse.result],
        totalPages: organizationResponse.pages,
      }));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchOrganizations(organizations.currentPage);
  }, [organizations.currentPage]);

  async function fetchPrograms(page) {
    try {
      const programResponse = await getPrograms(authHeader, {
        limit: 15,
        pageNumber: page,
      });
      setPrograms((prevData) => ({
        ...prevData,
        items: [...prevData.items, ...programResponse.result],
        totalPages: programResponse.pages,
      }));
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    fetchPrograms(programs.currentPage);
  }, [programs.currentPage]);

  const onSelectTriwulan = useCallback(({ newValue, newLabel }) => {
    setReport((prev) => ({
      ...prev,
      triwulan: {
        value: newValue,
        label: newLabel,
      },
    }));
  }, []);

  const handleSelectOccasion = (ocs) => {
    setReport((prev) => ({ ...prev, occasion: ocs }));
    setOpenOccasionDialog(false);
  };

  const handleSelectOrganization = (org) => {
    setReport((prev) => ({ ...prev, organization: org }));
    setOpenOrganizationDialog(false);
  };

  const handleSelectProgram = (org) => {
    setReport((prev) => ({ ...prev, program: org }));
    setOpenProgramDialog(false);
  };

  const loadMoreOccasionData = async () => {
    setOccasions((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  const loadMoreOrganizationData = async () => {
    setOrganizations((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  const loadMoreProgramData = async () => {
    setPrograms((prevData) => ({
      ...prevData,
      currentPage: prevData.currentPage + 1,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const reportBody = {
        data_report_id: id,
        triwulan_id: Number(report.triwulan.value),
        organization_id: report.organization.id,
        occassion_id: report.occasion.id,
        program_id: report.program.id,
      };
      const reportResponse = await updateReport(authHeader, reportBody);

      setIsLoading(false);
      showToastMessage(reportResponse, 'success');
      navigate('../');
    } catch (err) {
      setIsLoading(false);
      showToastMessage(err.message, 'error');
    }
  };

  const handleOccasionKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setOccasions((prev) => ({ ...prev, isLoading: true }));
      setOpenCreateOccasion(false);

      try {
        const occasionBody = { title: e.target.value };
        const occasionResponse = await createOccasion(authHeader, occasionBody);

        setOpenCreateOccasion(false);
        setOccasions((prev) => ({
          ...prev,
          isLoading: false,
          items: [
            {
              id: occasionResponse.data.id,
              title: occasionResponse.data.title,
            },
            ...prev.items,
          ],
        }));

        showToastMessage(occasionResponse);
      } catch (err) {
        setOpenCreateOccasion(false);
        setOccasions((prev) => ({ ...prev, isLoading: false }));
        showToastMessage(err.message, 'error');
      }
    }
  };

  const handleOpdKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setOrganizations((prev) => ({ ...prev, isLoading: true }));
      setOpenCreateOpd(false);

      try {
        const organizationBody = { title: e.target.value };
        const organizationResponse = await createOrganization(
          authHeader,
          organizationBody
        );

        setOpenCreateOpd(false);
        setOrganizations((prev) => ({
          ...prev,
          isLoading: false,
          items: [
            {
              id: organizationResponse.data.id,
              title: organizationResponse.data.title,
            },
            ...prev.items,
          ],
        }));
        showToastMessage(organizationResponse);
      } catch (err) {
        setOpenCreateOpd(false);
        setOrganizations((prev) => ({ ...prev, isLoading: false }));
        showToastMessage(err.message, 'error');
      }
    }
  };

  const handleProgramKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setPrograms((prev) => ({ ...prev, isLoading: true }));
      setOpenCreateProgram(false);

      try {
        const programBody = { title: e.target.value };
        const programResponse = await createProgram(authHeader, programBody);

        setOpenCreateProgram(false);
        setPrograms((prev) => ({
          ...prev,
          isLoading: false,
          items: [
            {
              id: programResponse.data.id,
              title: programResponse.data.title,
            },
            ...prev.items,
          ],
        }));
        showToastMessage(programResponse);
      } catch (err) {
        setOpenCreateProgram(false);
        setPrograms((prev) => ({ ...prev, isLoading: false }));
        showToastMessage(err.message, 'error');
      }
    }
  };

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
      <div className="w-full h-full mt-6 bg-white rounded-lg p-9">
        <Link to="../" className="flex space-x-3 items-center mb-8">
          <ArrowLeftIcon className="w-6 h-6" />
          <h1 className="font-semibold text-lg text-dark-gray leading-7">
            Edit Laporan
          </h1>
        </Link>

        <form className="mt-4 lg:w-2/3 xl:w-1/3" onSubmit={onSubmit}>
          <div className="mb-6">
            <Label className="mb-2">Triwulan</Label>
            <Dropdown
              dropdownStyle="border"
              onSelect={onSelectTriwulan}
              label="--Pilih Triwulan--"
              labelPosition="center"
              selectedItem={report.triwulan}
            >
              <Dropdown.Items>
                {triwulan.map((trw) => (
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
          </div>
          <div className="mb-6">
            <Label>Urusan</Label>
            <Dialog
              open={openOccasionDialog}
              onOpenChange={setOpenOccasionDialog}
            >
              <DialogTrigger className="w-full">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={report.occasion.title}
                  label="--- Pilih Urusan ---"
                />
              </DialogTrigger>

              <DialogContent
                addButton
                title="Pilih Nama Urusan"
                onCreateClick={() => setOpenCreateOccasion((prev) => !prev)}
              >
                {transitionCreateOccasion((style, isOpen) => (
                  <div>
                    {isOpen && (
                      <animated.div
                        style={style}
                        className="w-72 bg-white rounded-md absolute z-10 -right-80 top-0 p-4"
                      >
                        <TextInput
                          required
                          placeholder="Masukan Nama Urusan"
                          onKeyDown={handleOccasionKeyDown}
                        />
                        <p className="text-xs text-light-gray mt-2 text-left">
                          Tekan{' '}
                          <span className="itelic text-dark-gray">Enter</span>{' '}
                          untuk menyimpan
                        </p>
                      </animated.div>
                    )}
                  </div>
                ))}

                <div className="relative my-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
                    placeholder="Pencarian"
                  />
                </div>
                {occasions.isLoading ? (
                  <ReactLoading />
                ) : (
                  <InfiniteScroll
                    dataLength={occasions.items.length}
                    next={loadMoreOccasionData}
                    hasMore={occasions.hasMore}
                    height={500}
                    endMessage={
                      <h1 className="font-bold text-2xl text-gray-400">...</h1>
                    }
                  >
                    <List
                      data={occasions.items}
                      onSelectValue={handleSelectOccasion}
                    />
                  </InfiniteScroll>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <div className="mb-6">
            <Label>Organisasi</Label>
            <Dialog
              open={openOrganizationDialog}
              onOpenChange={setOpenOrganizationDialog}
            >
              <DialogTrigger className="w-full">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={report.organization.title}
                  label="--- Pilih Organisasi ---"
                />
              </DialogTrigger>

              <DialogContent
                addButton
                title="Pilih Nama OPD"
                onCreateClick={() => setOpenCreateOpd((prev) => !prev)}
              >
                {transitionCreateOpd((style, isOpen) => (
                  <div>
                    {isOpen && (
                      <animated.div
                        style={style}
                        className="w-72 bg-white rounded-md absolute z-10 -right-80 top-0 p-4"
                      >
                        <TextInput
                          required
                          placeholder="Masukan Nama OPD"
                          onKeyDown={handleOpdKeyDown}
                        />
                        <p className="text-xs text-light-gray mt-2 text-left">
                          Tekan{' '}
                          <span className="itelic text-dark-gray">Enter</span>{' '}
                          untuk menyimpan
                        </p>
                      </animated.div>
                    )}
                  </div>
                ))}

                <div className="relative my-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
                    placeholder="Pencarian"
                  />
                </div>
                {organizations.isLoading ? (
                  <ReactLoading />
                ) : (
                  <InfiniteScroll
                    dataLength={organizations.items.length}
                    next={loadMoreOrganizationData}
                    hasMore={organizations.hasMore}
                    height={500}
                    endMessage={
                      <h1 className="font-bold text-2xl text-gray-400">...</h1>
                    }
                  >
                    <List
                      data={organizations.items}
                      onSelectValue={handleSelectOrganization}
                    />
                  </InfiniteScroll>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <div className="mb-6">
            <Label>Program</Label>
            <Dialog
              open={openProgramDialog}
              onOpenChange={setOpenProgramDialog}
            >
              <DialogTrigger className="w-full">
                <SelectInputModal
                  className="mt-2"
                  selectedValue={report.program.title}
                  label="--- Pilih Program ---"
                />
              </DialogTrigger>

              <DialogContent
                addButton
                title="Pilih Nama Program"
                onCreateClick={() => setOpenCreateProgram((prev) => !prev)}
              >
                {transitionCreateProgram((style, isOpen) => (
                  <div>
                    {isOpen && (
                      <animated.div
                        style={style}
                        className="w-72 bg-white rounded-md absolute z-10 -right-80 top-0 p-4"
                      >
                        <TextInput
                          required
                          placeholder="Masukan Nama Program"
                          onKeyDown={handleProgramKeyDown}
                        />
                        <p className="text-xs text-light-gray mt-2 text-left">
                          Tekan{' '}
                          <span className="itelic text-dark-gray">Enter</span>{' '}
                          untuk menyimpan
                        </p>
                      </animated.div>
                    )}
                  </div>
                ))}

                <div className="relative my-6">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <MagnifyingGlassIcon className="w-4 h-4" />
                  </div>
                  <input
                    type="search"
                    id="search"
                    className="bg-gray-50 text-light-gray border-none text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 shadow"
                    placeholder="Pencarian"
                  />
                </div>
                {programs.isLoading ? (
                  <ReactLoading />
                ) : (
                  <InfiniteScroll
                    dataLength={programs.items.length}
                    next={loadMoreProgramData}
                    hasMore={programs.hasMore}
                    height={500}
                    endMessage={
                      <h1 className="font-bold text-2xl text-gray-400">...</h1>
                    }
                  >
                    <List
                      data={programs.items}
                      onSelectValue={handleSelectProgram}
                    />
                  </InfiniteScroll>
                )}
              </DialogContent>
            </Dialog>
          </div>
          {isLoading ? (
            <ReactLoading />
          ) : (
            <div className="flex space-x-3">
              <Button
                type="submit"
                className="w-full md:w-28"
                background="bg-primary"
                textColor="text-white"
                icon={<CheckCircleIcon className="w-5 h-5" />}
              >
                Simpan
              </Button>
              <Link to="../">
                <Button
                  className="w-full md:w-28 font-medium"
                  background="bg-[#EAEAEA]"
                  textColor="text-dark-gray"
                >
                  Batal
                </Button>
              </Link>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
