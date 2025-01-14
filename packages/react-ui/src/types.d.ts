import { GroupDateTypes } from '@carto/react-core';

export type WrapperWidgetUI = {
  title: string;
  isLoading?: boolean;
  expandable?: boolean;
  expanded?: boolean;
  onExpandedChange?: (v: boolean) => void;
  actions?: { id: string; name: string; icon: React.ReactElement; action: Function }[];
  options?: { id: string; name: string; action: Function }[];
  children?: React.ReactNode;
};

export type CategoryWidgetUIData = { name: number | string | boolean; value: number }[];
export type CategoryWidgetUI = {
  data: CategoryWidgetUIData;
  isLoading?: boolean;
  formatter?: Function;
  labels?: object;
  maxItems?: number;
  selectedCategories?: string[];
  onSelectedCategoriesChange?: Function;
  order?: 'ranking' | 'fixed';
};

export type FormulaWidgetUIData =
  | string
  | number
  | { value: string[] | number[]; unit: string };
export type FormulaWidgetUI = {
  data: FormulaWidgetUIData;
  unitBefore?: boolean;
  formatter?: Function;
};

export type HistogramWidgetUIData = number[];
export type HistogramWidgetUI = {
  data: HistogramWidgetUIData;
  tooltip?: boolean;
  tooltipFormatter?: Function;
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
  dataAxis?: unknown[];
  name?: string;
  onSelectedBarsChange?: Function;
  height?: number;
};

export type BarWidgetUI = {
  xAxisData: (string | number)[];
  yAxisData: (string | number)[] | (string | number)[][];
  series?: string[]
  colors?: string | string[];
  stacked?: boolean;
  labels?: object;
  tooltip?: boolean;
  tooltipFormatter?: Function;
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
  selectedBars?: number[] | [number, number][];
  onSelectedBarsChange?: Function;
  height?: string | number;
  filterable?: boolean;
  animation?: boolean;
};

export type PieWidgetUIData = { name: string; value: number }[];
export type PieWidgetUI = {
  name: string;
  data: PieWidgetUIData;
  formatter?: Function;
  tooltipFormatter?: Function;
  height?: string;
  colors?: string[];
  selectedCategories?: string[];
  onSelectedCategoriesChange?: Function;
};

export type Layer = {
  id: string | number;
  title: string;
  switchable: boolean;
  visible: boolean;
  legend?: LegendWidgetUIData;
};

export type LegendWidgetUIData = {
  type: string;
  children?: Node;
  collapsible?: boolean;
  note?: string;
  attr?: string;
  colors?: string[];
  labels?: (string | number)[];
  icons?: string[];
};

export type LegendWidgetUI = {
  className?: string;
  customLegendTypes?: Record<string, Function>;
  layers?: LegendWidgetUIData[];
  collapsed?: boolean;
  onChangeCollapsed?: (collapsed: boolean) => void;
  onChangeVisibility?: (args: { id: string; visible: boolean }) => void;
  onChangeOpacity?: (args: { id: string; visible: boolean }) => void;
  onChangeLegendRowCollapsed?: (args: { id: string; collapsed: boolean }) => void;
};

export type ScatterPlotWidgetUIData = number[][];
export type ScatterPlotWidgetUI = {
  name: string;
  data: ScatterPlotWidgetUIData;
  xAxisFormatter?: Function;
  yAxisFormatter?: Function;
  tooltipFormatter?: Function;
};

export type TimeSeriesWidgetUIData = { name: number; value: number }[];
export type TimeSeriesWidgetUI = {
  data: TimeSeriesWidgetUIData;
  stepSize: GroupDateTypes;
  chartType?: string;
  duration?: number;
  tooltip?: boolean;
  tooltipFormatter?: Function;
  height?: string;
  isPlaying?: boolean;
  onPlay?: Function;
  isPaused?: boolean;
  onPause?: Function;
  onStop?: Function;
  timelinePosition?: number;
  onTimelineUpdate?: Function;
  timeWindow?: any[];
  onTimeWindowUpdate?: Function;
  showControls?: boolean;
};

export type NoDataAlert = {
  title: string;
  body: string;
};

export type FeatureSelectionWidgetUIData = {
  id: string;
  label: string;
  icon: React.ReactElement;
};
export type FeatureSelectionWidgetUI = {
  selectionModes: FeatureSelectionWidgetUIData[];
  editModes: FeatureSelectionWidgetUIData[];
  selectedMode: string;
  onSelectMode?: Function;
  activated?: boolean;
  onActivatedChange?: Function;
  geometry?: any;
  onSelectGeometry?: Function;
  tooltipPlacement?: string;
  className?: string;
};

// Legends
export type LegendCategories = {
  legend: {
    labels?: (string | number)[];
    colors?: string | string[] | number[][];
    isStrokeColor?: boolean;
  };
};

export type LegendIcon = {
  legend: {
    labels?: string[];
    icons?: string[];
  };
};

export type LegendProportion = {
  legend: {
    labels?: (number | string)[];
  };
};

export type LegendRamp = {
  isContinuous?: boolean;
  legend: {
    labels?: (number | string)[];
    colors?: string | string[] | number[][];
  };
};

export type AnimationOptions = {
  duration?: number;
  animateOnMount?: boolean;
  initialValue?: number
};

export type AnimatedNumber = {
  enabled: boolean;
  value: number;
  options?: AnimationOptions;
  formatter: (n: number) => React.ReactNode;
};

export type FormulaLabels = {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  note?: React.ReactNode;
};

export type FormulaColors = {
  [key in keyof FormulaLabels]?: string;
} & {
  value?: string;
};

export type ComparativeFormulaWidgetUI = {
  data: number[];
  labels?: FormulaLabels[];
  colors?: FormulaColors[];
  animated?: boolean;
  animationOptions?: AnimationOptions;
  formatter?: (n: number) => React.ReactNode;
};

export enum ORDER_TYPES {
  RANKING = 'ranking',
  FIXED = 'fixed',
}

type CategoryData = {
  name: string;
  value: number;
};

export type ComparativeCategoryWidgetUI = {
  names: string[];
  data: CategoryData[][];
  labels?: string[];
  colors?: string[];
  maxItems?: number;
  order?: ORDER_TYPES;
  animation?: boolean;
  animationOptions?: AnimationOptions;
  searchable?: boolean;
  filterable?: boolean;
  selectedCategories?: string[];
  onSelectedCategoriesChange?: (categories: string[]) => any;
  formatter?: (v: any) => string;
};

export type PieData = {
  name: string;
  value: number;
};

export type ComparativePieWidgetUIProps = {
  names: string[];
  data: PieData[][];
  labels?: string[][];
  colors?: string[][];
  height?: string;
  animation?: boolean;
  formatter?: (v: number) => string;
  tooltipFormatter?: (v: any) => string;
  selectedCategories?: string[];
  onCategorySelected?: (categories: string[]) => any;
};
