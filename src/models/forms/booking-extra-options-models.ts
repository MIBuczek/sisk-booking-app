type ExtraOptions = {lights: boolean; toilets?: never} | {lights?: never; toilets: boolean};

interface ISelectedExtraOptions {
   options: ExtraOptions[];
   fromHour: Date;
   toHour: Date;
}

interface IExtraOptionForm {
   fromHour: Date;
   toHour: Date;
   lights: boolean;
   toilets: boolean;
}

export type {ISelectedExtraOptions, IExtraOptionForm, ExtraOptions};
