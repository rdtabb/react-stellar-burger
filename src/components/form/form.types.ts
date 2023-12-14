export interface ICaption {
  captionText: string;
  linkText: string;
  linkRoute: string;
}

export interface IFormProps {
  handleSubmit: (args: any) => any;
  formName: string;
  formTitle: string;
  submitButtonText: string;
  captionsConfig: ICaption[];
  inputsConfig: IFormInputConfig[];
}

export interface IFormInputsProps {
  inputsConfig: IFormInputConfig[];
}

export interface ComponentProps
  extends Omit<React.HTMLProps<HTMLInputElement>, "size" | "type" | "ref"> {
  value: string;
  extraClass?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  placeholder?: string;
}

export interface IFormInputConfig {
  value: string;
  valueSetter: (value: React.SetStateAction<string>) => void;
  as: React.FC<ComponentProps>;
  placeholder?: string;
}
