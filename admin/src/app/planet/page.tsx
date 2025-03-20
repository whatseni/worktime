import { PlanetType } from "../../_models/planet";

async function getData() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/api/planet`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Planet() {
  const response = await getData();
  const planetList = response.data;

  return (
    <main>
      <div>리스트</div>
      <div>
        {
          planetList.map((item: PlanetType) => (
            <div key={item._id?.toString()}>
            <h3>
              {item.name} (Ring : {item.hasRings == true ? "O" : "X"})
            </h3>
            <p>Order from Sun: {item.orderFromSun}</p>
            <p>Main Atmosphere:</p>
            <ul>
              {item.mainAtmosphere!.map((atmosphere, index) => (
                <li key={index}>{atmosphere}</li>
              ))}
            </ul>
            <p>Surface TemperatureC:</p>
            <ul>
              <li>min : {item.surfaceTemperatureC!.min}</li>
              <li>max : {item.surfaceTemperatureC!.max}</li>
              <li>mean : {item.surfaceTemperatureC!.mean}</li>
            </ul>
          </div>
          ))
        }
      </div>
    </main>
  )
}