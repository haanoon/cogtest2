import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const SalesPredictionApp: React.FC = () => {
  const [storeNumber, setStoreNumber] = useState<number>(0);
  const [storeType, setStoreType] = useState<string>("A");
  const [productFamily, setProductFamily] = useState<string>("AUTOMOTIVE");
  const [cluster, setCluster] = useState<number>(1);
  const [date, setDate] = useState<Date | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<number>(0);
  const [promotion, setPromotion] = useState<number>(0);
  const [transactions, setTransactions] = useState<number>(0);
  const [state, setState] = useState<string>("Pichincha");
  const [crudeOilPrice, setCrudeOilPrice] = useState<number>(0);
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleDateChange = (d: Date | null) => {
    setDate(d);
    if (d) {
      setDayOfWeek(d.getDay()); // 0=Sunday ... 6=Saturday
    }
  };

  const handleSubmit = async () => {
    if (!date) {
      alert("Please select a date!");
      return;
    }

    const day = date.getDate();
    const month = date.getMonth() + 1; // JS months are 0-based
    const year = date.getFullYear();

    const payload = {
      store_number: storeNumber,
      store_type: storeType,
      product_family: productFamily,
      cluster,
      day,
      month,
      year,
      day_of_week: dayOfWeek,
      promotion,
      transactions,
      state,
      crude_oil_price: crudeOilPrice,
    };

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(data.prediction ?? "No prediction returned");
    } catch (error) {
      console.error("Error:", error);
      setPrediction("Error fetching prediction");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Sales Prediction App</h1>

      <div className="grid grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
        {/* Store Number */}
        <div>
          <label className="block mb-2">Store Number</label>
          <input
            type="number"
            min={0}
            max={54}
            value={storeNumber}
            onChange={(e) => setStoreNumber(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Store Type */}
        <div>
          <label className="block mb-2">Store Type</label>
          <select
            value={storeType}
            onChange={(e) => setStoreType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>

        {/* Product Family */}
        <div>
          <label className="block mb-2">Product Family</label>
          <select
            value={productFamily}
            onChange={(e) => setProductFamily(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="AUTOMOTIVE">AUTOMOTIVE</option>
            <option value="BEAUTY">BEAUTY</option>
            <option value="CLOTHING">CLOTHING</option>
            <option value="FOODS">FOODS</option>
            <option value="GROCERY">GROCERY</option>
            <option value="LIQUOR,WINE,BEER">LIQUOR, WINE, BEER</option>
          </select>
        </div>

        {/* Cluster */}
        <div>
          <label className="block mb-2">Cluster</label>
          <input
            type="number"
            min={1}
            max={17}
            value={cluster}
            onChange={(e) => setCluster(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* 📅 Date Picker */}
        <div>
          <label className="block mb-2">Select Date</label>
          <DatePicker
            selected={date}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Pick a date"
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            minDate={new Date(2000, 0, 1)}
            maxDate={new Date(2100, 11, 31)}
            className="border p-2 rounded w-full"
          />
          {date && (
            <p className="mt-2 text-sm text-gray-600">
              Day of Week: <b>{dayOfWeek}</b>
            </p>
          )}
        </div>

        {/* Promotion */}
        <div>
          <label className="block mb-2">Number of Items on Promotion</label>
          <input
            type="number"
            min={0}
            value={promotion}
            onChange={(e) => setPromotion(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Transactions */}
        <div>
          <label className="block mb-2">Number of Transactions</label>
          <input
            type="number"
            min={0}
            value={transactions}
            onChange={(e) => setTransactions(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Crude Oil Price */}
        <div>
          <label className="block mb-2">Crude Oil Price</label>
          <input
            type="number"
            min={0}
            value={crudeOilPrice}
            onChange={(e) => setCrudeOilPrice(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* State */}
        <div>
          <label className="block mb-2">State Where the Store is Located</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="Pichincha">Pichincha</option>
            <option value="Guayas">Guayas</option>
            <option value="Azuay">Azuay</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Predict
      </button>

      {prediction && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold">Prediction Result:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default SalesPredictionApp;
