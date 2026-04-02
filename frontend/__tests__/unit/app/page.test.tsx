import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Page from "@/app/page";



jest.mock("@/components/ui/expenz-logo", () => () => (
  <div data-testid="logo">Logo</div>
));

jest.mock("@/components/ui/mode-toggle", () => ({
  ModeToggle: () => <button data-testid="mode-toggle">Toggle</button>,
}));

jest.mock("@/components/ui/login-forms", () => ({
  LoginAsJohnForm: () => (
    <button data-testid="login-john">Login as John</button>
  ),
  LoginAsSarahForm: () => (
    <button data-testid="login-sarah">Login as Sarah</button>
  ),
}));

jest.mock("lucide-react", () => ({
  CornerDownLeft: () => <svg data-testid="corner-icon" />,
}));


jest.mock("motion/react-client", () => ({
  div: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="motion-div">{children}</div>
  ),
}));

describe("Page Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<Page />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("renders header components (logo + mode toggle)", () => {
    render(<Page />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("mode-toggle")).toBeInTheDocument();
  });

  it("renders main heading and description", () => {
    render(<Page />);
    
    expect(
      screen.getByText("Track Your Expenses. Achieve Your Goals.")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Take control of your money/i)
    ).toBeInTheDocument();
  });

  it("renders demo account message", () => {
    render(<Page />);
    
    expect(
      screen.getByText(/Jump in with a demo account/i)
    ).toBeInTheDocument();
  });

  it("renders login forms", () => {
    render(<Page />);
    
    expect(screen.getByTestId("login-john")).toBeInTheDocument();
    expect(screen.getByTestId("login-sarah")).toBeInTheDocument();
  });

  it("renders icon correctly", () => {
    render(<Page />);
    expect(screen.getByTestId("corner-icon")).toBeInTheDocument();
  });

  it("renders motion wrapper", () => {
    render(<Page />);
    expect(screen.getByTestId("motion-div")).toBeInTheDocument();
  });

  
});