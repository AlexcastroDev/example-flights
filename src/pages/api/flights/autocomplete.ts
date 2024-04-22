import { FlightAutocomplete } from "@/shared/types/FlightAutocomplete";
import type { NextApiRequest, NextApiResponse } from "next";
import { faker } from "@faker-js/faker";
import { ResponseMock } from "@/shared/types/ResponseMock";
import countriesReponseMock from "@/mocks/flights/autocomplete/response.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMock<FlightAutocomplete>>,
) {
  const q = req.query.q as string;
  const limit = 10;
  let data = countriesReponseMock.filter((value, index, self) =>
    index === self.findIndex((t) => (
      t.country === value.country
    ))
  )
    .filter((value) => {
      return value.country.toLowerCase().includes(q);
    });

  data = data.slice(0, limit);

  setTimeout(() => {
    res.status(200).json({
      data,
      meta: {
        total: data.length,
      },
    });
  }, 0);
}
