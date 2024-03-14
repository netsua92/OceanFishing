var cleanedDataObj = [];
var newFish = {
  Fish: "",
  Bait: [
    {
      Krill: "",
      PlumpWorm: "",
      Ragworm: "",
      Special: "",
      SpecialType: "",
      VersatileLure: "",
    },
  ],
  Bite: "!!",
  DH: 0,
  Hookset: "Powerful",
  Mission: "",
  Points: 0,
  Species: "",
  Stars: 0,
  TH: 0,
  TimeFrameDay: "",
  TimeFrameNight: "",
  TimeFrameSunset: "",
  Weather: [
    {
      ClearSkies: "",
      Clouds: "",
      FairSkies: "",
      Fog: "",
      Special1: "",
      Special1Type: "",
      Special2: "",
      Special2Type: "",
      Special3: "",
      Special3Type: "",
    },
  ],
};

window.addEventListener("DOMContentLoaded", (event) => {
  const sheetDataHandler = (sheetData) => {
    console.log("sheet data: ", sheetData);

    for (var key in sheetData) {
      var fish = sheetData[key];
      var newFish = {
        Fish: fish.Fish,
        Bait: [
          {
            Krill: fish.BaitKrill,
            PlumpWorm: fish.BaitPlumpWorm,
            Ragworm: fish.BaitRagworm,
            Special: fish.BaitSpecial,
            SpecialType: fish.BaitSpecialType,
            VersatileLure: fish.BaitVersatileLure,
          },
        ],
        Bite: fish.Bite,
        DH: fish.DH,
        Hookset: fish.Hookset,
        Mission: fish.Mission,
        Points: fish.Points,
        Species: fish.Species,
        Stars: fish.Stars,
        TH: fish.TH,
        TimeFrameDay: fish.TimeFrameDay,
        TimeFrameNight: fish.TimeFrameNight,
        TimeFrameSunset: fish.TimeFrameSunset,
        Weather: [
          {
            ClearSkies: fish.WeatherClearSkies,
            Clouds: fish.WeatherClouds,
            FairSkies: fish.WeatherFairSkies,
            Fog: fish.WeatherFog,
            Special1: fish.WeatherSpecial1,
            Special1Type: fish.WeatherSpecial1Type,
            Special2: fish.WeatherSpecial2,
            Special2Type: fish.WeatherSpecial2Type,
            Special3: fish.WeatherSpecial3,
            Special3Type: fish.WeatherSpecial3Type,
          },
        ],
      };

      cleanedDataObj.push(newFish);
    }

    console.log("cleaned Data: ", cleanedDataObj);
    //ADD YOUR CODE TO WORK WITH sheetData ARRAY OF OBJECTS HERE
  };

  // --==== QUERY EXAMPLES ====--
  // --==== USE LETTERS FOR COLUMN NAMES ====--
  //  'SELECT A,C,D WHERE D > 150'
  //  'SELECT * WHERE B = "Potato"'
  //  'SELECT * WHERE A contains "Jo"'
  //  'SELECT * WHERE C = "active" AND B contains "Jo"'
  //  "SELECT * WHERE E > date '2022-07-9' ORDER BY E DESC"

  getSheetData({
    // sheetID you can find in the URL of your spreadsheet after "spreadsheet/d/"
    sheetID: "1AVqIXm7_Ld5LsHY814AB0-6MyEhigg1KtgL-FnpmQ2E",
    // sheetName is the name of the TAB in your spreadsheet (default is "Sheet1")
    sheetName: "Ruby",
    query: "SELECT *",
    callback: sheetDataHandler,
  });
});
