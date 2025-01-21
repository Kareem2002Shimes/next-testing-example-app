import { render, renderHook, screen } from "@testing-library/react";
import Home from "../page";
import userEvent from "@testing-library/user-event";
import exp from "constants";

describe("Home", () => {
  it("shoudl add a new todo", async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("New Todo");
    await userEvent.type(input, "new todo");
    expect(input).toHaveValue("new todo");

    const button = screen.getByRole("button", { name: "Submit" });
    await userEvent.click(button);
    expect(input).toHaveValue("");
    const data = await screen.findByText("new todo");
    expect(data).toHaveTextContent("new todo");
  });

  it("shoudl update a todo", async () => {
    render(<Home />);
    const checkbox = screen.getAllByRole("checkbox")[0] as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
  it("shoudl delete a todo", async () => {
    render(<Home />);
    const todoText = screen.getByText("Write Code 💻");
    expect(todoText).toBeInTheDocument();
    const button = screen.getAllByTestId(
      "delete-button"
    )[0] as HTMLButtonElement;
    await userEvent.click(button);
    expect(todoText).not.toBeInTheDocument();
  });
});
