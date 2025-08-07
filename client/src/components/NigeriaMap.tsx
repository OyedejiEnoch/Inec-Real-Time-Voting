'use client'
import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_nigeriaLow from "@amcharts/amcharts5-geodata/nigeriaLow";
import { useGetVotesPerStateQuery } from "@/redux/api/api";

// Static party colors
const partyColors: Record<string, string> = {
  APC: "#1B6EC2",
  PDP: "#008000",
  LP: "#ff0000",
  UNKNOWN: "#888888"
};

// Optional: map state names to proper geoJSON IDs
const stateIdMap: Record<string, string> = {
  Abia: "NG-AB",
  Adamawa: "NG-AD",
  AkwaIbom: "NG-AK",
  Anambra: "NG-AN",
  Bauchi: "NG-BA",
  Bayelsa: "NG-BY",
  Benue: "NG-BE",
  Borno: "NG-BO",
  CrossRiver: "NG-CR",
  Delta: "NG-DE",
  Ebonyi: "NG-EB",
  Edo: "NG-ED",
  Ekiti: "NG-EK",
  Enugu: "NG-EN",
  Gombe: "NG-GO",
  Imo: "NG-IM",
  Jigawa: "NG-JI",
  Kaduna: "NG-KD",
  Kano: "NG-KN",
  Katsina: "NG-KT",
  Kebbi: "NG-KE",
  Kogi: "NG-KO",
  Kwara: "NG-KW",
  Lagos: "NG-LA",
  Nasarawa: "NG-NA",
  Niger: "NG-NI",
  Ogun: "NG-OG",
  Ondo: "NG-ON",
  Osun: "NG-OS",
  Oyo: "NG-OY",
  Plateau: "NG-PL",
  Rivers: "NG-RI",
  Sokoto: "NG-SO",
  Taraba: "NG-TA",
  Yobe: "NG-YO",
  Zamfara: "NG-ZA",
  FCT: "NG-FC"
};

const NigeriaMap = () => {
  const { data: voteData, isLoading } = useGetVotesPerStateQuery();

  useLayoutEffect(() => {
    if (!voteData || isLoading) return;

    const root = am5.Root.new("mapdiv");
    root.setThemes([am5.Theme.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "none",
        wheelY: "zoom",
        projection: am5map.geoMercator()
      })
    );

    // Properly assign property fields here
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_nigeriaLow,
        valueField: "totalVotes",
        calculateAggregates: true,
        // ✅ This tells amCharts to look for the `fill` field in the data
        // propertyFields: {
        //   fill: "fill"
        // }
      })
    );



    // Add the data
    polygonSeries.data.setAll(
      voteData.map((state: any) => {
        const id = stateIdMap[state.state] || "NG-FC"; // fallback
        const party = state.leadingCandidate?.partyAcronym || "UNKNOWN";

        return {
          id,
          name: state.state,
          totalVotes: state.totalVotes,
          fill: am5.color(partyColors[party] || partyColors["UNKNOWN"]),
          tooltip: `${state.state}\n${state.totalVotes} votes\nLeading: ${party}\nCandidate: ${state.leadingCandidate?.candidateName || ""}`
        };
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{tooltip}",
      interactive: true
    });

    return () => {
      root.dispose();
    };
  }, [voteData, isLoading]);

  return <div id="mapdiv" style={{ width: "100%", height: "500px" }} />;
};

export default NigeriaMap;
