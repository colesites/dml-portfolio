Object.defineProperty(exports, "__esModule", { value: true });
exports.signalsByNumber = exports.signalsByName = void 0;
var _os = require("os");

var _signals = require("./signals.js");
var _realtime = require("./realtime.js");

const getSignalsByName = () => {
  const signals = (0, _signals.getSignals)();
  return signals.reduce(getSignalByName, {});
};

const getSignalByName = (
  signalByNameMemo,
  { name, number, description, supported, action, forced, standard },
) => ({
  ...signalByNameMemo,
  [name]: { name, number, description, supported, action, forced, standard },
});

const signalsByName = getSignalsByName();
exports.signalsByName = signalsByName;

const getSignalsByNumber = () => {
  const signals = (0, _signals.getSignals)();
  const length = _realtime.SIGRTMAX + 1;
  const signalsA = Array.from({ length }, (value, number) =>
    getSignalByNumber(number, signals),
  );

  return Object.assign({}, ...signalsA);
};

const getSignalByNumber = (number, signals) => {
  const signal = findSignalByNumber(number, signals);

  if (signal === undefined) {
    return {};
  }

  const { name, description, supported, action, forced, standard } = signal;
  return {
    [number]: {
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard,
    },
  };
};

const findSignalByNumber = (number, signals) => {
  const signal = signals.find(
    ({ name }) => _os.constants.signals[name] === number,
  );

  if (signal !== undefined) {
    return signal;
  }

  return signals.find((signalA) => signalA.number === number);
};

const signalsByNumber = getSignalsByNumber();
exports.signalsByNumber = signalsByNumber;
//# sourceMappingURL=main.js.map
