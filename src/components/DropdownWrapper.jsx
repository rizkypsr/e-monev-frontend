import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';

export default function DropdownWrapper({ onFetching, onSelect, error }) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [networkError, setNetworkError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await onFetching();
        setData(res);
      } catch (err) {
        setNetworkError(err.message);
      }
    };

    fetchData();
  }, [onFetching]);

  const handleSelect = ({ newValue, newLabel }) => {
    setSelectedItem({
      value: newValue,
      label: newLabel,
    });
    onSelect({ newValue, newLabel });
  };

  return (
    <Dropdown
      className="mt-2"
      dropdownStyle="border"
      onSelect={handleSelect}
      label="--Pilih Triwulan--"
      labelPosition="center"
      selectedItem={selectedItem}
      error={error}
    >
      {networkError ? (
        <p className='p-3'>{networkError}</p>
      ) : (
        <Dropdown.Items>
          {data.map((d) => (
            <li
              key={d.id}
              value={d.id}
              className="block px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {d.name}
            </li>
          ))}
        </Dropdown.Items>
      )}
    </Dropdown>
  );
}
