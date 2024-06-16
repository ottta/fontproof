import { OTBase } from "./OTBase";

import { Font, Table } from "opentype.js";

type BaseOTAxis = {
  tag: string;
  minValue: number;
  defaultValue: number;
  maxValue: number;
  name: { [key: string]: string };
};

type BaseOtInstance = {
  name: { [key: string]: string };
  coordinates: {
    [key: string]: number;
  };
};

export type OTVarAxis = {
  tag: string;
  minValue: number;
  defaultValue: number;
  maxValue: number;
  name: string;
};

export type OTVarInstance = {
  name: string;
  coordinates: {
    [key: string]: number;
  };
};

export default class OTVariable extends OTBase {
  private readonly isVariableFont: boolean = false;
  private readonly fvar: Table;

  constructor(font: Font) {
    super(font);
    this.fvar = font.tables["fvar"];

    if (this.fvar && this.fvar.axes.length > 0) {
      this.isVariableFont = true;
    }
  }

  get(): { axes: OTVarAxis[]; instances: OTVarInstance[] } | null {
    if (!this.isVariableFont) return null;
    return {
      axes: this.getAxes(),
      instances: this.getInstances(),
    };
  }

  private getAxes(): OTVarAxis[] {
    return (
      this.fvar.axes
        .map((axis: BaseOTAxis) => ({
          ...axis,
          name: axis.name.en,
        }))
        // Get only unique tags
        .filter(
          (item: BaseOTAxis, i: number, arr: BaseOTAxis[]) =>
            arr.findIndex((t) => t.tag === item.tag) === i,
        )
    );
  }
  private getInstances(): OTVarInstance[] {
    return this.fvar.instances.map((instance: BaseOtInstance) => ({
      ...instance,
      name: instance.name.en,
    }));
  }
}
