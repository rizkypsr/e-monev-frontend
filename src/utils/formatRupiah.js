// export default function formatRupiah(num) {
//   let formattedAngka = num;

//   if (num.charAt(0) === '0') {
//     formattedAngka = num.slice(1);
//   }

//   const numberString = formattedAngka.replace(/[^,\d]/g, '').toString();
//   const split = numberString.split(',');
//   const sisa = split[0].length % 3;
//   let rupiah = split[0].substr(0, sisa);
//   const ribuan = split[0].substr(sisa).match(/\d{3}/g);

//   if (ribuan) {
//     const separator = sisa ? '.' : '';
//     rupiah += separator + ribuan.join('.');
//   }

//   rupiah = split[1] !== undefined ? `${rupiah},${split[1]}` : rupiah;
//   return rupiah;
// }

export default function formatToRupiah(amount) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  if (!amount) {
    return formatter.format(0);
  }

  return formatter.format(Number(amount));
}
