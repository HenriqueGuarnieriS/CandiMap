const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
const person = require("../mockdata/person");

const fetchDataAndSave = async () => {
  try {
    const allPromises = person.map(async (person: any) => {
      const { tseUrls } = person;
      if (tseUrls) {
        const [candiInfoResponse, candiContasResponse] = await Promise.all([
          axios.get(tseUrls.candiInfo),
          axios.get(tseUrls.candiContas),
        ]);

        return {
          name: person.name,
          candiInfo: candiInfoResponse.data,
          candiContas: candiContasResponse.data,
        };
      }
    });

    const results = await Promise.all(allPromises);
    const outputFilePath = path.join(__dirname, "../data/candidatesData.json");
    await fs.writeFile(outputFilePath, JSON.stringify(results, null, 2));
    console.log("Data fetched and saved successfully!");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchDataAndSave();
