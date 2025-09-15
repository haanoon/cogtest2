import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { modelForecastHandler } from "server/routes/modelForecast";
// One-hot encoding options
const families = [
  "AUTOMOTIVE", "BEAUTY", "CELEBRATION", "CLEANING", "CLOTHING", "FOODS",
  "GROCERY", "HARDWARE", "HOME", "LAWN AND GARDEN", "LIQUOR,WINE,BEER",
  "PET SUPPLIES", "STATIONERY"
];
const states = [
  "Azuay",
  "Bolivar",
  "Cañar",
  "Carchi",
  "Chimborazo",
  "Cotopaxi",
  "El Oro",
  "Esmeraldas",
  "Galápagos",
  "Guayas",
  "Imbabura",
  "Loja",
  "Los Ríos",
  "Manabí",
  "Morona Santiago",
  "Napo",
  "Orellana",
  "Pastaza",
  "Pichincha",
  "Santa Elena",
  "Santo Domingo de los Tsáchilas",
  "Sucumbíos",
  "Tungurahua",
  "Zamora Chinchipe"
];

const cities = [
  "Ambato", "Babahoyo", "Cayambe", "Cuenca", "Daule", "El Carmen", "Esmeraldas",
  "Guaranda", "Guayaquil", "Ibarra", "Latacunga", "Libertad", "Loja", "Machala",
  "Manta", "Playas", "Puyo", "Quevedo", "Quito", "Riobamba", "Salinas", "Santo Domingo"
];
const holidayTypes = [
  "None",
  "National Holiday",
  "Regional Holiday",
  "Local Holiday",
  "Special Event",
];

const SalesPredictionApp: React.FC = () => {
  const [storeNumber, setStoreNumber] = useState<number>(0);
  const [storeType, setStoreType] = useState<string>("A");
  const [productFamily, setProductFamily] = useState<string>("AUTOMOTIVE");
  const [cluster, setCluster] = useState<number>(1);
  const [date, setDate] = useState<Date | null>(null);
  const [dayOfWeek, setDayOfWeek] = useState<number>(0);
  const [promotion, setPromotion] = useState<number>(0);
  const [holidayType, setHolidayType] = useState<string>("None");
  const [transactions, setTransactions] = useState<number>(0);
  const [state, setState] = useState<string>("Pichincha");
  const [crudeOilPrice, setCrudeOilPrice] = useState<number>(0);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [city, setCity] = useState<string>("Quito");

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

    // One-hot encoding for family
    const familyFields = families.reduce((acc, fam) => {
      acc[`family_${fam}`] = fam === productFamily ? 1.0 : 0.0;
      return acc;
    }, {} as Record<string, number>);

    // One-hot encoding for city
    const cityFields = cities.reduce((acc, c) => {
      acc[`city_${c}`] = c === city ? 1.0 : 0.0;
      return acc;
    }, {} as Record<string, number>);

    //One-hot encoding holiday_type fields (customize as needed)
    const holidayFields = holidayTypes.reduce((acc, fam) => {
      acc[`family_${fam}`] = fam === productFamily ? 1.0 : 0.0;
      return acc;
    }, {} as Record<string, number>);

    const payload = {
      store_nbr: storeNumber,
      onpromotion: promotion,
      cluster: cluster,
      transactions: transactions,
      dcoilwtico: crudeOilPrice,
      year: year,
      month: month,
      day: day,
      ...familyFields,
      ...cityFields,
      ...holidayFields,
    };
    try {
    const response = await fetch("http://localhost:5000/forecast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Prediction request failed");
    }

    const data = await response.json();
    setPrediction(data.sales); // assuming backend returns { sales: number }
  } catch (err) {
    console.error(err);
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
            {families.map((fam) => (
              <option key={fam} value={fam}>{fam}</option>
            ))}
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

        {/* Holiday Type */}
<div>
  <label className="block mb-2">Holiday Type</label>
  <select
    value={holidayType}
    onChange={(e) => setHolidayType(e.target.value)}
    className="border p-2 rounded w-full"
  >
    {holidayTypes.map((holiday) => (
      <option key={holiday} value={holiday}>
        {holiday}
      </option>
    ))}
  </select>
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
            {states.map((states) => (
            <option key={states} value={states}>
            {states}
      </option>
    ))}
          </select>
        </div>

        {/* City Selector */}
        <div>
          <label className="block mb-2">City</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border p-2 rounded w-full"
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
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
