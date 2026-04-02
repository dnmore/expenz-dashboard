import { loginByEmail } from "@/lib/auth";
import sql from "@/lib/db";

import { createSession, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { logout } from "@/lib/auth";

jest.mock("@/lib/db", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("@/lib/session", () => ({
  createSession: jest.fn(),
  deleteSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

const mockedSql = sql as unknown as jest.Mock;


describe("loginByEmail + logout", () => {
  const mockEmail = "test@example.com";
  const mockUserId = "user-123";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw if session creation fails", async () => {
   
    mockedSql.mockResolvedValue([{ id: mockUserId }]);

  
     (createSession as jest.Mock).mockRejectedValue(
      new Error("Session creation failed"),
    );

    
    await expect(loginByEmail(mockEmail)).rejects.toThrow(
      "Session creation failed",
    );

    
    expect(sql).toHaveBeenCalled();

    
    expect(createSession).toHaveBeenCalledWith(mockUserId);

   
    expect(redirect).not.toHaveBeenCalled();
  });

  it("should redirect on successful login", async () => {
    mockedSql.mockResolvedValue([{ id: mockUserId }]);
     (createSession as jest.Mock).mockResolvedValue(undefined);

    await loginByEmail(mockEmail);

    expect(createSession).toHaveBeenCalledWith(mockUserId);
    expect(redirect).toHaveBeenCalledWith("/dashboard");
  });

  it("should throw if user not found", async () => {
    mockedSql.mockResolvedValue([]);

    await expect(loginByEmail(mockEmail)).rejects.toThrow(
      "User not found",
    );

    expect(createSession).not.toHaveBeenCalled();
    expect(redirect).not.toHaveBeenCalled();
  });

  it("deletes session and redirects to home with logout", async () => {
    await logout();

    expect(deleteSession).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith("/");
});
});