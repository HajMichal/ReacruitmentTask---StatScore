import { EventParser } from "./app";
import { InvalidSportException } from "./utils";
import { InvalidPaticipantsException } from "./utils/exceptions";

const fakeCorrectData = {
  sport: "tennis",
  participant1: "fakeTeamFirst",
  participant2: "fakeTeamSecond",
  score: "2:1,7:6,6:3,6:7",
};
const fakeWrongData = {
  sport: "curling",
  participant1: "fakeTeamFirst",
  participant2: "fakeTeamSecond",
  score: "2:1,7:6,6:3,",
};
const datawithoutParticipants = {
  sport: "tennis",
  score: "",
};

describe("EventParser Class", () => {
  const eventParser = new EventParser();

  describe("[ makeEventName ] method testing", () => {
    it("should return event name correctly", () => {
      expect(eventParser.makeEventName(fakeCorrectData)).toBe(
        "fakeTeamFirst vs fakeTeamSecond"
      );
    });

    it("should return an InvalidSportException", () => {
      expect(eventParser.makeEventName(fakeWrongData)).toBe(
        InvalidSportException
      );
    });
    it("should return an InvalidPaticipantsException", () => {
      expect(eventParser.makeEventName(datawithoutParticipants)).toBe(
        InvalidPaticipantsException
      );
    });
  });

  describe("[ formatScore ] method testing", () => {
    it("should return score parsed correctly", () => {
      expect(eventParser.formatScore(fakeCorrectData)).toBe(
        "Main score: 2:1 (set1 7:6, set2 6:3, set3 6:7)"
      );
    });

    it("should return an InvalidSportException", () => {
      expect(eventParser.formatScore(fakeWrongData)).toBe(
        InvalidSportException
      );
    });
    it("should return an InvalidSportException", () => {
      expect(eventParser.formatScore(datawithoutParticipants)).toBe(
        InvalidSportException
      );
    });
  });
});
