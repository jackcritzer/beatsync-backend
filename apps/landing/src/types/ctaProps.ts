export type FormCTAButtonStatus = "idle" | "loading" | "success" | "error";

export type FormCTAButtonProps = {
  status: FormCTAButtonStatus;
  className?: string;
};

export type HeaderCTAButtonProps = {
    className?: string;
};