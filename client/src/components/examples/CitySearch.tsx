import CitySearch from '../CitySearch';

export default function CitySearchExample() {
  return (
    <CitySearch 
      onCitySelect={(city) => console.log('City selected:', city)} 
    />
  );
}