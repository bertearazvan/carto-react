import { Feature, Polygon, MultiPolygon } from 'geojson';
import { SpatialIndex } from "../operations/constants/SpatialIndexTypes";
import { TileFeaturesResponse } from "../types";

export default function tileFeaturesSpatialIndex(arg: {
  tiles: any;
  geometryToIntersect: Feature<Polygon | MultiPolygon>;
  geoColumName: string;
  spatialIndex: SpatialIndex;
}): TileFeaturesResponse;
