import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return new Proxy(
    {},
    {
      get: (target, prop) =>
        function MockIcon(props) {
          return React.createElement("IconMock", props, props.children);
        },
    }
  );
});
