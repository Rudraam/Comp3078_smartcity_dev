import CityDashboard from '../CityDashboard';

export default function CityDashboardExample() {
  return (
    <CityDashboard 
      cityName="Tokyo" 
      onBackToSearch={() => console.log('Back to search clicked')} 
    />
  );
}