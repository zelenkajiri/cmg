export type ThermometerEvaluation = "ultra precise" | "very precise" | "precise";
export type HygrometerEvaluation = "keep" | "discard";
export type COEvaluation = "keep" | "discard";
export type InvalidEvaluation = "Invalid data: not enough measurements." | "Invalid data: missing reference value.";

export type SensorEvaluation = ThermometerEvaluation | HygrometerEvaluation | COEvaluation | InvalidEvaluation;