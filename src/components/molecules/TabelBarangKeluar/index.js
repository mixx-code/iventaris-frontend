import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const TabelBarangKeluar = () => {
  const [counter, setCounter] = useState(1);
  const [halaman, setHalaman] = useState([]);
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [allData, setAllData] = useState([]);
  console.log("barang Keluar", barangKeluar);
  console.log("semua barang Keluar", allData);

  let totalPage = Math.ceil(halaman.total_data / halaman.per_page);
  // console.log(page);
  let page = counter;
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/v1/iventaris/items-keluar?sort=updatedAt:desc&page=${page}&perPage=7` ||
          `https://zany-rose-butterfly-coat.cyclic.app/v1/iventaris/items-keluar?sort=updatedAt:desc&page=${page}&perPage=7`
      )
      .then((response) => {
        const responAPI = response.data;
        setBarangKeluar(responAPI.data);
        setHalaman(responAPI);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [page]);
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/v1/iventaris/items-keluar` ||
          `https://zany-rose-butterfly-coat.cyclic.app/v1/iventaris/items-keluar/`
      )
      .then((response) => {
        const responAPI = response.data;
        const dataLength = responAPI.data.length;
        setAllData(responAPI.data);
        console.log(`Jumlah data: ${dataLength}`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1);
  };
  const next = () => {
    setCounter(counter === totalPage ? totalPage : counter + 1);
  };
  const sortedBarangKeluar = barangKeluar.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const sortedSemuaBarangKeluar = allData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return (
    <div className="flex flex-col w-1/3 ml-24 mt-32 relative">
      <h1 className="font-semibold text-3xl">Tabel Barang Keluar</h1>
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table
              id="myTable"
              className="min-w-full text-center text-sm font-light "
            >
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr className="bg-blue-700">
                  <th scope="col" className="px-6 py-4">
                    Nama Barang
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Jumlah Keluar
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Tanggal Keluar
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedBarangKeluar.map((item) => {
                  const dateString = item.createdAt;
                  const date = new Date(dateString);
                  const year = date.getFullYear();
                  const month = date.getMonth() + 1; // tambahkan 1 karena bulan dimulai dari 0
                  const day = date.getDate();
                  let tanggal = `${day} - ${month} - ${year}`;
                  return (
                    <tr
                      className="border-b bg-blue-100 border-blue-500"
                      key={item._id}
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-700">
                        {item.nama_item_keluar}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-700">
                        {item.jumlah_item_keluar}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium text-neutral-700">
                        {tanggal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex absolute right-0 -bottom-7">
              <div
                className="bg-custom-abu-tua p-1 px-2 mr-5 rounded-lg text-white cursor-pointer"
                onClick={previous}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
              <div
                className="bg-custom-hijau-muda p-1 px-2 rounded-lg text-white cursor-pointer"
                onClick={next}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelBarangKeluar;
