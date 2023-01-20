type ButtonProps = {
  name: string;
};
export const PrimaryButton = (props: ButtonProps) => {
  return (
    <div>
      <p className="text-xl">Button primary</p>
      <p>{props.name}</p>
    </div>
  );
};
