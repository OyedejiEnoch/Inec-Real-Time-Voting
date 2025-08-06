'use client';

import React, { useEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_nigeriahigh from "@amcharts/amcharts5-geodata/nigeriahigh";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useGetVotesPerStateQuery } from '@/redux/api/api';


type Party = 'APC' | 'PDP' | 'LP' | 'OTHER';

interface VoteData {
  [stateCode: string]: {
    leadingParty: Party;
    votes: number;
  };
}
const voteDataPerState: VoteData = {
  LA: { leadingParty: "APC", votes: 50234 },
  AB: { leadingParty: "PDP", votes: 31445 },
  KN: { leadingParty: "LP", votes: 12834 },
  RI: { leadingParty: "APC", votes: 22011 },
  // Add more states using their ISO codes
};


const partyColors: Record<Party, am5.Color> = {
  APC: am5.color(0x008751),
  PDP: am5.color(0xdb1a2d),
  LP: am5.color(0x2cbb2c),
  OTHER: am5.color(0x888888),
};
const NigeriaMap = () => {

    const {data, isLoading}=useGetVotesPerStateQuery()

    console.log(data)

useEffect(() => {
        if (!data || isLoading) return;

    const root = am5.Root.new("chartdiv");

    // root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "none",
        wheelY: "zoom",
        projection: am5map.geoMercator(),
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_nigeriahigh,
        valueField: 'value',
        calculateAggregates: true,
      })

    );

      polygonSeries.mapPolygons.template.setAll({
      tooltipText:
        '{name}\nVotes: {totalVotes}\nLeading: {leadingCandidate} ({partyAcronym} - {percentage}%)',
      interactive: true,
    });

    const mapData = data.map((stateResult) => ({
      id: `NG-${stateResult.state.toUpperCase()}`,
      name: stateResult.state,
      totalVotes: stateResult.totalVotes,
      leadingCandidate: stateResult.leadingParty?.candidateName ?? 'N/A',
      partyAcronym: stateResult.leadingParty?.acronym ?? 'N/A',
      percentage: stateResult.leadingParty?.percentage ?? 0,
      fill: am5.color('#EB5B00'),
    }));

     polygonSeries.data.setAll(mapData);

    polygonSeries.mapPolygons.template.adapters.add('fill', (fill, target) => {
      return target.dataItem?.dataContext?.fill || fill;
    });


  return () => {
      root.dispose();
    };
  }, [data, isLoading]);

  return (
    <div id="chartdiv" style={{ width: "100%", height: "600px" }}></div>
  )
}

export default NigeriaMap
