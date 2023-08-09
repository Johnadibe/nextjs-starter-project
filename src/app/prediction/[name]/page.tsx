// Since this is a server side component by default, we will first create the function to fetch the data
async function getPredictedAge(name: string) {
  const response = await fetch(`https://api.agify.io/?name=${name}`);
  return response.json();
}

async function getPredictedCountry(name: string) {
  const response = await fetch(`https://api.nationalize.io/?name=${name}`);
  return response.json();
}

async function getPredictedGender(name: string) {
  const response = await fetch(`https://api.genderize.io/?name=${name}`);
  return response.json();
}

interface IParams {
  params: { name: string };
}

export default async function Page({ params }: IParams) {
  const ageData = getPredictedAge(params.name);
  const countryData = getPredictedCountry(params.name);
  const genderData = getPredictedGender(params.name);

  // We need to resolve all of them
  const [age, country, gender] = await Promise.all([
    ageData,
    countryData,
    genderData,
  ]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-3 p-4">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Personal Information
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Age: {age?.age}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Gender: {gender?.gender}
        </div>
        <div className="block mt-1 text-lg leading-tight font-medium text-black">
          Nationality: {country?.country[0]?.country_id}
        </div>
      </div>
    </div>
  );
}
