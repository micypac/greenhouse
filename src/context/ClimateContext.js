// Temperature has a default value of 50 degrees
// Humidity has a default value of 40%
import { createContext, useContext, useState, useEffect } from "react";

const ClimateContext = createContext();

export const useClimate = () => useContext(ClimateContext);

const ClimateProvider = (props) => {
  const [temperature, setTemperature] = useState(50);
  const [desiredTemp, setDesiredTemp] = useState(50);
  const [humidity, setHumidity] = useState(40);
  const [desiredHumidity, setDesiredHumidity] = useState(40);

  useEffect(() => {
    const tempChange = setTimeout(() => {
      if (temperature > desiredTemp) {
        setTemperature(temperature - 1);
      } else if (temperature < desiredTemp) {
        setTemperature(temperature + 1);
      }
    }, 1000);

    return () => clearTimeout(tempChange);
  }, [desiredTemp, temperature]);

  useEffect(() => {
    const humidityChange = setTimeout(() => {
      if (humidity > desiredHumidity) {
        setHumidity(humidity - 1);
      } else if (humidity < desiredHumidity) {
        setHumidity(humidity + 1);
      }
    }, 1000);

    return () => clearTimeout(humidityChange);
  }, [desiredHumidity, humidity]);

  return (
    <ClimateContext.Provider
      value={{
        temperature,
        setTemperature,
        humidity,
        setHumidity,
        desiredTemp,
        setDesiredTemp,
        desiredHumidity,
        setDesiredHumidity,
      }}
    >
      {props.children}
    </ClimateContext.Provider>
  );
};

export default ClimateProvider;
