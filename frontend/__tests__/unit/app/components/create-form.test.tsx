import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CreateForm from "@/components/ui/income/create-form";




jest.mock("next/link", () => {
  return ({ children, href }: any) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
});


jest.mock("@/components/ui/button", () => ({
  Button: ({ children, asChild, ...props }: any) => {
    if (asChild) {
      return children; 
    }
    return <button {...props}>{children}</button>;
  },
}));

jest.mock("@/components/ui/label", () => ({
  Label: ({ children, ...props }: any) => (
    <label {...props}>{children}</label>
  ),
}));

jest.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));


jest.mock("@/lib/actions", () => ({
  createIncome: jest.fn(),
}));


jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useActionState: jest.fn(),
}));

const mockUseActionState = require("react").useActionState;

describe("CreateForm", () => {
  const mockFormAction = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it("renders form fields and buttons", () => {
    mockUseActionState.mockReturnValue([
      { message: null, errors: {} },
      mockFormAction,
    ]);

    render(<CreateForm />);

    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
    const submitButton = screen.getByText("Create Income")
    expect(submitButton).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("renders cancel link with correct href", () => {
    mockUseActionState.mockReturnValue([
      { message: null, errors: {} },
      mockFormAction,
    ]);

    render(<CreateForm />);

    const link = screen.getByTestId("link");
    expect(link).toHaveAttribute("href", "/dashboard/income");
  });

  

  

 

  it("renders description errors", () => {
    mockUseActionState.mockReturnValue([
      {
        message: null,
        errors: { description: ["Description is required"] },
      },
      mockFormAction,
    ]);

    render(<CreateForm />);

    expect(
      screen.getByText("Description is required")
    ).toBeInTheDocument();
  });

 

  

  it("renders general error message", () => {
    mockUseActionState.mockReturnValue([
      {
        message: "Missing Fields. Failed to Create Income.",
        errors: {},
      },
      mockFormAction,
    ]);

    render(<CreateForm />);

    expect(
      screen.getByText("Missing Fields. Failed to Create Income.")
    ).toBeInTheDocument();
  });

  

  it("inputs are associated with labels", () => {
    mockUseActionState.mockReturnValue([
      { message: null, errors: {} },
      mockFormAction,
    ]);

    render(<CreateForm />);

    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();
  });

  it("error containers have aria-live attributes", () => {
    mockUseActionState.mockReturnValue([
      { message: null, errors: {} },
      mockFormAction,
    ]);

    render(<CreateForm />);

    expect(screen.getByText("", { selector: "#description-error" }))
      .toHaveAttribute("aria-live", "polite");

    expect(screen.getByText("", { selector: "#amount-error" }))
      .toHaveAttribute("aria-live", "polite");
  });
});