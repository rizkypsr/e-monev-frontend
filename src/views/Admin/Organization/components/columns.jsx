import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '../../../../components/DialogContent';
import TrashImg from '../../../../assets/images/trash.png';
import Button from '../../../../components/Button';

const columns = [
  {
    header: 'No',
    cell: ({ row: { index }, table }) => {
      const currentPage = table.options.meta?.currentPage;

      return <i>{(currentPage - 1) * 10 + (index + 1)}</i>;
    },
  },
  {
    accessorKey: 'code',
    header: 'Kode',
  },
  {
    accessorKey: 'title',
    header: 'Organisasi',
    cell: (info) => <i>{info.getValue().toUpperCase()}</i>,
  },
  {
    id: 'action',
    header: () => <div className="text-right">Aksi</div>,
    cell: (props, deleteOccasionData) => {
      const rowId = props.row.original.id;
      return (
        <div className="flex justify-end">
          <Link to={`edit/${rowId}`}>
            <Button
              className="text-sm font-normal"
              textColor="text-blue-500"
              icon={<PencilIcon className="w-4 h-4" />}
            >
              Edit
            </Button>
          </Link>
          <Link to={`detail/${rowId}`}>
            <Button
              className="text-sm font-normal"
              textColor="text-blue-500"
              icon={<EyeIcon className="w-4 h-4" />}
            >
              Lihat
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger>
              <Button
                className="text-sm font-normal"
                type="modal"
                textColor="text-red-500"
                icon={<TrashIcon className="w-4 h-4" />}
              >
                Hapus
              </Button>
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
                        onClick={() => deleteOccasionData(rowId)}
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
  },
];

export default columns;
