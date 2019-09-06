import React from "react";
import "jsdom-global/register";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import App, { options } from "./helpers/App";
import { isTrue } from "./helpers/testHelpers";
import { perfectMessage, shortInputText } from "./helpers/Form";

configure({ adapter: new Adapter() });

describe("App integration test", () => {
  let form;
  before(() => {
    form = mount(<App />);
  });
  it("should show the default error text", () => {
    isTrue(form.text() === options.defaultErrorData);
  });

  it("should show the new error message", () => {
    form.find("input").simulate("change", { target: { value: "a" } });
    isTrue(form.text() === shortInputText);
  });

  it("should show the non-error message", () => {
    form.find("input").simulate("change", { target: { value: "abcd" } });
    isTrue(form.text() === perfectMessage);
  });

	it("should show back the error message", () => {
		form.find("input").simulate("change", { target: { value: "a" } });
		isTrue(form.text() === shortInputText);
	});
});
